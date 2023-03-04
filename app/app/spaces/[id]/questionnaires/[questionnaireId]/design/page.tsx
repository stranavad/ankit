"use client";
import Content from "@/components/Utils/Content";
import PageHeader from "@/components/Utils/PageHeader";
import { defaultDesign, Design } from "@/types/design";
import AnswerQuestion from '@/components/Answer/Question';
import { usePreviewQuestions } from "@/routes/answerPreview";

const QuestionnaireDesign = ({params: {questionnaireId: id}}: {params: {questionnaireId: string}}) => {
    const questionnaireId = parseInt(id);
    const {data} = usePreviewQuestions(questionnaireId);
    // const {data: questions} = useQuestions(questionnaireId);
    // const {questionnaire} = useContext(QuestionnaireContext);

    const design: Design = {
        font: null,
        logoUrl: null,
        logoPlacement: null,
        backgroundColor: '#7b65a9',
        backgroundImage: null,
        optionSelectedColor: null,
        optionColor: null,
        buttonColor: '#00a8e5',
        buttonTextColor: '#ffffff',
        textColor: '#000000',
    }

    return (
        <Content>
            <PageHeader title="Design"/>
            <div className="bg-black w-100 flex flex-col p-10" style={{backgroundColor: design.backgroundColor ?? (defaultDesign.backgroundColor ?? undefined)}}>
                {data?.questions?.map((question) => (
                    <AnswerQuestion bundle={{question, answer: {value: '', options: [], answered: false}}} setAnswer={() => undefined}/>
                    // <h1 className="text-slate-100" key={question.id} style={{color: design.textColor ?? (defaultDesign.textColor ?? undefined)}}>{question.title}</h1>
                ))}
            </div>
        </Content>
    )
}

export default QuestionnaireDesign;