"use client";
import { getQuestionnaire } from "@/routes/answer";
import { AnswerQuestionnaire } from "@/types/answer";
import { useState } from "react";
import PasswordProtected from "./PasswordProtected";
import Questionnaire from "./Questionnaire";
import DesignLayout from "@/components/Answer/DesignLayout";
import { Design } from "@/types/design";

// Used when incorrect password
const QuestionnaireWrapper = ({ hash, questionnaire = null, design }: {
    hash: string,
    questionnaire: AnswerQuestionnaire | null,
    design: Design
}) => {
    const [data, setData] = useState<AnswerQuestionnaire | null>(questionnaire);

    const unlockQuestionnaire = async (password: string) => {
        const { data } = await getQuestionnaire(hash, password);

        if (data) {
            setData(data);
        }
    };

    if (data) {
        return <DesignLayout design={design}><Questionnaire questionnaire={data} /></DesignLayout>;
    }

    return (
        <DesignLayout design={design}>
            <PasswordProtected unlock={unlockQuestionnaire} />
        </DesignLayout>
    );
};

export default QuestionnaireWrapper;