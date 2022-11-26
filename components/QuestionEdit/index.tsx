import {MouseEventHandler, useRef, useState} from "react";
import styles from "./index.module.scss";
import TextArea from "@/components/base/TextArea";
import {FaEllipsisV, FaEye, FaEyeSlash, FaTrashAlt} from "react-icons/fa";
import Switch from "@/components/base/Switch";
import QuestionOptions from "./Options";
import MenuSelect, {MenuSelectItem} from "@/components/MenuSelect";
import {Question, QuestionType} from "@/types/questionnaire";


const QuestionEdit = ({question}: { question: Question }) => {
    const [title, setTitle] = useState<string>(question?.title || "Hello");
    const [description, setDescription] = useState<string>(question?.description || "");
    const [required, setRequired] = useState<boolean>(question?.required || false);
    const [visible, setVisible] = useState<boolean>(question?.visible || false);

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const popperRef = useRef<HTMLButtonElement | null>(null);

    const openMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
        console.log(question);
        setMenuOpen(v => !v);
        e.stopPropagation();
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
                <input type="text" className="text question-title" value={title}
                       onChange={(e) => setTitle(e.target.value)}/>
                <div className={styles.toolbar}>
                    <button className="icon"><FaTrashAlt size="1.5em"/></button>
                    <button className="icon" onClick={() => setVisible(v => !v)}>{visible ? <FaEye size="1.5em"/> :
                        <FaEyeSlash size="1.5em"/>}</button>
                    <button ref={popperRef} className="icon" onClick={openMenu}><FaEllipsisV/></button>
                    <MenuSelect anchor={popperRef.current} show={menuOpen} handleClose={() => setMenuOpen(false)}
                                items={menuItems}/>
                </div>
            </div>
            <div className={styles.contentSection}>
                <TextArea value={description} change={setDescription} type="text"
                          placeholder="Add description (optional)"/>
            </div>
            {(question?.type === QuestionType.SELECT || question?.type === QuestionType.MULTI_SELECT || true) && (
                <div className={styles.contentSection}>
                    <span>Options</span>
                    <QuestionOptions
                        options={question?.options || [{id: 1, value: "something", position: 0}, {
                            id: 2,
                            value: "something else",
                            position: 2
                        }]}/>
                </div>
            )}
            <div className={styles.bottomBar}>
                {(question?.type === QuestionType.SELECT || question?.type === QuestionType.MULTI_SELECT) && (
                    <Switch value={required} update={setRequired} title="Multiple"/>
                )}
                <Switch value={required} update={setRequired} title="Required"/>
            </div>
        </div>
    );
};

export default QuestionEdit;