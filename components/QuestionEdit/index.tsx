import {useState} from "react";
import styles from "./index.module.scss";
import TextArea from "@/components/base/TextArea";
import {FiEye, FiEyeOff, FiTrash2} from "react-icons/fi";
import {HiOutlineDuplicate} from "react-icons/hi";
import QuestionOptions from "./Options";
import {Question, QuestionType} from "@/types/questionnaire";
import {updateQuestion} from "@/routes/question";
import QuestionTitle from "@/components/QuestionEdit/title";
import classNames from "classnames";

interface QuestionEditProps {
    question: Question;
    questionnaireId: number;
    refetch: () => void;
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

const QuestionEdit = ({question, questionnaireId, refetch}: QuestionEditProps) => {
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
        <div className={classNames(styles.questionCard, {[styles.hidden]: !visible})}>
            <div className={classNames(styles.topBar, styles[question.type])}>
                <QuestionTitle title={title} update={updateTitle}/>
                <div className={styles.toolbar}>
                    <button className="icon"><FiTrash2 size="1.5em"/></button>
                    <button className="icon" onClick={() => updateVisible(!visible)}>{visible ?
                        <FiEye size="1.5em"/> :
                        <FiEyeOff size="1.5em"/>}</button>
                    <button className="icon"><HiOutlineDuplicate size="1.5em"/></button>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.section}>
                    <TextArea value={description} change={updateDescription}
                              placeholder="Add description (optional)" title="Description"/>
                </div>
                <div className={styles.section}>
                    {(question.type === QuestionType.SELECT || question.type === QuestionType.MULTI_SELECT) && (
                        <>
                            <span className="subtitle">Options</span>
                            <QuestionOptions
                                options={question.options || []} questionnaireId={questionnaireId}
                                questionId={question.id}/>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.bottomBar}>
                {/*{(question?.type === QuestionType.SELECT || question?.type === QuestionType.MULTI_SELECT) && (*/}
                {/*    <Switch value={required} update={setRequired} title="Multiple"/>*/}
                {/*)}*/}
                <label className="checkbox">
                    <input type="checkbox" checked={required}
                           onChange={(e) => updateRequired(e.target.checked)}/>
                    <span>Required</span>
                </label>
            </div>
        </div>
    );
};

export default QuestionEdit;