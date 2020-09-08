import { shuffleArray } from "./utils";

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}
// category 09 --> 32
// amount=20&category=32&difficulty=easy&type=boolean
export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    // const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const url = 'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple';
    // const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    // const apiTokenurl = `https://opentdb.com/api_token.php?command=request`
    // const apiurl = await (await fetch(apiTokenurl)).json();
    // const token = apiurl.token;
    // console.log('token => ',token);

    const fetchdata = await fetch(url);
    const data = await fetchdata.json();
    // store in local storage
    // localStorage.setItem('fetchData', JSON.stringify(data));
    console.log(data);
    return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer
        ])
    }))
}
