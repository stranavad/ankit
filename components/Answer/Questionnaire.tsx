"use client";
import { answerQuestionnaire, getQuestionnaire } from "@/routes/answer";
import { AnswerEvent, AnswerQuestion, AnswerQuestionnaire, QuestionWithAnswer } from "@/types/answer";
import { useEffect, useState } from "react";
import PasswordProtection from "./PasswordProtected";
import Question from "./Question";
import QuestionnaireInfo from "./QuestionnaireInfo";

interface QuestionnaireProps {
    questionnaire: AnswerQuestionnaire | boolean;
    hash: string;
}

const getQuestionsWithAnswers = (questions: AnswerQuestion[]): QuestionWithAnswer[] => questions.map((question) => ({
    question,
    answer: {value: '', options: []}
}))

const Questionnaire = ({questionnaire: questionnaireProp, hash}: QuestionnaireProps) => {
    const [questionnaire, setQuestionnaire] = useState<AnswerQuestionnaire | null>(typeof questionnaireProp === 'boolean' ? null : questionnaireProp);
    const [passwordProtected, setPasswordProtected] = useState<boolean>(typeof questionnaireProp === 'boolean');
    const [questions, setQuestions] = useState<QuestionWithAnswer[]>([]);

    useEffect(() => {
        if(typeof questionnaireProp !== 'boolean'){
            setQuestions(getQuestionsWithAnswers(questionnaireProp.questions));
        }
    }, [])

    const unlockQuestionnaire = async (password: string) => {
        const data = await getQuestionnaire(hash, password);
        if(typeof data !== 'boolean'){
            setQuestionnaire(data);
            setPasswordProtected(false);
            setQuestions(getQuestionsWithAnswers(data.questions));
        }
    }

    const setAnswer = (e: AnswerEvent, index: number) => {
        const newQuestions = questions;
        newQuestions[index].answer = {...newQuestions[index].answer, ...e}
        setQuestions([...newQuestions]);
    }


    if(passwordProtected){
        return <PasswordProtection unlock={unlockQuestionnaire}/>
    }

    if(!questionnaire){
        return null;
    }

    const answer = () => {
        const data = {
            questionnaireId: questionnaire.questionnaireId,
            publishedQuestionnaireId: questionnaire.id,
            answers: questions.map((question) => ({questionId: question.question.questionId, value: question.answer.value, options: question.answer.options}))
        }
        answerQuestionnaire(hash, data);
    }

    return (
        <div className="max-w-xl w-full">
        <QuestionnaireInfo questionnaire={questionnaire}/>
                {questions.map((question, index) => (
                    <Question bundle={question} key={index} setAnswer={(e) => setAnswer(e, index)}/>
                ))}
                <div className="w-full flex justify-end">
                    <button className="bg-slate-500 text-slate-200 p-2 rounded-md font-medium" onClick={answer}>Complete</button>
                </div>
        </div>
    )
}

export default Questionnaire;