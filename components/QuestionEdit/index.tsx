import {useState, useRef, MouseEventHandler} from "react";
import styles from './index.module.scss';
import TextArea from "@/components/base/TextArea";
import {FaEllipsisV, FaEye, FaEyeSlash,FaTrashAlt} from "react-icons/fa";
import Popper from "@/components/base/Popper";
import Switch from "@/components/base/Switch";


const QuestionEdit = ({}) => {
    const [title, setTitle] = useState<string>("Question title");
    const [description, setDescription] = useState<string>("");
    const [required, setRequired] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(true);

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const popperRef = useRef<HTMLButtonElement | null>(null);

    const openMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
        setMenuOpen(v => !v);
        e.stopPropagation();
    }



    return (
        <div className={styles.questionCard}>
            <div className={styles.topBar}>
                <input type="text" className="text question-title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <div className={styles.toolbar}>
                    <button className="icon"><FaTrashAlt size="1.5em"/></button>
                    <button className="icon" onClick={() => setVisible(v => !v)}>{visible ? <FaEye size="1.5em"/> : <FaEyeSlash size="1.5em"/>}</button>
                    <button ref={popperRef} className="icon" onClick={openMenu}><FaEllipsisV/></button>
                    <Popper anchor={popperRef.current} show={menuOpen} handleClose={() => setMenuOpen(false)}>
                        <div className="popper-container">
                            <h3>Something</h3>
                        </div>
                    </Popper>
                </div>
            </div>
            <div>
                <TextArea value={description} change={setDescription} type='text' placeholder="Add description (optional)"/>
            </div>
            <div className={styles.bottomBar}>
                <Switch value={required} update={setRequired} title="Required"/>
            </div>
        </div>
    )
}

export default QuestionEdit;