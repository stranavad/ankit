import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Answer, AnswerEvent, AnswerOption } from "@/types/answer";
import { QuestionType } from "@/types/questionnaire";
import useDesign from "@/util/design";

interface OptionsProps {
    options: AnswerOption[];
    answer: Answer;
    type: QuestionType.MULTI_SELECT | QuestionType.SELECT;
    setAnswer: (e: AnswerEvent) => void;
}

const Options = ({ options, answer, type, setAnswer }: OptionsProps) => {
    const setOption = (id: number) => {
        let optionsToAnswer = answer.options;

        if (type === QuestionType.MULTI_SELECT) {
            if (answer.options.includes(id)) {
                optionsToAnswer.splice(optionsToAnswer.indexOf(id), 1);
            } else {
                optionsToAnswer = [...answer.options, id];
            }
        } else {
            optionsToAnswer = [id];
        }

        setAnswer({ options: optionsToAnswer });
    };

    const optionSelectedColor = useDesign("optionSelectedColor");
    const optionSelectedText = useDesign("optionSelectedText");
    const optionColor = useDesign("optionColor");
    const optionText = useDesign("optionText");

    return (
        <div className="w-full">
            <div className="w-full">
                {options.map((option) => (
                    <div key={option.optionId} onClick={() => setOption(option.optionId)}
                         style={{
                             backgroundColor: answer.options.includes(option.optionId) ? optionSelectedColor : optionColor,
                             color: answer.options.includes(option.optionId) ? optionSelectedText : optionText

                         }}
                         className={`cursor-pointer px-4 py-3 rounded-md my-3 flex justify-between transition-colors duration-100`}>
                        {option.value}
                        <div className="h-4 w-4 px-5">
                            {answer.options.includes(option.optionId) && (
                                <CheckCircleIcon className="h-7 w-7" color={optionSelectedText} />
                            )}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Options;
