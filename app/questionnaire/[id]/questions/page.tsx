"use client";

import {useEffect, useState} from "react";
import {Question, QuestionType} from "@/types/questionnaire";
import {createQuestion, getQuestions} from "@/api/questionnaire";
import QuestionEdit from "@/components/QuestionEdit";
import AddQuestion from "@/components/AddQuestion";

const QuestionnaireQuestions = ({params: {id}}: { params: { id: string } }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const questionnaireId = parseInt(id);

    useEffect(() => {
        getQuestions(questionnaireId).then((response) => {
            setQuestions(response.data);
        });
    }, [questionnaireId]);

    const addQuestion = (type: QuestionType) => {
        createQuestion(questionnaireId, type).then((response) => {
            setQuestions(questions => ([...questions, response.data]));
        });
    };

    return (
        <>
            {questions.map((question) => (
                <div key={question.id} style={{width: "500px"}}>
                    <QuestionEdit question={question}/>
                    <AddQuestion add={addQuestion}/>
                </div>
            ))}
        </>
    );
};

export default QuestionnaireQuestions;