import {Box, Modal} from "@mui/material";
import {ReactElement} from "react";
import styles from "./index.module.scss";

interface ModalProps {
    children: ReactElement;
    open: boolean;
    onClose: () => void;
}

const AModal = ({children, open, onClose}: ModalProps) => {
    return (
        <Modal open={open} onClose={onClose} className={styles.wrapper}>
            <div className={styles.content}>
                {children}
            </div>
        </Modal>
    );

};

export default AModal;