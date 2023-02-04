export const copyQuestionnaireLink = (questionnaire: { url: string }) => {
    navigator.clipboard.writeText(`${window.location.origin}/answer/${questionnaire.url}`);
};