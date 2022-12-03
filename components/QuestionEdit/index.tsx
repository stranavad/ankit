import {MouseEventHandler, useRef, useState} from "react";
import styles from "./index.module.scss";
import TextArea from "@/components/base/TextArea";
import {FaEllipsisV, FaEye, FaEyeSlash, FaTrashAlt} from "react-icons/fa";
import Switch from "@/components/base/Switch";
import QuestionOptions from "./Options";
import MenuSelect, {MenuSelectItem} from "@/components/MenuSelect";
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

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const popperRef = useRef<HTMLButtonElement | null>(null);

    const openMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
        console.log(question);
        setMenuOpen(v => !v);
        e.stopPropagation();
    };

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

    const menuItems: MenuSelectItem[] = [
        {
            title: "Change type",
            action: () => console.log("Changing type")
        }
    ];


    return (
        <div className={styles.questionCard}>
            <div className={styles.topBar}>
                <QuestionTitle title={title} update={(value) => update(QuestionProperty.TITLE, value)}/>
                <div className={styles.toolbar}>
                    <button className="icon"><FaTrashAlt size="1.5em"/></button>
                    <button className="icon" onClick={() => update(QuestionProperty.VISIBLE, !visible)}>{visible ?
                        <FaEye size="1.5em"/> :
                        <FaEyeSlash size="1.5em"/>}</button>
                    <button ref={popperRef} className="icon" onClick={openMenu}><FaEllipsisV/></button>
                    <MenuSelect anchor={popperRef.current} show={menuOpen} handleClose={() => setMenuOpen(false)}
                                items={menuItems}/>
                </div>
            </div>
            <div className={styles.contentSection}>
                <TextArea value={description} change={(value) => update(QuestionProperty.DESCRIPTION, value)}
                          type="text"
                          placeholder="Add description (optional)"/>
            </div>
            {(question.type === QuestionType.SELECT || question.type === QuestionType.MULTI_SELECT) && (
                <div className={styles.contentSection}>
                    <span>Options</span>
                    <QuestionOptions
                        options={question.options || []}/>
                </div>
            )}
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