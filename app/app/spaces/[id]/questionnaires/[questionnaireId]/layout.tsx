"use client";
import {ReactNode, useContext, useEffect, useState} from "react";
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
import { useRouter } from "next/navigation";
import Tabs from "@/components/Navigation/Tabs";
import { TopBarContext } from "@/util/topBarContext";
import { getQuestionnaireLink, getSpaceLink } from "@/util/url";

const routes = [
    {
        name: "Dashboard",
        path: "",
    },
    {
        name: "Questions",
        path: "questions",
    },
    {
        name: "Settings",
        path: "settings",
    }
];


const QuestionnaireLayout = ({
    children,
    params: {questionnaireId}
}: { children: ReactNode, params: { questionnaireId: number } }) => {
    const {setSpace: setTopBarSpace, setQuestionnaire: setTopBarQuestionnaire} = useContext(TopBarContext);
    const [member, setMember] = useState<ApplicationMember>(defaultMember);
    const [space, setSpace] = useState<ApplicationSpace>(defaultSpace);
    const [questionnaire, setQuestionnaire] = useState<ApplicationQuestionnaire>(defaultQuestionnaire);

    const router = useRouter();

    const fetch = () => {
        questionnaireId && getCurrentQuestionnaire(questionnaireId)
            .then((response) => {
                if (response.data) {
                    response.data.member && setMember(response.data.member);
                    
                    if(response.data.space){
                        const space = response.data.space;
                        
                        setSpace(space);
                        setTopBarSpace({title: space.name, path: getSpaceLink(space.id)});

                        if(response.data.questionnaire){
                            const questionnaire = response.data.questionnaire;
    
                            setQuestionnaire(questionnaire);
                            setTopBarQuestionnaire({title: questionnaire.name, path: getQuestionnaireLink(space.id, questionnaire.id)})
                        }
                    }

                    
                    response.data.questionnaire && setQuestionnaire(response.data.questionnaire);
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
                        <Tabs routes={routes}/>
                        {children}
                </QuestionnaireContext.Provider>
            </SpaceContext.Provider>
        </MemberContext.Provider>
    );
};

export default QuestionnaireLayout;