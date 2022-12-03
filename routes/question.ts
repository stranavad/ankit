import request from "@/util/request";
import {AxiosPromise} from "axios";
import {Question, QuestionType} from "@/types/questionnaire";
import {useRequest} from "@/routes";


export const useQuestions = (id: number) => useRequest<Question[]>(`/questionnaire/${id}/question`);
/* GET QUESTIONNAIRE QUESTIONS */
export const getQuestions = (id: number): AxiosPromise<Question[]> => {
    return request({
        url: `/questionnaire/${id}/question`,
        method: "get"
    });
};

/* CREATE QUESTION */
interface CreateQuestionData {
    type: QuestionType;
    previousId: number | null;
    nextId: number | null;
}

/* CREATE QUESTION */
export const createQuestion = (id: number, data: CreateQuestionData): AxiosPromise<Question[]> => {
    return request({
        url: `/questionnaire/${id}/question`,
        method: "post",
        data,
    });
};

/* UPDATE QUESTION */
interface UpdateQuestionData {
    title?: string;
    description?: string;
    required?: boolean;
    visible?: boolean;
}

export const updateQuestion = (questionnaireId: number, questionId: number, data: UpdateQuestionData): AxiosPromise<Question> => {
    return request({
        url: `/questionnaire/${questionnaireId}/question/${questionId}`,
        method: "put",
        data
    });
};