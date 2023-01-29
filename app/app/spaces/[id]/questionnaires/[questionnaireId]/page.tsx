"use client";
import { deleteAnswer, useAllResults, useQuestionnaireStatistics } from "@/routes/results";
import {lazy, Suspense} from "react";
import Loading from './questions/loading';

const QuestionResult = lazy(() => import('@/components/Result/QuestionResult'));
const QuestionnaireStatistics = lazy(() => import('@/components/Result/QuestionnaireStatistics'));

const Questionnaire = ({params: {questionnaireId}}: {params: {questionnaireId: string}}) => {
    const id = Number(questionnaireId);
    const {data, mutate} = useAllResults(id);
    const results = data?.questions || null;
    const {data: statistics} = useQuestionnaireStatistics(id);


    const removeAnswer = (questionId: number, answerId: number) => {
      const optimisticData = {
        ...data,
        questions: data?.questions.map((result) => result.question.id === questionId ? ({...result, data: result.data?.filter((answer) => answer.id !== answerId) || []}): result) || []
      };


      mutate(async(result) => {
        if(!result){
          return result;
        }

        const newResult = (await deleteAnswer(id, questionId, answerId)).data;
        return {...result, questions: result.questions.map((result) => result.question.id === questionId ? newResult : result)};
      }, {revalidate: false, optimisticData})
    }

    if(!results || !statistics){
      return null;
    }

    return (
      <div className="content">
        <h2 className="font-semibold text-2xl mb-5">Statistics</h2>
        <Suspense fallback={<Loading/>}>
          <QuestionnaireStatistics data={statistics}/>
        </Suspense>
        <h2 className="font-semibold text-2xl mb-5">Questions</h2>
        {results.map((result) => (
          <Suspense fallback={<Loading/>} key={result.question.id}>
            <QuestionResult key={result.question.id} result={result} removeAnswer={removeAnswer}/>
          </Suspense>
        ))}
      </div>
    )
}

export default Questionnaire;