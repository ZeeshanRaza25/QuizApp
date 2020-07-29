import React from 'react'
import { Button, Typography as Typo } from 'antd';
import { calculateGrade } from './Grade';

type Props = {
    score: number;
    totalQuestions: number
}

const Mystats: React.FC<Props> = ({ score, totalQuestions }) => {
    const { Title } = Typo;
    const finalscore = (score / totalQuestions) * 100;
    let { remarks, grade } = calculateGrade(finalscore);
    return (
        <div>
            <Button ghost block disabled size="large" style={{ height: '8%' }}>
                <Title level={3} style={{ textAlign: 'center', fontWeight: "bold", borderWidth: 5, borderColor: 'black' }}>
                    {remarks}
                    {/* ((score / totalQuestions) * 100) < 60 ? 'Sorry, YOU FAILED! ' : 'PASSED' */}
                </Title>
            </Button>
            <Button ghost block disabled size="large" style={{ height: '8%' }}>
                <Title level={4} style={{ textAlign: 'center', fontWeight: "bold", borderWidth: 5, borderColor: 'black' }}>
                    Grade: {grade}
                </Title>
            </Button>
            <Button ghost block disabled size="large" style={{ height: '8%' }}>
                <Title level={4} style={{ textAlign: 'center', fontWeight: "bold", borderWidth: 5, borderColor: 'black' }}>
                    Total Questions: {totalQuestions}
                </Title>
            </Button>
            <Button ghost block disabled size="large" style={{ height: '8%' }}>
                <Title level={4} style={{ textAlign: 'center', fontWeight: "bold", borderWidth: 5, borderColor: 'black' }}>
                    Correct Answers: {score}
                </Title>
            </Button>
            <Button ghost block disabled size="large" style={{ height: '8%' }}>
                <Title level={4} style={{ textAlign: 'center', fontWeight: "bold", borderWidth: 5, borderColor: 'black' }}>
                    Your Score: {(score / totalQuestions) * 100} %
                        </Title>
            </Button>
            {
                grade === 'F'
                    ? <Button ghost block disabled size="large" style={{ height: '8%' }}>
                        <Title level={4} style={{ textAlign: 'center', fontWeight: "bold", borderWidth: 5, borderColor: 'black' }}>
                            Passing Score: 60%
                        </Title>
                    </Button>
                    : null
            }
        </div >
    )
}

export default Mystats;