import {lazy, Suspense, useContext, useState} from "react";
import {DocumentDuplicateIcon, EyeIcon, TrashIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import {Question} from "@/types/questionnaire";
import {updateQuestion} from "@/routes/question";
import {QuestionnaireContext} from "@/util/questionnaireContext";
import EntityName from "@/components/Inputs/EntityName";
import EntityDescription from "@/components/Inputs/EntityDescription";
import Checkbox from "@/components/base/Checkbox";

const QuestionOptions = lazy(() => import("./Options"));

interface QuestionEditProps {
    question: Question;
    refetch: () => void;
    cloneQuestion: (questionId: number) => void;
}

enum QuestionProperty {
    TITLE = "title",
    DESCRIPTION = "description",
    VISIBLE = "visible",
    REQUIRED = "required",
}

type QuestionUpdateProperty =
    | [QuestionProperty.TITLE, string]
    | [QuestionProperty.DESCRIPTION, string]
    | [QuestionProperty.REQUIRED, boolean]
    | [QuestionProperty.VISIBLE, boolean]

const QuestionEdit = ({question, refetch, cloneQuestion}: QuestionEditProps) => {
    const {questionnaire: {id: questionnaireId}} = useContext(QuestionnaireContext);

    const [title, setTitle] = useState<string>(question.title);
    const [description, setDescription] = useState<string>(question.description || "");
    const [required, setRequired] = useState<boolean>(question.required);
    const [visible, setVisible] = useState<boolean>(question.visible);

    const update = (data: QuestionUpdateProperty) => {
        updateQuestion(questionnaireId, question.id, {[data[0]]: data[1]}).then((response) => {
            const {title, description, visible, required} = response.data;
            setTitle(title);
            setDescription(description || "");
            setVisible(visible);
            setRequired(required);
            refetch();
        });
    };

    const updateTitle = (value: string) => {
        setTitle(value);
        update([QuestionProperty.TITLE, value]);
    };

    const updateVisible = (value: boolean) => {
        setVisible(value);
        update([QuestionProperty.VISIBLE, value]);
    };

    const updateDescription = (value: string) => {
        setDescription(value);
        update([QuestionProperty.DESCRIPTION, value]);
    };

    const updateRequired = (value: boolean) => {
        setRequired(value);
        update([QuestionProperty.REQUIRED, value]);
    };

    return (
        <div
            className={`shadow-md rounded-md py-2 px-5 transition-colors duration-100 ${visible ? `bg-white` : "bg-gray-100"}`}>
            <div className="flex items-center">
                <EntityName value={title} update={updateTitle}/>
                <div className="flex pl-5">
                    <button className="mr-0.5">
                        <TrashIcon className="w-6 h-6 text-gray-500 hover:text-red-600 transition-colors duration-75"/>
                    </button>
                    <button className="mx-0.5" onClick={() => cloneQuestion(question.id)}>
                        <DocumentDuplicateIcon
                            className="w-6 h-6 text-gray-500 hover:text-indigo-500 transition-colors duration-75"/>
                    </button>
                    <button className="ml-0.5" onClick={() => updateVisible(!visible)}>
                        {visible ? (
                            <EyeIcon
                                className="w-6 h-6 text-gray-500 hover:text-indigo-500 transition-colors duration-75"/>
                        ) : (
                            <EyeSlashIcon
                                className="w-6 h-6 text-gray-500 hover:text-indigo-500 transition-colors duration-75"/>
                        )}
                    </button>
                </div>
            </div>
            <EntityDescription value={description} update={updateDescription}/>
            <Suspense>
                <QuestionOptions type={question.type} options={question.options} questionId={question.id}
                                 questionnaireId={questionnaireId}/>
            </Suspense>
            <div className="mt-5 h-px bg-gray-200 w-full"/>
            <div className="flex justify-end w-full my-2">
                <div>
                    <label htmlFor={`required-${question.id}`} className="mr-2">Required</label>
                    <Checkbox name={`required-${question.id}`} checked={required} update={updateRequired}/>
                </div>
            </div>
        </div>
    );
};

export default QuestionEdit;