"use client";
import {ReactNode, useContext, useEffect} from "react";
import {useQuestionnaire} from "@/routes/questionnaire";
import {
    defaultQuestionnaire,
    QuestionnaireContext,
} from "@/util/context";
import {useRouter} from "next/navigation";
import Tabs from "@/components/Navigation/Tabs";
import {TopBarContext} from "@/util/topBarContext";
import {getQuestionnaireLink} from "@/util/url";

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
    params: {questionnaireId, id: spaceIdProp}
}: { children: ReactNode, params: { questionnaireId: string, id: string } }) => {
    const id = Number(questionnaireId);
    const spaceId = Number(spaceIdProp);
    const {data, isError} = useQuestionnaire(id);

    const {setQuestionnaire: setTopBarQuestionnaire} = useContext(TopBarContext);
    const router = useRouter();

    if (isError) {
        router.push(`/app/spaces/${spaceId}/questionnaires/not-found`);
    }

    useEffect(() => {
        if (!data) {
            return;
        }

        setTopBarQuestionnaire({
            title: data.name,
            path: getQuestionnaireLink(spaceId, data.id)
        });
    }, [data?.name, data?.id]);

    return (
        <QuestionnaireContext.Provider value={{questionnaire: data || defaultQuestionnaire}}>
            <Tabs routes={routes}/>
            {children}
        </QuestionnaireContext.Provider>
    );
};

export default QuestionnaireLayout;