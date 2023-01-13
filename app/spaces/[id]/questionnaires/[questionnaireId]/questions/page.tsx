"use client";
import {Question, QuestionType} from "@/types/questionnaire";
import {createQuestion, deleteQuestion, duplicateQuestion, updateQuestion, useQuestions} from "@/routes/question";

const Widgets = lazy(() => import("@/components/Widgets"));
const QuestionEdit = lazy(() => import("@/components/QuestionEdit"))
const AddQuestion = lazy(() => import("@/components/AddQuestion"))
const RenderIfVisible = lazy(() => import("react-render-if-visible"))

import {QuestionsWidgetContext} from "@/util/context";
import Button from "@/components/Button";
import {useState, lazy, Suspense, Fragment} from "react";
import { publishQuestionnaire } from "@/routes/publish";
import { QuestionUpdateProperty } from "@/types/question";
import PublishQuestionnaire from "@/components/PublishQuestionnaire";

const QuestionnaireQuestions = ({params: {questionnaireId: id}}: { params: { questionnaireId: string } }) => {
    const questionnaireId = parseInt(id);
    const {data, mutate} = useQuestions(questionnaireId);
    const questions = data || [];

    const addQuestion = (type: QuestionType, index: number) => {
        // Generating nextId and previousId
        let nextId: number | null = null;
        let previousId: number | null = null;
        if (index === 0) {
            previousId = questions[0].id;
            if (questions.length > 1) {
                nextId = questions[1].id;
            }
        } else if (index < questions.length - 1) {
            previousId = questions[index].id;
            nextId = questions[index + 1].id;
        } else if (index === questions.length - 1) {
            previousId = questions[index].id;
        }
        const data = {
            type,
            nextId,
            previousId,
        };
        mutate(async () => {
            const response = await createQuestion(questionnaireId, data);
            return response.data;
        }, {revalidate: false});
    };

    const cloneQuestion = (questionId: number) => {
        mutate(async () => {
            const response = await duplicateQuestion(questionnaireId, questionId);
            return response.data;
        }, {revalidate: false});
    };

    const setQuestions = (questions: Question[]) => {
        mutate(() => questions, {revalidate: false});
    };

    const removeQuestion = (questionId: number) => {
        mutate(async(questions) => {
            await deleteQuestion(questionnaireId,questionId);
            return questions?.filter(({id}) => id !== questionId);
        })
    }

    const update = (index: number, id:number, data: QuestionUpdateProperty) => {
        mutate(async(questions) => {
            const updatedQuestion = (await updateQuestion(questionnaireId, id, {[data[0]]: data[1]})).data;

            if(!questions){
                return questions;
            }
            return questions.map((question, questionIndex) => questionIndex === index ? updatedQuestion : question);
        }, {revalidate: false, optimisticData: questions.map((question, questionIndex) => questionIndex === index ? ({...question, [data[0]]: data[1]}) : question)});
    }

    return (
        <>
            <div className="content">
                <div className="mb-10 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold mr-5">Questions</h2>
                    <div>
                        <PublishQuestionnaire questionnaireId={questionnaireId}/>
                    </div>
                </div>
                {questions.map((question, index) => (
                    <Fragment key={question.id}>
                        {index < 5 ? (
                            <div style={{width: "100%", maxWidth: "800px"}}>
                                <QuestionEdit question={question}
                                            cloneQuestion={cloneQuestion} deleteQuestion={removeQuestion} update={(...data) => update(index, ...data)}/>
                                <AddQuestion add={(type) => addQuestion(type, index)}/>
                            </div>
                        ) : (
                            <RenderIfVisible key={question.id}>
                                <div style={{width: "100%", maxWidth: "800px"}}>
                                    <QuestionEdit question={question}
                                                cloneQuestion={cloneQuestion} deleteQuestion={removeQuestion} update={(...data) => update(index, ...data)}/>
                                    <AddQuestion add={(type) => addQuestion(type, index)}/>
                                </div>
                            </RenderIfVisible>
                        )}
                    </Fragment>
                ))}
            </div>
            <QuestionsWidgetContext.Provider value={{questions, setQuestions}}>
                <Suspense>
                    <Widgets/>
                </Suspense>
            </QuestionsWidgetContext.Provider>
        </>
    );
};

export default QuestionnaireQuestions;