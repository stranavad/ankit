import request from "@/util/request";
import {AxiosPromise} from "axios";
import {ApplicationSpace, DetailSpace} from "@/types/space";
import {RoleType} from "@/types/role";
import {ApplicationMember} from "@/types/member";
import {useRequest} from "@/routes";


export interface GetSpacesParams {
    accepted?: boolean | null;
    search?: string | null;
}

export const useSpaces = () => useRequest<ApplicationSpace[]>("/spaces");
export const getSpaces = (params: GetSpacesParams): AxiosPromise<ApplicationSpace[]> => {
    return request({
        url: "/spaces",
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
        url: "/spaces",
        method: "post",
        data,
    });
};

/* DELETE SPACE*/
export const deleteSpace = (spaceId: number): AxiosPromise<string> => {
    return request({
        url: `/spaces/${spaceId}`,
        method: "delete",
    });
};

/* UPDATE SPACE */
export const updateSpace = (data: { name?: string, description?: string }, spaceId: number): AxiosPromise<ApplicationSpace> => {
    return request({
        url: `/spaces/${spaceId}`,
        method: "put",
        data
    });
};

/* UPDATE SPACE */
export const updateSpaceMember = (data: { name: string }, spaceId: number): AxiosPromise<ApplicationSpace> => {
    return request({
        url: `/spaces/${spaceId}/member`,
        method: "put",
        data
    });
};

/* HAS ACCESS TO SPACE */
export const getSpaceById = (id: number): AxiosPromise<DetailSpace> => {
    return request({
        url: `/spaces/${id}`,
        method: "get"
    });
};

/* ADD MEMBER TO SPACE */
interface AddMemberToSpaceData {
    userId: number;
    username: string;
    role?: RoleType;
}

export const addMemberToSpace = (data: AddMemberToSpaceData, id: number): AxiosPromise<ApplicationMember[]> => {
    return request({
        url: `/spaces/${id}/member`,
        method: "post",
        data
    });
};


/* GET SPACE MEMBERS */
export const useSpaceMembers = (id: number) => useRequest<ApplicationMember[]>(`/spaces/${id}/member`);

/* REMOVE MEMBER FROM SPACE */
export const removeMemberFromSpace = (spaceId: number, memberId: number): AxiosPromise<ApplicationMember[]> => {
    return request({
        url: `/spaces/${spaceId}/member/${memberId}`,
        method: "delete"
    });
};

/* GET CURRENT SPACE INFO */
interface GetCurrentSpaceResponse {
    space: DetailSpace,
    member: ApplicationMember
}

export const getCurrentSpace = (id: number): AxiosPromise<GetCurrentSpaceResponse> => {
    return request({
        url: `/spaces/${id}/current`,
        method: "get"
    });
};

/* ACCEPT SPACE INVITATION */
export const acceptSpaceInvitation = (spaceId: number, accept: boolean): AxiosPromise => {
    return request({
        url: `/spaces/${spaceId}/accept`,
        method: "post",
        data: {
            accept
        }
    });
};