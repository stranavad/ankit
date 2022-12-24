import {Question} from "@/types/questionnaire";
import {createContext} from "react";

export const QuestionsWidgetContext = createContext<{ questions: Question[], setQuestions: (questions: Question[]) => void }>({
    questions: [],
    setQuestions: () => undefined
});