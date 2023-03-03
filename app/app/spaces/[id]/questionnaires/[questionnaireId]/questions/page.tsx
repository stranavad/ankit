"use client";
import {Question, QuestionType} from "@/types/questionnaire";
import {createQuestion, deleteQuestion, duplicateQuestion, updateQuestion, UpdateQuestionData, useQuestions} from "@/routes/question";

const Widgets = lazy(() => import("@/components/Widgets"));
const QuestionEdit = lazy(() => import("@/components/QuestionEdit"));
const AddQuestion = lazy(() => import("@/components/AddQuestion"));
const PublishQuestionnaire = lazy(() => import("@/components/PublishQuestionnaire"));

import {MemberContext, QuestionnaireContext, QuestionsWidgetContext} from "@/util/context";
import {lazy, Suspense, useContext} from "react";
import {QuestionUpdateProperty} from "@/types/question";
import {checkSpacePermission, Permission} from "@/util/permission";
import PageHeader from "@/components/Utils/PageHeader";
import ShareButton from "@/components/Sharing/ShareButton";
import Content from "@/components/Utils/Content";
import { LoadingSkeleton } from "@/components/Skeleton";
import { skeletonQuestions } from "@/components/Skeleton/data";

const QuestionnaireQuestions = ({params: {questionnaireId: id}}: { params: { questionnaireId: string } }) => {
    const questionnaireId = parseInt(id);
    const {data, mutate} = useQuestions(questionnaireId);
    const {member} = useContext(MemberContext);
    const {questionnaire} = useContext(QuestionnaireContext);
    const questions = data || [];

    // Extract this logic
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
        mutate(async (questions) => {
            await deleteQuestion(questionnaireId, questionId);
            return questions?.filter(({id}) => id !== questionId);
        });
    };

    const update = (index: number, id: number, data: UpdateQuestionData) => {
        mutate(async (questions) => {
            const updatedQuestion = (await updateQuestion(questionnaireId, id, {...data})).data;

            if (!questions) {
                return questions;
            }
            return questions.map((question, questionIndex) => questionIndex === index ? updatedQuestion : question);
        }, {
            revalidate: false,
            optimisticData: questions.map((question, questionIndex) => questionIndex === index ? ({
                ...question,
                ...data
            }) : question)
        });
    };

    const setQuestion = (index: number, question: Question) => {
        const newQuestions = questions;
        newQuestions[index] = question;
        mutate(() => newQuestions, {revalidate: false, optimisticData: newQuestions})
    }

    const addQuestionDisabled = !checkSpacePermission(Permission.ADD_QUESTION, member.role);

    return (
        <>
            <Content>
                <PageHeader title="Questions">
                    <div className="flex gap-3">
                        <ShareButton questionnaire={questionnaire}/>
                        {checkSpacePermission(Permission.PUBLISH_QUESTIONNAIRE, member.role) && questionnaire.manualPublish && (
                            <div>
                                <Suspense>
                                    <PublishQuestionnaire questionnaireId={questionnaireId}/>
                                </Suspense>
                            </div>
                        )}
                    </div>
                </PageHeader>
                <div className="mt-5">
                    {questions.map((question, index) => (
                        <div key={question.id}>
                            <Suspense fallback={<LoadingSkeleton lines={skeletonQuestions}/>}>
                                <QuestionEdit question={question}
                                              cloneQuestion={cloneQuestion} deleteQuestion={removeQuestion}
                                              update={(...data) => update(index, ...data)} setQuestion={(newQuestion) => setQuestion(index, newQuestion)}/>
                                <AddQuestion add={(type) => addQuestion(type, index)} disabled={addQuestionDisabled}/>
                            </Suspense>
                        </div>
                    ))}
                </div>
            </Content>
            <QuestionsWidgetContext.Provider value={{questions, setQuestions}}>
                <Suspense>
                    <Widgets/>
                </Suspense>
            </QuestionsWidgetContext.Provider>
        </>
    );
};

export default QuestionnaireQuestions;