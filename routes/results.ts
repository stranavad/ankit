import { QuestionnaireStatistics, Result } from "@/types/result";
import request from "@/util/request";
import { AxiosPromise } from "axios";
import { useRequest } from ".";

const KEYWORD = 'result';

export const useAllResults = (id: number) => useRequest<{questions: Result[]}>(`/${KEYWORD}/${id}`)
export const useQuestionnaireStatistics = (id: number) => useRequest<QuestionnaireStatistics>(`/${KEYWORD}/${id}/statistics`);

export const getQuestionnaireStatistics = (questionnaireId: number): AxiosPromise<any> => {
    return request({
        url: `/${KEYWORD}/${questionnaireId}/statistics`,
        method: 'get',
    })
}

export const deleteAnswer = (questionnaireId: number, questionId: number, answerId: number): AxiosPromise<Result> =>  {
    return request({
        url: `/${KEYWORD}/${questionnaireId}/${questionId}/answer/${answerId}`,
        method: 'delete'
    })
}