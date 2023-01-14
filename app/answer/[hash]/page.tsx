import Questionnaire from "@/components/Answer/Questionnaire";
import { getQuestionnaire } from "@/routes/answer";
import { AnswerQuestionnaire } from "@/types/answer";

export default async function AnswerPage({params: {hash}, searchParams: {password}}: {params: {hash: string}, searchParams: {password?: string}}){
    const data: AnswerQuestionnaire | boolean = await getQuestionnaire(hash, password);


    return (
        <Questionnaire questionnaire={typeof data === 'boolean' ? false : data} hash={hash}/>
    )
}