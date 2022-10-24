import request from "@/util/request";
import {AxiosPromise} from "axios";
import {ApplicationSpace, DetailSpace} from "@/types/space";


export interface GetSpacesParams {
    accepted?: boolean | null;
    search?: string | null;
}

export const getSpaces = (params: GetSpacesParams): AxiosPromise<ApplicationSpace[]> => {
    return request({
        url: "/space",
        method: "get",
        params
    });
};

interface CreateSpaceData {
    spaceName: string;
    memberName: string;
}

export const createSpace = (data: CreateSpaceData): AxiosPromise<ApplicationSpace> => {
    return request({
        url: "/space",
        method: "post",
        data,
    });
};

/* DELETE SPACE*/
export const deleteSpace = (spaceId: number): AxiosPromise<string> => {
    return request({
        url: `/space/${spaceId}`,
        method: "delete",
    });
};

/* UPDATE SPACE */
export const updateSpace = (data: { name?: string, description?: string }, spaceId: number): AxiosPromise<ApplicationSpace> => {
    return request({
        url: `/space/${spaceId}`,
        method: "put",
        data
    });
};

/* UPDATE SPACE */
export const updateSpaceMember = (data: { name: string }, spaceId: number): AxiosPromise<ApplicationSpace> => {
    return request({
        url: `/space/${spaceId}/member`,
        method: "put",
        data
    });
};

/* HAS ACCESS TO SPACE */
export const getSpaceById = (id: number): AxiosPromise<DetailSpace> => {
    return request({
        url: `/space/${id}`,
        method: "get"
    });
};
