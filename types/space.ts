import {ApplicationMember} from "@/types/member";
import {RoleType} from "@/types/role";

export interface ApplicationSpace {
    id: number;
    name: string;
    personal: boolean;
    username: string;
    role: RoleType;
    accepted: boolean;
}

export interface DetailSpace extends ApplicationSpace {
    description: string,
    members: ApplicationMember[];
}