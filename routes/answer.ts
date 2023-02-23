import { Answer, AnswerError, AnswerQuestionnaire } from "@/types/answer";

const HEADERS = {'Content-Type': 'application/json'}

export const getQuestionnaire = async (hash: string, password?: string): Promise<{data: AnswerQuestionnaire | null, error: AnswerError | null}> => {
    const body = JSON.stringify({password: password || ""});
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}answer/${hash}`,
    {
        method: 'POST',
        headers: HEADERS,
        body,
        cache: 'no-store'
    })

    const responseJson = await response.json(); 

    if(response.status !== 201) {
        // @ts-ignore
        return {data: null, error: responseJson}
    }

    // @ts-ignore
    return {data: responseJson, error: null};
}

export const answerQuestionnaire = async (id: number, data: any) => {
    const body = JSON.stringify(data);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}answer/${id}/answer`,{
        method: 'POST',
        headers: HEADERS,
        body
    })
    return response;
}