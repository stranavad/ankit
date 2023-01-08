export interface PublishedQuestionnaire {
    id: number;
    questionnaireId: number;
    version: string;
    name: string;
    publishedAt: Date;
    publisher: {
        id: number;
        name: string;
    }
}