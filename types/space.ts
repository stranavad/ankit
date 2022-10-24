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

export interface DetailSpace {
    id: number;
    name: string;
    description: string | null;
    personal: boolean;
    members: ApplicationMember[];
}