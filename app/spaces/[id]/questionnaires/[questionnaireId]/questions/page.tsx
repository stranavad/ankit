"use client";
import {QuestionType} from "@/types/questionnaire";
import {createQuestion, duplicateQuestion, useQuestions} from "@/routes/question";
import debounce from "lodash/debounce";
import QuestionsList from "@/components/QuestionsList";
import Widgets from "@/components/Widgets";

const QuestionnaireQuestions = ({params: {questionnaireId: id}}: { params: { questionnaireId: string } }) => {
    const questionnaireId = parseInt(id);
    const {data, mutate} = useQuestions(questionnaireId);
    const questions = data || [];

    const refetchQuestions = debounce(mutate, 5000);

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

    return (
        <>
            <div className="content">
                <QuestionsList questions={questions} addQuestion={addQuestion}
                               cloneQuestion={cloneQuestion} refetchQuestions={refetchQuestions}/>
            </div>
            <Widgets/>
        </>
    );
};

export default QuestionnaireQuestions;