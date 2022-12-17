import request from "@/util/request";
import {AxiosPromise} from "axios";
import {Question, QuestionType} from "@/types/questionnaire";
import {useRequest} from "@/routes";


export const useQuestions = (id: number) => useRequest<Question[]>(`/questionnaire/${id}/question`);
/* GET QUESTIONNAIRE QUESTIONS */

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

/* ADD QUESTION OPTION */
export const createOption = (questionnaireId: number, questionId: number, data: { value: string }): AxiosPromise<Question> => {
    return request({
        url: `/questionnaire/${questionnaireId}/question/${questionId}/option`,
        method: "post",
        data
    });
};

/* UPDATE OPTION POSITION */
export const updateOptionPosition = (questionnaireId: number, questionId: number, data: { activeIndex: number, overIndex: number }): AxiosPromise<Question> => {
    return request({
        url: `/questionnaire/${questionnaireId}/question/${questionId}/option/position`,
        method: "put",
        data
    });
};

/* UPDATE OPTION */
export const updateOption = (questionnaireId: number, questionId: number, optionId: number, data: { value: string }): AxiosPromise<Question> => {
    return request({
        url: `/questionnaire/${questionnaireId}/question/${questionId}/option/${optionId}`,
        method: "put",
        data
    });
};

/* DELETE OPTION */
export const deleteOption = (questionnaireId: number, questionId: number, optionId: number): AxiosPromise<Question> => {
    return request({
        url: `/questionnaire/${questionnaireId}/question/${questionId}/option/${optionId}`,
        method: "delete"
    });
};

export const duplicateQuestion = (questionnaireId: number, questionId: number): AxiosPromise<Question[]> => {
    return request({
        url: `/questionnaire/${questionnaireId}/question/${questionId}/duplicate`,
        method: 'post'
    })
}