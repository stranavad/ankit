import { AnswerQuestionnaire } from "@/types/answer";
import { useRequest } from ".";

export const usePreviewQuestions = (questionnaireId: number) => useRequest<AnswerQuestionnaire>(`/answer/${questionnaireId}/preview`);