"use client";
import {answerQuestionnaire} from "@/routes/answer";
import {AnswerEvent, AnswerQuestion, AnswerQuestionnaire, QuestionWithAnswer} from "@/types/answer";
import {useMemo, useState} from "react";
import Question from "./Question";
import QuestionnaireInfo from "./QuestionnaireInfo";
import AnswerButton from "@/components/Answer/Button";
import QuestionnaireEnd from "@/components/Answer/QuestionnaireEnd";
import AnswerScreen from "@/components/Answer/AnswerScreen";

interface QuestionnaireProps {
    questionnaire: AnswerQuestionnaire;
}

interface RequiredQuestion {
    id: number;
    answered: boolean;
}

const getQuestionsWithAnswers = (questions: AnswerQuestion[]): {questions: QuestionWithAnswer[], required: RequiredQuestion[]}  => {
    const required: RequiredQuestion[] = [];
    const data = questions.map((question) => {
        if(question.required){
            required.push({ id: question.questionId, answered: false});
        }
        return {
            question,
            answer: {value: "", options: [], answered: false}
        }
    });

    return {questions: data, required};
};

enum AnswerState {
    START,
    QUESTIONS,
    END
}

const Questionnaire = ({questionnaire}: QuestionnaireProps) => {
    const {questions: questionsProp, required} = useMemo(() => getQuestionsWithAnswers(questionnaire.questions), [questionnaire.questions]);

    const [questions, setQuestions] = useState<QuestionWithAnswer[]>(questionsProp);
    const [currentState, setCurrentState] = useState<AnswerState>(AnswerState.START);
    const [requiredQuestions, setRequiredQuestions] = useState<RequiredQuestion[]>(required);

    const setAnswer = (e: AnswerEvent, index: number, questionId: number) => {
        // Answer
        const newQuestions = questions
        newQuestions[index].answer = {...newQuestions[index].answer, ...e};
        setQuestions([...newQuestions]);

        // Determine whether question is answered
        const newRequiredQuestions = requiredQuestions;
        const indexOfRequired = newRequiredQuestions.findIndex((question) => question.id === questionId);
        console.log(indexOfRequired);
        if(indexOfRequired >= 0){
            newRequiredQuestions[indexOfRequired].answered = !!e.value || !!e.options?.length;
            setRequiredQuestions(newRequiredQuestions);
        }
    };

    if (!questionnaire) {
        return null;
    }

    const answer = () => {
        setCurrentState(AnswerState.END);
        const data = {
            questionnaireId: questionnaire.questionnaireId,
            publishedQuestionnaireId: questionnaire.id,
            answers: questions.map((question) => ({
                questionId: question.question.questionId,
                value: question.answer.value,
                options: question.answer.options
            }))
        };
        answerQuestionnaire(questionnaire.questionnaireId, data);
    };

    const completeButtonDisabled = !requiredQuestions.every(({answered}) => answered);

    const questionnaireInfoTranslate = currentState === AnswerState.START ? "" : "translate-x-[-100vw]";
    const questionsTranslate = currentState === AnswerState.QUESTIONS ? "" : currentState === AnswerState.END ? "translate-x-[-100vw]" : "translate-x-[100vw]";
    const endTranslate = currentState === AnswerState.END ? "" : "translate-x-[100vw]";

    return (
        <>
            <AnswerScreen translate={questionnaireInfoTranslate}>
                <QuestionnaireInfo questionnaire={questionnaire} start={() => setCurrentState(AnswerState.QUESTIONS)}/>
            </AnswerScreen>
            <AnswerScreen translate={questionsTranslate}>
                <div className="max-w-xl w-full flex flex-col items-center">
                    {questions.map((question, index) => (
                        <Question bundle={question} key={index} setAnswer={(e) => setAnswer(e, index, question.question.questionId)}/>
                    ))}
                    <div className="w-full flex justify-between">
                        <AnswerButton text="Back" onClick={() => setCurrentState(AnswerState.START)}/>
                        <AnswerButton text="Complete" disabled={completeButtonDisabled} onClick={answer}/>
                    </div>
                </div>
            </AnswerScreen>
            <AnswerScreen translate={endTranslate}>
                <QuestionnaireEnd/>
            </AnswerScreen>
        </>
    );
};

export default Questionnaire;