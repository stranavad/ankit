import request from "@/util/request";
import {AxiosPromise} from "axios";
import {
    ApplicationQuestionnaire,
    DetailQuestionnaire,
    Question,
    QuestionType,
    Status,
    Structure
} from "@/types/questionnaire";
import {ApplicationSpace} from "@/types/space";
import {ApplicationMember} from "@/types/member";


/* GET QUESTIONNAIRES */
export const getQuestionnaires = (spaceId: number, search?: string): AxiosPromise<ApplicationQuestionnaire[]> => {
    return request({
        url: `/questionnaire/space/${spaceId}`,
        method: "get",
        params: {search},
    });
};

/* CREATE QUESTIONNAIRE */
export const createQuestionnaire = (data: { name: string }, spaceId: number): AxiosPromise<DetailQuestionnaire> => {
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
export const getQuestionnaire = (id: number): AxiosPromise<DetailQuestionnaire | null> => {
    return request({
        url: `/questionnaire/${id}`,
        method: "get"
    });
};

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
}

/* UPDATE QUESTIONNAIRE */
export const updateQuestionnaire = (data: UpdateQuestionnaireData, id: number): AxiosPromise<DetailQuestionnaire> => {
    return request({
        url: `/questionnaire/${id}`,
        method: "put",
        data
    });
};

/* GET QUESTIONNAIRE QUESTIONS */
export const getQuestions = (id: number): AxiosPromise<Question[]> => {
    return request({
        url: `/questionnaire/${id}/questions`,
        method: "get"
    });
};

/* CREATE QUESTION */
export const createQuestion = (id: number, type: QuestionType): AxiosPromise<Question> => {
    return request({
        url: `/questionnaire/${id}/questions`,
        method: "post",
        data: {type}
    });
};