import {RoleType} from "./role";

export enum Structure {
    LIST = "LIST",
    INDIVIDUAL = "INDIVIDUAL",
}

export enum Status {
    ACTIVE = "ACTIVE",
    PAUSED = "PAUSED",
}

export const statuses: Status[] = [Status.ACTIVE, Status.PAUSED];

export enum QuestionType {
    SELECT = "SELECT",
    MULTI_SELECT = "MULTI_SELECT",
    TEXT = "TEXT"
}

export interface ApplicationQuestionnaire {
    id: number;
    name: string;
    url: string;
    status: Status;
    spaceId: number;
}

export interface DashboardQuestionnaire extends ApplicationQuestionnaire {
    spaceName: string;
    role: RoleType;
    answerCount: number;
}

export interface DetailQuestionnaire extends ApplicationQuestionnaire {
    description: string | null;
    category: number;
    timeLimit: number | null;
    allowReturn: boolean;
    structure: Structure;
    passwordProtected: boolean;
}

export interface Question {
    id: number;
    title: string;
    description: string | null;
    visible: boolean;
    required: boolean;
    position: number;
    type: QuestionType;
    deleted: boolean;
    options: Option[];
    published: Date;
    updated: Date;
}

export interface Option {
    id: number;
    value: string;
    position: number;
    deleted: boolean;
}
