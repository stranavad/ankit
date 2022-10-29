import {RoleType} from "@/types/role";

export interface ApplicationMember {
    id: number;
    name: string;
    role: RoleType;
    accepted: boolean;
    email: string;
    // TODO image is not always defined
    image: string | null;
}