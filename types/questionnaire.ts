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
    status: string;
    spaceId: number;
}

export interface DetailQuestionnaire extends ApplicationQuestionnaire {
    description: string | null;
    category: number;
    timeLimit: number | null;
    allowReturn: boolean;
    structure: Structure;
    passwordProtected: boolean;
}