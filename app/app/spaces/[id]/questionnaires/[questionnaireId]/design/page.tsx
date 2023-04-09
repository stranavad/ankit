"use client";
import Content from "@/components/Utils/Content";
import { defaultDesign, Design } from "@/types/design";
import AnswerQuestion from "@/components/Answer/Question";
import { usePreviewQuestions } from "@/routes/answerPreview";
import QuestionnaireInfo from "@/components/Answer/QuestionnaireInfo";
import { DesignContext } from "@/util/context/design";
import ColorPicker from "@/components/Pickers/ColorPicker";
import { updateQuestionnaireDesign, useQuestionnaireDesign } from "@/routes/design";
import "./index.css";
import useDesign from "@/util/design";

const colorPickers: { type: keyof Design, label: string }[] = [
    {
        type: "backgroundColor",
        label: "Background color"
    },
    {
        type: "optionSelectedColor",
        label: "Option selected color"
    },
    {
        type: "optionSelectedText",
        label: "Option selected text"
    },
    {
        type: "optionColor",
        label: "Option color"
    },
    {
        type: "optionText",
        label: "Option text"
    },
    {
        type: "buttonColor",
        label: "Button color"
    },
    {
        type: "buttonText",
        label: "Button text"
    },
    {
        type: "textColor",
        label: "Text color"
    }
];

let updateTimeout: NodeJS.Timeout;

const QuestionnaireDesign = ({ params: { questionnaireId: id } }: { params: { questionnaireId: string } }) => {
    const questionnaireId = parseInt(id);
    const { data } = usePreviewQuestions(questionnaireId);

    const { data: design, mutate } = useQuestionnaireDesign(questionnaireId);

    function updateDesign(key: keyof Design, value: string) {
        mutate(async (design) => {
            if (!design) {
                return design;
            }

            let newDesign = { ...design, [key]: value };

            clearTimeout(updateTimeout);
            updateTimeout = setTimeout(async () => {
                newDesign = (await updateQuestionnaireDesign(questionnaireId, newDesign)).data;
            }, 1500);

            return newDesign;
        }, {
            revalidate: false, optimisticData: design ? { ...design, [key]: value } : undefined
        });
    }


    if (!data || !design) {
        return;
    }

    return (
        <DesignContext.Provider value={design}>
            <Content twoColumn={true} header="Design">
                <div className="max-w-4xl w-full mr-5">
                    <div className="bg-black rounded-md w-100 flex flex-col p-10 items-center"
                         style={{ backgroundColor: design.backgroundColor ?? (defaultDesign.backgroundColor ?? undefined) }}>
                        <QuestionnaireInfo questionnaire={data} start={() => undefined} />
                        {data?.questions?.map((question) => (
                            <AnswerQuestion key={question.id} bundle={{
                                question,
                                answer: {
                                    value: "This will be the answer",
                                    options: question.options.length ? [question.options[0].optionId] : [],
                                    answered: false
                                }
                            }} setAnswer={() => undefined} />
                        ))}
                    </div>
                </div>
                <div>
                    <div className="rounded-md bg-white p-5 flex flex-col gap-3 sticky top-10">
                        {colorPickers.map((picker, index) => (
                            <ColorPicker key={index} color={useDesign(picker.type, design)}
                                         setColor={(color) => updateDesign(picker.type, color)}
                                         label={picker.label} />
                        ))}
                    </div>
                </div>
            </Content>
        </DesignContext.Provider>
    );
};

export default QuestionnaireDesign;