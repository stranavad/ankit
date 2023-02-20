"use client";
import {deleteAnswer, useAllResults, useQuestionnaireStatistics} from "@/routes/results";
import {lazy, Suspense, useContext} from "react";
import Loading from "./questions/loading";
import PageHeader from "@/components/Utils/PageHeader";
import ShareButton from "@/components/Sharing/ShareButton";
import {QuestionnaireContext} from "@/util/questionnaireContext";
import Content from "@/components/Utils/Content";

const QuestionResult = lazy(() => import("@/components/Result/QuestionResult"));
const QuestionnaireStatistics = lazy(() => import("@/components/Result/QuestionnaireStatistics"));

const Questionnaire = ({params: {questionnaireId}}: { params: { questionnaireId: string } }) => {
    const id = Number(questionnaireId);
    const {questionnaire} = useContext(QuestionnaireContext);
    const {data, mutate} = useAllResults(id);
    const {data: statistics} = useQuestionnaireStatistics(id);
    const results = data?.questions || null;


    const removeAnswer = (questionId: number, answerId: number) => {
        const optimisticData = {
            ...data,
            questions: data?.questions.map((result) => result.question.id === questionId ? ({
                ...result,
                data: result.data?.filter((answer) => answer.id !== answerId) || []
            }) : result) || []
        };


        mutate(async (result) => {
            if (!result) {
                return result;
            }

            const newResult = (await deleteAnswer(id, questionId, answerId)).data;
            return {
                ...result,
                questions: result.questions.map((result) => result.question.id === questionId ? newResult : result)
            };
        }, {revalidate: false, optimisticData});
    };

    if (!results || !statistics) {
        return null;
    }

    return (
        <Content>
            <PageHeader title="Statistics">
                <ShareButton questionnaire={questionnaire}/>
            </PageHeader>
            {statistics.labels.length ? (
                <>
                    <Suspense fallback={<Loading/>}>
                        <QuestionnaireStatistics data={statistics}/>
                    </Suspense>

                    <PageHeader title="Questions" className="mb-5"/>
                    {results.map((result) => (
                        <Suspense fallback={<Loading/>} key={result.question.id}>
                            <QuestionResult key={result.question.id} result={result} removeAnswer={removeAnswer}/>
                        </Suspense>
                    ))}
                </>
            ) : (
                <>
                    <span className="text-sm">There are no answers...yet</span>
                </>
            )}
        </Content>
    );
};

export default Questionnaire;