// import {Box from "@mui/material";
import {ReactElement} from "react";
import styles from "./index.module.scss";

interface ModalProps {
    children: ReactElement;
    open: boolean;
    onClose: () => void;
}

const Modal = ({children, open, onClose}: ModalProps) => {
    if (open) {
        return (
            <div className={styles.outerContainer} onClick={() => onClose()}>
                <div className={styles.innerContainer} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        );
    }
    return <></>;

};

export default Modal;