export enum Structure {
    LIST = "list",
    INDIVIDUAL = "individual",
}

export enum Status {
    ACTIVE = "active",
    PAUSED = "paused",
}

export enum QuestionType {
    SELECT = "select",
    MULTI_SELECT = "multiselect",
    TEXT = "text"
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

export interface Question {
    id: number;
    title: string;
    description: string | null;
    visible: boolean;
    required: boolean;
    position: number;
    type: QuestionType;
    options: Option[];
}

export interface Option {
    id: number;
    value: string;
    position: number;
}
