import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Tabs, Button } from 'antd';
import Mystats from './Stats';
import { ReloadOutlined } from '@ant-design/icons';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
function callback(key: any) {
    // console.log(key);
}

type Props = {
    answers: any;
    score: number;
    gameover: boolean;
    start: (e: React.MouseEvent<HTMLButtonElement>) => void;
    totalQuestions: number
}

const Stats: React.FC<Props> = ({ answers, score, gameover, start, totalQuestions }) => {
    const [gameOver, setGameover] = React.useState(gameover);

    const classes = useStyles();
    const { TabPane } = Tabs;
    const rows: any = answers;

    return (
        <div>
            <Tabs centered animated tabPosition="top" size="large" defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Stats" key="1" >
                    <Mystats score={score} totalQuestions={totalQuestions} />
                    {
                        !gameOver ?
                            <div>
                                <Button type="primary" size="large" icon={<ReloadOutlined />} onClick={start}>Retake Quiz</Button>
                            </div>
                            : null
                    }
                </TabPane>
                <TabPane tab="Questions & Answers" key="2">
                    <TableContainer component={Paper} style={{ marginBottom: '15vh' }}>
                        <Table className={classes.table} aria-label="Table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No. </TableCell>
                                    <TableCell align="center">Questions</TableCell>
                                    <TableCell align="center">Your Answers</TableCell>
                                    <TableCell align="center">Correct Answers</TableCell>
                                    <TableCell align="center">Points</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row: any, i: number = 1) => (
                                    <TableRow key={row.correctAnswer}>
                                        <TableCell align="center">{++i}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.question}
                                        </TableCell>
                                        <TableCell align="center">{row.answer}</TableCell>
                                        <TableCell align="center">{row.correctAnswer}</TableCell>
                                        <TableCell align="center">{row.correct ? 1 : 0}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPane>
            </Tabs>
        </div>
        // <CircularProgressWithLabel value={progress} /> && setspinner(false)
    );
}

export default Stats;