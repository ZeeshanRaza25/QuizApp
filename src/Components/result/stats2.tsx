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
// import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
import { HomeTwoTone, ReloadOutlined } from '@ant-design/icons';

// function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
//     return (
//         <Box position="relative" display="inline-flex">
//             <CircularProgress variant="static" {...props} />
//             <Box
//                 top={0}
//                 left={0}
//                 bottom={0}
//                 right={0}
//                 position="absolute"
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="center"
//             >
//                 <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
//                     props.value,
//                 )}%`}</Typography>
//             </Box>
//         </Box>
//     );
// }

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

// function createData(question: string, answer: string, correct: boolean, correctAnswer: string) {
//     return { question, answer, correct, correctAnswer };
// }

// const rows: any = answers;
// createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// createData('Eclair', 262, 16.0, 24, 6.0),
// createData('Cupcake', 305, 3.7, 67, 4.3),
// createData('Gingerbread', 356, 16.0, 49, 3.9),

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

    // const [spinner, setspinner] = React.useState(true);

    // React.useEffect(() => {
    //     const timer = setInterval(() => {
    //         setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    //     }, 8000);
    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, []);

    // console.log("gameOver ", gameOver);
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
                                {/* <span>{' '}{' '}{' '}</span>
                                   <Button type="primary" size="large" icon={<HomeTwoTone />}>Back to Home</Button> */}
                                {/* <Button ghost block disabled size="large" style={{ height: '8%' }}>
                            <Title level={3} style={{ textAlign: 'center', fontWeight: "bold", borderWidth: 5, borderColor: 'black' }}>
                                Retake Quiz
                            </Title>
                        </Button> */}

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