"use client";
import {lazy, Suspense, useContext} from "react";
import {DocumentDuplicateIcon, EyeIcon, TrashIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import {Question} from "@/types/questionnaire";
import {QuestionnaireContext} from "@/util/questionnaireContext";
import EntityName from "@/components/Inputs/EntityName";
import EntityDescription from "@/components/Inputs/EntityDescription";
import Checkbox from "@/components/base/Checkbox";
import { checkSpacePermission, Permission } from "@/util/permission";
import { MemberContext } from "@/util/memberContext";
import { QuestionProperty, QuestionUpdateProperty } from "@/types/question";
import IconButton from "../Button/IconButton";
import dayjs from "dayjs";

const QuestionOptions = lazy(() => import("./Options"));

interface QuestionEditProps {
    question: Question;
    cloneQuestion: (questionId: number) => void;
    deleteQuestion: (id: number) => void;
    update: (id: number, data: QuestionUpdateProperty) => void;
}


const QuestionEdit = ({question, cloneQuestion, deleteQuestion, update}: QuestionEditProps) => {
    const {questionnaire: {id: questionnaireId}} = useContext(QuestionnaireContext);
    const {member} = useContext(MemberContext);

    const title = question.title;
    const description = question.description || "";
    const required = question.required;
    const visible = question.visible;

    const updateTitle = (value: string) => update(question.id, [QuestionProperty.TITLE, value])
    const updateVisible = (value: boolean) => update(question.id, [QuestionProperty.VISIBLE, value]);
    const updateDescription = (value: string) => update(question.id, [QuestionProperty.DESCRIPTION, value]);
    const updateRequired = (value: boolean) => update(question.id, [QuestionProperty.REQUIRED, value]);
    const deleteButtonDisabled = !checkSpacePermission(Permission.DELETE_QUESTION, member.role);

    return (
        <div
            className={`rounded-md py-2 px-5 transition-colors duration-100 ${visible ? `bg-white` : "bg-gray-100"}`}>
            <div className="flex items-center">
                <EntityName value={title} update={updateTitle}/>
                <div className="flex pl-5">
                    <IconButton className="mr-1" icon={TrashIcon} disabled={deleteButtonDisabled} color="error" size="large" invert onClick={() => deleteQuestion(question.id)}/>
                    <IconButton className="mr-1" icon={DocumentDuplicateIcon} disabled={deleteButtonDisabled} color="primary" size="large" invert onClick={() => cloneQuestion(question.id)}/>
                    <IconButton className="mr-1" icon={visible ? EyeIcon : EyeSlashIcon} disabled={deleteButtonDisabled} color="primary" size="large" invert onClick={() => updateVisible(!visible)}/>
                </div>
            </div>
            <EntityDescription value={description} update={updateDescription}/>
            <Suspense>
                <QuestionOptions type={question.type} options={question.options} questionId={question.id}
                                 questionnaireId={questionnaireId}/>
            </Suspense>
            <div className="mt-5 h-px bg-gray-200 w-full"/>
            <div className="flex justify-between items-center w-full my-2">
                <span className="text-xs">Last edited: {dayjs(question.updated).format('DD/MM/YYYY H:mm')}</span>    
                <div>
                    <label htmlFor={`required-${question.id}`} className="mr-2">Required</label>
                    <Checkbox name={`required-${question.id}`} checked={required} update={updateRequired}/>
                </div>
            </div>
        </div>
    );
};

export default QuestionEdit;