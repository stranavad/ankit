import { AnswerQuestionnaire } from "@/types/answer";

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