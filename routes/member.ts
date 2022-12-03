import request from "@/util/request";
import {RoleType} from "@/types/role";
import {AxiosPromise} from "axios";
import {ApplicationMember} from "@/types/member";


export const updateMemberRole = (role: RoleType, memberId: number, spaceId: number): AxiosPromise<ApplicationMember> => {
    return request({
        url: `/space/${spaceId}/member/${memberId}`,
        method: "put",
        data: {
            role
        }
    });
};
