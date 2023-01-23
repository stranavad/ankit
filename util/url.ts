export const getSpaceLink = (id: number) => `/app/spaces/${id}`;

export const getQuestionnaireLink = (spaceId: number, questionnaireId: number) => `/app/spaces/${spaceId}/questionnaires/${questionnaireId}`;