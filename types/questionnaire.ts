export enum Structure {
    LIST = "list",
    INDIVIDUAL = "individual",
}

export enum Status {
    ACTIVE = "active",
    PAUSED = "paused",
}

export interface ApplicationQuestionnaire {
    id: number;
    name: string;
    url: string | null;
    status: Status;
    spaceId: number;
}

export interface DetailQuestionnaire extends ApplicationQuestionnaire {
    description: string | null;
    category: number;
    timeLimit: number | null;
    allowReturn: boolean;
    structure: Structure;
    passwordProtected: boolean;
    password: string | null;
}

export interface QuestionOption {
    id: number;
    value: string;
}