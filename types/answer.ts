import { QuestionType, Structure } from "./questionnaire";

export interface AnswerQuestionnaire {
    id: number;
    questionnaireId: number;
    name: string;
    description: string;
    structure: Structure;
    publishedAt: Date;
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

export type AnswerEvent = {value?: string, options?: number[]};

export interface QuestionWithAnswer {
    question: AnswerQuestion;
    answer: Answer;
}