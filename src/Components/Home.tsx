import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Select } from 'antd';
import { PlayCircleTwoTone } from '@ant-design/icons';
import axios from 'axios';

const NumberOfQuestions = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`,
    `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`,
    `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`,
    `31`, `32`, `33`, `34`, `35`, `36`, `37`, `38`, `39`, `40`,
    `41`, `42`, `43`, `44`, `45`, `46`, `47`, `48`, `49`, `50`]

const difficultyLevel = [`easy`, `medium`, `hard`];

const questType = [`Any Type`, `Multiple Choice`, `True / False`];


type Props = {
    start: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

export type Question = {
    category: string;
    type: string;

}
// const MultipleSelect: React.FC<Props> = ({ start }) => {

const MultipleSelect: React.FC<Props> = ({ start }) => {

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('https://opentdb.com/api_category.php');
            const final = result.data.trivia_categories;
            setnames(final);
            // setnames(result.data.trivia_categories);
        };
        fetchData();
    }, []);

    const fetchQuizdata = async (
        amount: number,
        difficulty: Difficulty,
        Category: string,
        questionType: string,
    ) => {
        console.log("Category =>", Category)
        const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${questionType}&type=${Category}`;
        //https://opentdb.com/api.php?amount=20&category=32&difficulty=easy&type=multiple
        const data = await (await fetch(url)).json();
        console.log(data)
        setData(data);
    }
    // const setCategory: (value: React.SetStateAction<undefined>) => void
    const [Data, setData] = useState([]);
    const [Category, setCategory] = useState<string>("");
    const [amount, setAmount] = React.useState<number>(0);
    const [difficulty, setDifficulty] = React.useState<any>();
    const [questionType, setQuestionType] = React.useState<any>();
    const [names, setnames] = useState([]);
    // console.log(Data);
    // const classes = useStyles();
    // const theme = useTheme();
    // const [personName, setPersonName] = React.useState<string[]>([]);

    // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    //     setPersonName(event.target.value as string[]);
    // };
    // const handleQuantity = (event: React.ChangeEvent<{ value: unknown }>) => {
    //     setNumOFQuestion(event.target.value as string[]);
    // };
    // const handleDifficulty = (event: React.ChangeEvent<{ value: unknown }>) => {
    //     setDifficulty(event.target.value as string[]);
    // };
    // const handleType = (event: React.ChangeEvent<{ value: unknown }>) => {
    //     setQuestionType(event.target.value as string[]);
    // };
    const { Option } = Select;
    const { Title } = Typography;

    function changeCategory(value: any) {
        console.log(`selected ${value}`);
        let result: any = names.filter((name: any) => name.name === value);
        const [{ id }] = result;
        // console.log(id);
        setCategory(id)
        // setCategory(value);
    }
    function changeNoQuest(value: any) {
        // console.log(`selected ${value}`);
        setAmount(value);
    }
    function changeLevel(value: any) {
        // console.log(`selected ${value}`);
        setDifficulty(value)
    }
    function changeType(value: any) {
        console.log(`selected ${value}`);
        if (value === "Multiple Choice") {
            return setQuestionType('multiple')
        } else if (value === "True / False") {
            return setQuestionType('boolean')
        } else return setQuestionType("anyType")
    }
    console.log(questionType);
    function onBlur() {
        // console.log('blur');
    }

    function onFocus() {
        // console.log('focus');
    }

    function onSearch(val: any) {
        // console.log('search:', val);
    }
    const style = { background: '#fff', margin: '20px 0 0 0' };


    return (
        <div>
            <Row style={{ fontWeight: "bold", marginTop: 20 }} justify="center">
                <Col span={24}>
                    <Title>Open Trivia Questions</Title>
                </Col>
            </Row>
            <Row>
                <Col className="gutter-row" span={20}>
                    <div style={style}>
                        <Select
                            showSearch
                            style={{ width: `40vw` }}
                            placeholder="Select Quiz Category"
                            optionFilterProp="children"
                            onChange={changeCategory}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}
                        // filterOption={(input, option) =>
                        //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        // }
                        >
                            {
                                names.map((item: any) => {
                                    // const { id, name } = data;
                                    // console.log(item)
                                    return <Option key={item.id} value={item.name}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="gutter-row" span={20}>
                    <div style={style}>
                        <Select
                            showSearch
                            style={{ width: `40vw` }}
                            placeholder="Select N0. Of Questions"
                            optionFilterProp="children"
                            onChange={changeNoQuest}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}
                        >
                            {
                                NumberOfQuestions.map(num => {
                                    return <Option key={num} value={num}>{num}</Option>
                                })
                            }
                        </Select>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="gutter-row" span={20}>
                    <div style={style}>
                        <Select
                            showSearch
                            style={{ width: `40vw` }}
                            placeholder="Select difficulty Level"
                            optionFilterProp="children"
                            onChange={changeLevel}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}
                        >
                            {
                                difficultyLevel.map(level => {
                                    return <Option key={level} value={level}>{level}</Option>
                                })
                            }
                        </Select>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="gutter-row" span={20}>
                    <div style={style}>
                        <Select
                            showSearch
                            style={{ width: `40vw` }}
                            placeholder="Select Questuin Type"
                            optionFilterProp="children"
                            onChange={changeType}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}
                        >
                            {
                                questType.map(type => {
                                    return <Option key={type} value={type}>{type}</Option>
                                })
                            }
                        </Select>
                    </div>
                </Col>
            </Row>
            <Row style={{ marginTop: 20, marginLeft: 20 }}>
                <Col>
                    <Button type="primary" size="large" icon={<PlayCircleTwoTone />} onClick={() => fetchQuizdata
                        (amount, difficulty, questionType, Category)}>
                        Start Quiz
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default MultipleSelect;