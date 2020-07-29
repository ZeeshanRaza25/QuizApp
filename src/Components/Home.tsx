import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(3),
            minWidth: `60vw`,
            maxWidth: `100vw`,
            // backgroundColor: 'black'
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'General Knowledge',
    'Entertainment: Books',
    'Entertainment: Film',
    'Entertainment: Music',
    'Entertainment: Musicals & Theatres',
    'Entertainment: Television',
    'Entertainment: Video Games',
    'Entertainment: Board Games',
    'Science & Nature',
    'Science: Computers',
    'Science: Mathematics',
    'Mythology',
    'Sports',
    'Geography',
    'History',
    'Politics',
    'Art',
    'Celebrities',
    'Animals',
    'Vehicles',
    'Entertainment: Comics',
    'Science: Gadgets',
    'Entertainment: Japanese Anime & Manga',
    'Entertainment: Cartoon & Animations',
];

const NumberOfQuestions = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`,
    `11`, `12`, `13`, `14`, `15`, `16`, `17`, 18, `19`, `20`,
    `21`, `22`, `23`, `24`, `25`, `26`, `27`, 28, `29`, `30`,
    `31`, `32`, `33`, `34`, `35`, `36`, `37`, 38, `39`, `40`,
    `41`, `42`, `43`, `44`, `45`, `46`, `47`, 48, `49`, `50`]

const difficultyLevel = [`easy`, `medium`, `hard`];

const questType = [`Any Type`, `Multiple Choice`, `True / False`];

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function getStyles1(name: string, NumberOfQuestions: string[], theme: Theme) {
    return {
        fontWeight:
            NumberOfQuestions.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function getDifficultyStyles(name: string, difficulty: string[], theme: Theme) {
    return {
        fontWeight:
            difficulty.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
function getTypeStyles(name: string, difficulty: string[], theme: Theme) {
    return {
        fontWeight:
            difficulty.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect() {
    const classes = useStyles();
    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);
    const [numOFQuestion, setNumOFQuestion] = React.useState<string[]>([]);
    const [difficulty, setDifficulty] = React.useState<string[]>([]);
    const [questionType, setQuestionType] = React.useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPersonName(event.target.value as string[]);
    };
    const handleQuantity = (event: React.ChangeEvent<{ value: unknown }>) => {
        setNumOFQuestion(event.target.value as string[]);
    };
    const handleDifficulty = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDifficulty(event.target.value as string[]);
    };
    const handleType = (event: React.ChangeEvent<{ value: unknown }>) => {
        setQuestionType(event.target.value as string[]);
    };

    return (
        <div style={{ width: `100vw` }}>
            <FormControl className={clsx(classes.formControl, classes.noLabel)}>
                <Select
                    displayEmpty
                    value={personName}
                    onChange={handleChange}
                    input={<Input />}
                    renderValue={(selected) => {
                        if ((selected as string[]).length === 0) {
                            return <em>Select Quiz Category</em>;
                        }
                        return (selected as string[]);
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="">
                        <em>Any Category</em>
                    </MenuItem>
                    {names.map((name) => (
                        <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
                {/* <Select
                    displayEmpty
                    value={numOFQuestion}
                    onChange={handleQuantity}
                    input={<Input />}
                    renderValue={(selected) => {
                        if ((selected as string[]).length === 0) {
                            return <em>Select No. of Questions</em>;
                        }
                        return (selected as string[]);
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {NumberOfQuestions.map((qType) => (
                        <MenuItem key={qType} value={qType} style={getStyles1(qType, numOFQuestion, theme)}>
                            {qType}
                        </MenuItem>
                    ))}
                </Select> */}
            </FormControl>
            <Select
                displayEmpty
                value={difficulty}
                onChange={handleDifficulty}
                input={<Input />}
                renderValue={(selected) => {
                    if ((selected as number[]).length === 0) {
                        return <em>Select Question Type</em>;
                    }
                    return selected as number[];
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                {difficultyLevel.map((qType) => (
                    <MenuItem key={qType} value={qType} style={getDifficultyStyles(qType, difficulty, theme)}>
                        {qType}
                    </MenuItem>
                ))}
            </Select>
            <Select
                displayEmpty
                value={questionType}
                onChange={handleType}
                input={<Input />}
                renderValue={(selected) => {
                    if ((selected as number[]).length === 0) {
                        return <em>Select Question Type</em>;
                    }
                    return selected as number[];
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                {questType.map((qType) => (
                    <MenuItem key={qType} value={qType} style={getTypeStyles(qType, questionType, theme)}>
                        {qType}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
}