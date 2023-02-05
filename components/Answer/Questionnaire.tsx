"use client";
import {answerQuestionnaire, getQuestionnaire} from "@/routes/answer";
import {AnswerEvent, AnswerQuestion, AnswerQuestionnaire, QuestionWithAnswer} from "@/types/answer";
import {useEffect, useState} from "react";
import PasswordProtection from "./PasswordProtected";
import Question from "./Question";
import QuestionnaireInfo from "./QuestionnaireInfo";
import AnswerButton from "@/components/Answer/Button";
import QuestionnaireEnd from "@/components/Answer/QuestionnaireEnd";
import AnswerScreen from "@/components/Answer/AnswerScreen";

interface QuestionnaireProps {
    questionnaire: AnswerQuestionnaire | boolean;
    hash: string;
}

const getQuestionsWithAnswers = (questions: AnswerQuestion[]): QuestionWithAnswer[] => questions.map((question) => ({
    question,
    answer: {value: "", options: []}
}));

enum AnswerState {
    START,
    QUESTIONS,
    END
}

const Questionnaire = ({questionnaire: questionnaireProp, hash}: QuestionnaireProps) => {
    const [questionnaire, setQuestionnaire] = useState<AnswerQuestionnaire | null>(typeof questionnaireProp === "boolean" ? null : questionnaireProp);
    const [passwordProtected, setPasswordProtected] = useState<boolean>(typeof questionnaireProp === "boolean");
    const [questions, setQuestions] = useState<QuestionWithAnswer[]>([]);
    const [currentState, setCurrentState] = useState<AnswerState>(AnswerState.START);

    useEffect(() => {
        if (typeof questionnaireProp !== "boolean") {
            setQuestions(getQuestionsWithAnswers(questionnaireProp.questions));
        }
    }, []);

    const unlockQuestionnaire = async (password: string) => {
        const data = await getQuestionnaire(hash, password);
        if (typeof data !== "boolean") {
            setQuestionnaire(data);
            setPasswordProtected(false);
            setQuestions(getQuestionsWithAnswers(data.questions));
        }
    };

    const setAnswer = (e: AnswerEvent, index: number) => {
        const newQuestions = questions;
        newQuestions[index].answer = {...newQuestions[index].answer, ...e};
        setQuestions([...newQuestions]);
    };


    if (passwordProtected) {
        return <PasswordProtection unlock={unlockQuestionnaire}/>;
    }

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
                        <Question bundle={question} key={index} setAnswer={(e) => setAnswer(e, index)}/>
                    ))}
                    <div className="w-full flex justify-between">
                        <AnswerButton text="Back" onClick={() => setCurrentState(AnswerState.START)}/>
                        <AnswerButton text="Complete" onClick={answer}/>
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