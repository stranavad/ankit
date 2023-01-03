import {RoleType} from "@/types/role";
import {ApplicationMember} from "@/types/member";

export interface ApplicationSpace {
    id: number;
    name: string;
    personal: boolean;
    role: RoleType;
    username: string;
    accepted: boolean;
}

export interface DetailSpace extends ApplicationSpace {
    description: string,
    members: ApplicationMember[];
}