import {Answer, AnswerEvent, AnswerQuestion} from "@/types/answer";
import {QuestionType} from "@/types/questionnaire";
import {ChangeEvent} from "react";
import Options from "./Options";

interface AnswerQuestionProps {
    bundle: { question: AnswerQuestion, answer: Answer };
    setAnswer: (e: AnswerEvent) => void;
}

const Question = ({setAnswer, bundle}: AnswerQuestionProps) => {
    const answerText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer({value: e.target.value});
    };
    const question = bundle.question;
    const answer = bundle.answer;


    return (
        <div className="w-full mb-10">
            <h1 className="inline text-slate-900 dark:text-slate-100 font-semibold text-lg">
                {question.title}
                {question.required && (
                    <span className="text-red-500">
                        *
                    </span>
                )}
            </h1>
            <p className="mt-2 text-slate-800 dark:text-slate-200 text-sm leading-6">
                {question.description}
            </p>
            <div className="h-0.5 w-full bg-slate-500 mt-2 mb-4"/>
            {
                question.type === QuestionType.TEXT ? (
                    <textarea value={bundle.answer.value} onChange={answerText} placeholder="Your answer"
                              className="max-h-32 min-h-[50px] text-sm bg-transparent border-2 w-full outline-none p-1 text-slate-800 dark:text-slate-200 rounded-md border-slate-200 dark:border-slate-800"/>
                ) : (
                    <Options setAnswer={setAnswer} type={question.type} options={question.options} answer={answer}/>
                )
            }
        </div>
    );
};

export default Question;