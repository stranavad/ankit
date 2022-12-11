import {useState} from "react";
import styles from "./index.module.scss";
import TextArea from "@/components/base/TextArea";
import {FiEye, FiEyeOff, FiTrash2} from "react-icons/fi";
import {HiOutlineDuplicate} from 'react-icons/hi';
import Switch from "@/components/base/Switch";
import QuestionOptions from "./Options";
import {Question, QuestionType} from "@/types/questionnaire";
import {updateQuestion} from "@/routes/question";
import QuestionTitle from "@/components/QuestionEdit/title";

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

    const update = (...data: QuestionUpdateProperty) => {
        switch (data[0]) {
        case QuestionProperty.TITLE:
            setTitle(data[1]);
            break;
        case QuestionProperty.DESCRIPTION:
            setDescription(data[1]);
            break;
        case QuestionProperty.REQUIRED:
            setRequired(data[1]);
            break;
        case QuestionProperty.VISIBLE:
            setVisible(data[1]);
            break;
        default:
            break;
        }
        updateQuestion(questionnaireId, question.id, {[data[0]]: data[1]}).then((response) => {
            const {title, description, visible, required} = response.data;
            setTitle(title);
            setDescription(description || "");
            setVisible(visible);
            setRequired(required);
            refetch();
        });
    };

    return (
        <div className={styles.questionCard}>
            <div className={styles.topBar}>
                <QuestionTitle title={title} update={(value) => update(QuestionProperty.TITLE, value)}/>
                <div className={styles.toolbar}>
                    <button className="icon"><FiTrash2 size="1.5em"/></button>
                    <button className="icon" onClick={() => update(QuestionProperty.VISIBLE, !visible)}>{visible ?
                        <FiEye size="1.5em"/> :
                        <FiEyeOff size="1.5em"/>}</button>
                    <button className="icon"><HiOutlineDuplicate size="1.5em"/></button>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.section}>
                    <TextArea value={description} change={(value) => update(QuestionProperty.DESCRIPTION, value)}
                              placeholder="Add description (optional)" title="Description"/>
                </div>
                <div className={styles.section}>
                    {(question.type === QuestionType.SELECT || question.type === QuestionType.MULTI_SELECT) && (
                        <div className={styles.contentSection}>
                            <span>Options</span>
                            <QuestionOptions
                                options={question.options || []}/>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.bottomBar}>
                {(question?.type === QuestionType.SELECT || question?.type === QuestionType.MULTI_SELECT) && (
                    <Switch value={required} update={setRequired} title="Multiple"/>
                )}
                <Switch value={required} update={(value) => update(QuestionProperty.REQUIRED, value)} title="Required"/>
            </div>
        </div>
    );
};

export default QuestionEdit;