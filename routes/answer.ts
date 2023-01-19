import { AnswerQuestionnaire } from "@/types/answer";
import { request } from "http";

export const getQuestionnaire = async (hash: string, password?: string): Promise<AnswerQuestionnaire | boolean> => {
    const body = JSON.stringify({password: password || ""});
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}answer/${hash}`,
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body
    })

    return response.json();
}

export const answerQuestionnaire = async (hash: string, data: any) => {
    const body = JSON.stringify(data);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}answer/${hash}/answer`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body
    })
    return response;
}