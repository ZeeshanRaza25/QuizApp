import React from 'react'
import { AnswerObject } from '../App';
import { Button, Typography, Progress, Row, Col } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}
const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNr,
    totalQuestions
}) => {
    const { Title } = Typography;

    return (
        <div style={{
            // flexGrow: 1,
            // width: '75vw',
            marginTop: '6%',
            borderColor: '#black',
            borderWidth: 10,

        }}>
            <Row>
                <Col span={18}>
                    <Title level={2} style={{ fontWeight: 'bold' }} >
                        &nbsp;<InfoCircleFilled /> &nbsp;
                        {questionNr} of {totalQuestions}
                    </Title>
                </Col>
                <Col span={6}>
                    <Progress width={55} strokeWidth={4} type="circle" percent={((questionNr - 1) / totalQuestions) * 100} />
                </Col>
            </Row>

            <Title level={3} style={{ fontWeight: 'bold' }}>&nbsp;Q. {question}</Title>
            <Title level={4} style={{ fontWeight: 'normal', }}> &nbsp;Please choose one of the following answers: </Title>
            {
                answers.map((answer, i = 0) => {
                    let a = ['A', 'B', 'C', 'D'];
                    return <div key={answer}>
                        <Button ghost block disabled={userAnswer ? true : false} size="large" value={answer} onClick={callback}>
                            <Title level={4} style={{ alignSelf: 'left', textAlign: 'left' }} >
                                &nbsp;{a[i++]}. &nbsp; {answer}
                            </Title>
                        </Button>
                    </div>
                })
            }
        </div>
    )
}


export default QuestionCard;