import {RoleType} from "@/types/role";

export interface ApplicationSpace {
    id: number;
    name: string;
    personal: boolean;
    role: RoleType;
    username: string;
    accepted: boolean;
    memberCount: number;
}