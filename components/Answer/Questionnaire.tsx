"use client";
import { getQuestionnaire } from "@/routes/answer";
import { Answer, AnswerEvent, AnswerQuestion, AnswerQuestionnaire, QuestionWithAnswer } from "@/types/answer";
import { QuestionType } from "@/types/questionnaire";
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
        if(e.type === QuestionType.TEXT){
            newQuestions[index].answer.value = e.value;
        } else if (e.type === QuestionType.MULTI_SELECT || e.type === QuestionType.SELECT){
            newQuestions[index].answer.options = e.options;
        }
        setQuestions([...newQuestions]);
    }

    if(passwordProtected){
        return <PasswordProtection unlock={unlockQuestionnaire}/>
    }

    if(!questionnaire){
        return null;
    }

    return (
        <div className="max-w-xl w-full">
        <QuestionnaireInfo questionnaire={questionnaire}/>
                {questions.map((question, index) => (
                    <Question bundle={question} key={index} setAnswer={(e) => setAnswer(e, index)}/>
                ))}
        </div>
    )
}

export default Questionnaire;