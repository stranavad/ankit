import {AnswerQuestionnaire} from "@/types/answer";
import AnswerButton from "@/components/Answer/Button";
import useDesign from "@/util/design";

interface QuestionnaireInfoProps {
    questionnaire: AnswerQuestionnaire;
    start: () => void;
}

const QuestionnaireInfo = ({questionnaire, start}: QuestionnaireInfoProps) => {

    const textColor = useDesign('textColor');
    return (
        <div className="max-w-xl text-center">
            <h1 style={{color: textColor}} className="font-semibold text-2xl">
                {questionnaire.name}
            </h1>
            <p  style={{color: textColor, opacity: 0.9}} className="mt-2 text-slate-800 dark:text-slate-200 text-sm leading-6">
                {questionnaire.description}
            </p>
            <AnswerButton text="Start" onClick={start} className="mt-10"/>
        </div>
    );
};

export default QuestionnaireInfo;