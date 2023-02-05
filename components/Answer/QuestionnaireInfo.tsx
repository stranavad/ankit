import {AnswerQuestionnaire} from "@/types/answer";
import AnswerButton from "@/components/Answer/Button";

interface QuestionniareInfoProps {
    questionnaire: AnswerQuestionnaire;
    start: () => void;
}

const QuestionnaireInfo = ({questionnaire, start}: QuestionniareInfoProps) => {
    return (
        <div className="max-w-xl text-center">
            <h1 className="text-slate-900 dark:text-slate-100 font-semibold text-2xl">
                {questionnaire.name}
            </h1>
            <p className="mt-2 text-slate-800 dark:text-slate-200 text-sm leading-6">
                {questionnaire.description}
            </p>
            <AnswerButton text="Start" onClick={start} className="mt-10"/>
        </div>
    );
};

export default QuestionnaireInfo;