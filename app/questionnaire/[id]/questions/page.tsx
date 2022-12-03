"use client";

import {QuestionType} from "@/types/questionnaire";
import QuestionEdit from "@/components/QuestionEdit";
import AddQuestion from "@/components/AddQuestion";
import {createQuestion, useQuestions} from "@/routes/question";
import debounce from "lodash/debounce";

const QuestionnaireQuestions = ({params: {id}}: { params: { id: string } }) => {
    const questionnaireId = parseInt(id);
    const {data, mutate} = useQuestions(questionnaireId);
    const questions = data || [];

    const refetchQuestions = debounce(mutate, 1000);

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

    return (
        <div className="content">
            {questions.map((question, index) => (
                <div key={question.id} style={{width: "100%", maxWidth: "800px"}}>
                    <QuestionEdit question={question} questionnaireId={questionnaireId} refetch={refetchQuestions}/>
                    <AddQuestion add={(type) => addQuestion(type, index)}/>
                </div>
            ))}
        </div>
    );
};

export default QuestionnaireQuestions;