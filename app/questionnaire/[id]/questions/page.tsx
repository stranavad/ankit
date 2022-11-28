"use client";

import {useEffect, useState} from "react";
import {Question, QuestionType} from "@/types/questionnaire";
import QuestionEdit from "@/components/QuestionEdit";
import AddQuestion from "@/components/AddQuestion";
import {createQuestion, getQuestions} from "@/api/question";

const QuestionnaireQuestions = ({params: {id}}: { params: { id: string } }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const questionnaireId = parseInt(id);

    useEffect(() => {
        getQuestions(questionnaireId).then((response) => {
            setQuestions(response.data);
        });
    }, [questionnaireId]);

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
        createQuestion(questionnaireId, data).then((response) => {
            setQuestions(response.data);
        });
    };

    return (
        <>
            {questions.map((question, index) => (
                <div key={question.id} style={{width: "500px"}}>
                    <QuestionEdit question={question} questionnaireId={questionnaireId}/>
                    <AddQuestion add={(type) => addQuestion(type, index)}/>
                </div>
            ))}
        </>
    );
};

export default QuestionnaireQuestions;