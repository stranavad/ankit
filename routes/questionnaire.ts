import request from "@/util/request";
import {AxiosPromise} from "axios";
import {ApplicationQuestionnaire, DashboardQuestionnaire, DetailQuestionnaire, Status, Structure} from "@/types/questionnaire";
import {ApplicationSpace} from "@/types/space";
import {ApplicationMember} from "@/types/member";
import {useRequest} from "@/routes";

/* GET QUESTIONNAIRES */
export const useQuestionnaires = (spaceId: number) => useRequest<ApplicationQuestionnaire[]>(`/questionnaire/space/${spaceId}`);

/* GET DASHBOARD QUESTIONNAIRES */
export const useDashboardQuestionnaires = () => useRequest<DashboardQuestionnaire[]>(`/questionnaire/dashboard`);

/* CREATE QUESTIONNAIRE */
export interface CreateQuestionnaireData {
    name: string;
}

export const createQuestionnaire = (data: CreateQuestionnaireData, spaceId: number): AxiosPromise<ApplicationQuestionnaire> => {
    return request({
        url: `/questionnaire/space/${spaceId}`,
        method: "post",
        data
    });
};

/* GET CURRENT INFORMATION */
interface CurrentQuestionnaireResponse {
    space: ApplicationSpace | null;
    member: ApplicationMember | null;
    questionnaire: ApplicationQuestionnaire | null;
}

export const getCurrentQuestionnaire = (questionnaireId: number): AxiosPromise<CurrentQuestionnaireResponse | null> => {
    return request({
        url: `/questionnaire/${questionnaireId}/current`,
        method: "get",
    });
};

/* GET QUESTIONNAIRE */
export const useQuestionnaire = (id: number) => useRequest<DetailQuestionnaire>(`/questionnaire/${id}`);

export interface UpdateQuestionnaireData {
    name?: string;
    description?: string;
    structure?: Structure;
    category?: number;
    status?: Status;
    timeLimit?: number;
    allowReturn?: boolean;
    passwordProtected?: boolean;
    password?: string | null;
    url?: string;
    manualPublish?: boolean;
}

/* UPDATE QUESTIONNAIRE */
export const updateQuestionnaire = (data: UpdateQuestionnaireData, id: number): AxiosPromise<DetailQuestionnaire> => {
    return request({
        url: `/questionnaire/${id}`,
        method: "put",
        data
    });
};

/* DELETE QUESTIONNAIRE */
export const deleteQuestionnaire = (id: number): AxiosPromise<boolean> => {
    return request({
        url: `/questionnaire/${id}`,
        method: "delete"
    });
};

/* CHECK QUESTIONNAIRE URL */
export const checkQuestionnaireUrl = (url: string): AxiosPromise<boolean> => {
    return request({
        url:`/check/questionnaire-url`,
        method: 'get',
        params: {url}
    })
}

