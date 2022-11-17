import {createContext} from "react";
import {ApplicationQuestionnaire, Status} from "@/types/questionnaire";

interface QuestionnaireContextData {
    questionnaire: ApplicationQuestionnaire;
}

export const defaultQuestionnaire: ApplicationQuestionnaire = {
    id: 0,
    name: "",
    status: Status.PAUSED,
    url: null,
    spaceId: 0,
};

export const QuestionnaireContext = createContext<QuestionnaireContextData>({questionnaire: defaultQuestionnaire});