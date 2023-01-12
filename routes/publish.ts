import { PublishedQuestionnaire } from '@/types/publish';
import request from '@/util/request';
import { useRequest } from '@/routes';
import { AxiosPromise } from 'axios';

const KEYWORD = 'publish';

export const usePublishedQuestionnaires = (id: number) => useRequest<PublishedQuestionnaire[]>(`/${KEYWORD}/${id}`);

export const publishQuestionnaire = (questionnaireId: number, data: {name: string}) => {
    return request({
        url: `/${KEYWORD}/${questionnaireId}`,
        method: 'post',
        data
    })
}

export const updatePublishedQuestionnaire = (questionnaireId: number, publishedId: number, data: {name: string}): AxiosPromise<PublishedQuestionnaire> => {
    return request({
        url: `/${KEYWORD}/${questionnaireId}/${publishedId}`,
        method: 'put',
        data
    })
}

export const deletePublishedQuestionnaire = (questionnaireId: number, publishedId: number): AxiosPromise<boolean> => {
    return request({
        url: `/${KEYWORD}/${questionnaireId}/${publishedId}`,
        method: 'delete',
    })
}

export const getPublishedQuestionnaire = (questionnaireId: number, publishedId: number): AxiosPromise<any> => {
    return request({
        url: `/${KEYWORD}/${questionnaireId}/${publishedId}`,
        method: 'get',
    })
}

interface CheckQuestionnairePublish {
    lastPublished: Date;
    canPublish: boolean;
}

export const checkQuestionnairePublish = (questionnaireId: number): AxiosPromise<CheckQuestionnairePublish> => {
    return request({
        url: `/${KEYWORD}/${questionnaireId}/status`,
        method: 'get'
    })
}