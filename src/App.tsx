import React, { useState } from 'react';
import './App.css';
import QuestionCard from './Components/QuestionCard';
import { fetchQuizQuestions, Difficulty, QuestionState } from './API';
import MyHeader from './Components/header';
import { Row, Col, Button, Layout, Typography } from 'antd';
import Stats from './Components/result/stats2';
import FooterComponent from './Components/Footer';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTALQUESTIONS = 10;

const App = () => {
  const { Header, Content, Footer } = Layout;
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
    <div style={{
      display: 'flex',
      minHeight: `100vh`,
      flexDirection: 'column',
    }}>
      <Layout>
        <Header>
          <MyHeader />
        </Header>
        <Content>
          <Row justify='center' align="middle" >
            <Col span={2}>
              {
                // gameOver ? <Home start={start} />
                gameOver ?
                  <Button onClick={start}>{userAnswers.length !== TOTALQUESTIONS ? "Start Quiz" : "Retake Quiz"}</Button>
                  : null
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
            <Col xs={24} sm={14}>
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
                    <Button type="primary" block style={{ height: `8%`, textAlign: 'center' }} onClick={nextQuestion} >
                      <Title level={3} style={{ textAlign: 'center', fontWeight: 'bolder' }}>
                        Next Question
                    {/* <NavigateNextTwoToneIcon style={{ alignSelf: 'center', paddingTop: '14' }} fontSize="large" /> */}
                      </Title>
                    </Button>
                  ) : null}
            </Col>
          </Row>
          <Row justify='center' align="middle" >
            <Col xs={20} sm={20}>
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
        <Footer style={{ height: '10vh', bottom: 0, backgroundColor: '#001529', color: 'white' }}>
          <Row justify='center'>
            <Col xs={24} sm={24}>
                <FooterComponent />
            </Col>
          </Row>
        </Footer>
      </Layout >
    </div >
  );
}

export default App;
