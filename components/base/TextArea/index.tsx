"use client";
import styles from "./index.module.scss";
import {useState} from "react";
import {FaPencilAlt} from "react-icons/fa";
import classnames from "classnames";

interface DescriptionProps {
    value: string;
    title: string;
    placeholder?: string;
    change: (value: string) => void;
}

const TextArea = ({placeholder, change, title, value}: DescriptionProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [content, setContent] = useState<string>(value);

    const save = () => {
        setOpen(false);
        change(content);
    };

    return (
        <div className={styles.descriptionWrapper}>
            <div className={styles.title}>
                <span className="subtitle">{title}</span>
                <button className="icon" onClick={() => setOpen(!open)}><FaPencilAlt size="0.8em"/></button>
            </div>
            {!open ? (
                <span
                    className={classnames(styles.description, {[styles.smallDescription]: !content})}>{content || "Add description (optional)"}</span>
            ) : (
                <>
                <textarea value={content} onChange={e => setContent(e.target.value)} placeholder={placeholder}
                          className={"description"}/>
                    <div className={styles.actionButtons}>
                        <button className="outline small" onClick={() => setOpen(false)}>Cancel</button>
                        <button className="filled small" onClick={save}>Save</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TextArea;