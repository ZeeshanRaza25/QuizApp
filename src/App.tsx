import React, { useState } from 'react';
import './App.css';
import QuestionCard from './Components/QuestionCard';
import { fetchQuizQuestions, Difficulty, QuestionState } from './API';
import MyHeader from './Components/header';
// import Home from './Components/Home';
import { Row, Col, Button, Layout, Typography } from 'antd';
import Stats from './Components/result/stats2';
// import NavigateNextTwoToneIcon from '@material-ui/icons/NavigateNextTwoTone';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTALQUESTIONS = 4;

const App = () => {
  const { Header, Content } = Layout;
  const { Title } = Typography;

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(fetchQuizQuestions(TOTALQUESTIONS,Difficulty.EASY));
  // console.log(questions)
  // console.log(newQuestions);

  const start = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTALQUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);

    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false)
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // users answer
      const answer = e.currentTarget.value;
      // check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // add score if answer is correct
      if (correct) setScore(prev => prev + 1);
      // save answer in the array of user answers
      const AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, AnswerObject]);
    }
  }
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTALQUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }

  return (
    // <div className="App">
    <Layout>
      <Header>
        <MyHeader />
      </Header>
      <Content>
        <Row justify='center' align="middle" >
          <Col>
            {
              gameOver ? (
                <Button onClick={start}>{userAnswers.length !== TOTALQUESTIONS ? "Start Quiz" : "Retake Quiz"}</Button>
              ) : null
            }
          </Col>
        </Row>
        {/* {!gameOver ? <p>Score: {score} </p> : null} */}
        <Row justify='center' >
          <Col span={4}>
            {loading && <Button type="primary" loading>
              Loading Questions...
              </Button>
            }
          </Col>
        </Row>
        <Row justify='center' align="middle" >
          <Col span={16}>
            {
              !loading && !gameOver && userAnswers.length !== TOTALQUESTIONS && (
                <QuestionCard
                  questionNr={number + 1}
                  totalQuestions={TOTALQUESTIONS}
                  question={questions[number].question}
                  answers={questions[number].answers}
                  userAnswer={userAnswers ? userAnswers[number] : undefined}
                  callback={checkAnswer}
                />
              )
            }
            {
              (!gameOver &&
                !loading &&
                userAnswers.length === number + 1 &&
                number !== TOTALQUESTIONS - 1) ? (
                  <Button type="primary" block style={{ height: `8%` }} onClick={nextQuestion} >
                    <Title level={3} style={{ textAlign: 'center', fontWeight: 'bolder' }}>
                      Next Question
                    {/* <NavigateNextTwoToneIcon style={{ alignSelf: 'center', paddingTop: '14' }} fontSize="large" /> */}
                    </Title>
                  </Button>
                ) : null}
          </Col>
        </Row>
        <Row justify='center' align="middle" >
          <Col span={20}>
            {
              // userAnswers.length === TOTALQUESTIONS ? console.log("userAnswers ,", userAnswers) : null
              userAnswers.length === TOTALQUESTIONS
                ? <Stats
                  gameover={gameOver}
                  start={start}
                  totalQuestions={TOTALQUESTIONS}
                  score={score}
                  answers={userAnswers} />
                : null
            }
          </Col>
        </Row>
      </Content>
    </Layout >
    // {/* <Home /> */ }
    // </div>
  );
}

export default App;
