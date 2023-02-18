import Questionnaire from "@/components/Answer/Questionnaire";
import { getQuestionnaire } from "@/routes/answer";
import { AnswerError, AnswerQuestionnaire } from "@/types/answer";
import Error from '@/components/Answer/Error';
import QuestionnaireWrapper from "@/components/Answer/QuestionnaireWrapper";

export default async function AnswerPage({params: {hash}, searchParams: {password}}: {params: {hash: string}, searchParams: {password?: string}}){
    const {data, error} = await getQuestionnaire(hash, password);

    // Client-side component for password entering
    if(error?.status === 420){
        return <QuestionnaireWrapper hash={hash}/>
    }


    // Something is very wrong
    if(error){
        return <Error error={error.error} status={error.status}/>
    }

    // Something is very correct
    if(data){
        return (
            <Questionnaire questionnaire={data}/>
        )
    }
}

