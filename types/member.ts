import {RoleType} from "@/types/role";

export interface ApplicationMember {
    id: number;
    name: string;
    role: RoleType;
    accepted: boolean;
    email: string;
}