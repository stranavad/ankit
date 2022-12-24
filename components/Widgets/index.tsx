import styles from "./index.module.scss";
import QuestionsOrder from "@/components/Widgets/QuestionsOrder";
import {useState} from "react";
import {RxDoubleArrowLeft} from "react-icons/rx";
import {IoMdClose} from "react-icons/io";

const Widgets = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <div className={styles.widgetsToggle}>
                <button className="icon" onClick={() => setOpen(true)}><RxDoubleArrowLeft size="1.5em"/></button>
            </div>
            <div className={`${styles.widgetsContainer} ${!open ? styles.hidden : ""}`}>
                <div className={styles.widgetsMenu}>
                    <button className="icon" onClick={() => setOpen(o => !o)}><IoMdClose size="1.7em"/>
                    </button>
                </div>
                <QuestionsOrder/>
            </div>
        </>
    );
};

export default Widgets;