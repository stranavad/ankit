export enum QuestionProperty {
    TITLE = "title",
    DESCRIPTION = "description",
    VISIBLE = "visible",
    REQUIRED = "required",
}

export type QuestionUpdateProperty =
    | [QuestionProperty.TITLE, string]
    | [QuestionProperty.DESCRIPTION, string]
    | [QuestionProperty.REQUIRED, boolean]
    | [QuestionProperty.VISIBLE, boolean]