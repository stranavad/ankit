import { Answer, AnswerEvent, AnswerQuestion } from "@/types/answer";
import { QuestionType } from "@/types/questionnaire";
import { ChangeEvent } from "react";
import Options from "./Options";
import useDesign from "@/util/design";

interface AnswerQuestionProps {
    bundle: { question: AnswerQuestion, answer: Answer };
    setAnswer: (e: AnswerEvent) => void;
}

const Question = ({ setAnswer, bundle }: AnswerQuestionProps) => {
    const answerText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer({ value: e.target.value });
    };

    const question = bundle.question;
    const answer = bundle.answer;

    const textColor = useDesign("textColor");
    const borderColor = useDesign("optionColor");


    return (
        <div className="w-full mb-10">
            <h1 className="inline font-semibold text-lg" style={{ color: textColor }}>
                {question.title}
                {question.required && (
                    <span className="text-red-500">
                        *
                    </span>
                )}
            </h1>
            <p className="mt-2 text-slate-800 dark:text-slate-200 text-sm leading-6"
               style={{ color: textColor, opacity: 0.9 }}>
                {question.description}
            </p>
            {
                question.type === QuestionType.TEXT ? (
                    <textarea value={bundle.answer.value} onChange={answerText} placeholder="Your answer"
                              className="max-h-32 min-h-[50px] text-sm bg-transparent border-2 w-full outline-none p-1 rounded-md"
                              style={{ color: textColor, borderColor }} />
                ) : (
                    <Options setAnswer={setAnswer} type={question.type} options={question.options} answer={answer} />
                )
            }
        </div>
    );
};

export default Question;