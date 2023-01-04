import {ApplicationMember} from "@/types/member";

export interface ApplicationSpace {
    id: number;
    name: string;
    personal: boolean;
    username: string;
    accepted: boolean;
}

export interface DetailSpace extends ApplicationSpace {
    description: string,
    members: ApplicationMember[];
}