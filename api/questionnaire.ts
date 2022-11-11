import request from "@/util/request";
import {AxiosPromise} from "axios";
import {DetailQuestionnaire, Status, Structure} from "@/types/questionnaire";


/* CREATE QUESTIONNAIRE */
export const createQuestionnaire = (data: { name: string, spaceId: number }): AxiosPromise<DetailQuestionnaire> => {
    return request({
        url: `/questionnaire`,
        method: "post",
        data
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
export const updateQuestionnaire = (data: any, id: number): AxiosPromise<DetailQuestionnaire> => {
    return request({
        url: `/questionnaire/${id}`,
        method: "put",
        data
    });
};

