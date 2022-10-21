import request from "@/util/request";
import {AxiosPromise} from "axios";
import {ApplicationSpace} from "@/types/space";


export const getSpaces = (): AxiosPromise<ApplicationSpace[]> => {
    return request({
        url: "/space",
        method: "get",
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

