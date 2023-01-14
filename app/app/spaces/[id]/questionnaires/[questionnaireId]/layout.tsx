"use client";
import {ReactNode, useEffect, useState} from "react";
import {getCurrentQuestionnaire} from "@/routes/questionnaire";
import {ApplicationMember} from "@/types/member";
import {
    defaultMember,
    defaultQuestionnaire,
    defaultSpace,
    MemberContext,
    QuestionnaireContext,
    SpaceContext
} from "@/util/context";
import {ApplicationSpace} from "@/types/space";
import {ApplicationQuestionnaire} from "@/types/questionnaire";
import {useRouter} from "next/navigation";


const QuestionnaireLayout = ({
    children,
    params: {questionnaireId}
}: { children: ReactNode, params: { questionnaireId: number } }) => {
    const [member, setMember] = useState<ApplicationMember>(defaultMember);
    const [space, setSpace] = useState<ApplicationSpace>(defaultSpace);
    const [questionnaire, setQuestionnaire] = useState<ApplicationQuestionnaire>(defaultQuestionnaire);

    const router = useRouter();

    const fetch = () => {
        questionnaireId && getCurrentQuestionnaire(questionnaireId)
            .then((response) => {
                if (response.data) {
                    response.data.member && setMember(response.data.member);
                    response.data.space && setSpace(response.data.space);
                    response.data?.questionnaire && setQuestionnaire(response.data.questionnaire);
                } else {
                    router.push("/questionnaire/not-found");
                }
            });
    };

    useEffect(fetch, [questionnaireId]);

    return (
        <MemberContext.Provider value={{member}}>
            <SpaceContext.Provider value={{space}}>
                <QuestionnaireContext.Provider value={{questionnaire}}>
                    {children}
                </QuestionnaireContext.Provider>
            </SpaceContext.Provider>
        </MemberContext.Provider>
    );
};

export default QuestionnaireLayout;