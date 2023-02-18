"use client";
import { getQuestionnaire } from "@/routes/answer";
import { AnswerQuestionnaire } from "@/types/answer";
import { useState } from "react";
import PasswordProtection from "./PasswordProtected";
import Questionnaire from './Questionnaire';

// Used when incorrect password
const QuestionnaireWrapper = ({hash}: {hash:string}) => {
    const [data, setData] = useState<AnswerQuestionnaire | null>(null);

    const unlockQuestionnaire = async (password: string) => {
        const {data, error} = await getQuestionnaire(hash, password);

        if(data){
            setData(data);
        }
    }

    if(data){
        return <Questionnaire questionnaire={data}/>
    }

    return <PasswordProtection unlock={unlockQuestionnaire}/>
}

export default QuestionnaireWrapper;