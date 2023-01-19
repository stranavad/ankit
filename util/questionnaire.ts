import { ApplicationQuestionnaire, DetailQuestionnaire } from "@/types/questionnaire";

export const copyQuestionnaireLink = (questionnaire: ApplicationQuestionnaire | DetailQuestionnaire) => {
    navigator.clipboard.writeText(`${window.location.origin}/answer/${questionnaire.id}`);
}