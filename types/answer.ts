import { QuestionType, Structure } from "./questionnaire";
import { Design } from "@/types/design";

export interface AnswerQuestionnaire {
    id: number | null;
    questionnaireId: number;
    name: string;
    description: string;
    structure: Structure;
    publishedAt: Date;
    design: Design;
    questions: AnswerQuestion[];
}

export interface AnswerQuestion {
    id: number;
    publishedId: number;
    title: string;
    description: string | null;
    required: boolean;
    type: QuestionType;
    options: AnswerOption[];
    questionId: number;
}

export interface AnswerOption {
    optionId: number;
    value: string;
}

export interface Answer {
    value: string;
    options: number[];
    answered: boolean;
}

export type AnswerEvent = { value?: string, options?: number[] };

export interface QuestionWithAnswer {
    question: AnswerQuestion;
    answer: Answer;
}

export interface AnswerError {
    status: number;
    error: string;
    data: {
        design: Design
    };
}