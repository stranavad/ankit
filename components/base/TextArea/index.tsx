"use client";
import styles from "./index.module.scss";
import {useEffect, useState} from "react";
import useDebounce from "@/util/debounce";

interface DescriptionProps {
    value: string;
    title?: string;
    placeholder?: string;
    change: (value: string) => void;
    debounced?: boolean;
}

const TextArea = ({placeholder, change, debounced = true, title, value}: DescriptionProps) => {
    const [content, setContent] = useState<string>(value);
    const debouncedValue = useDebounce(content, debounced ? 1000 : 0);

    useEffect(() => change(content), [debouncedValue]);

    return (
        <div className={styles.textareaWrapper}>
            {title && <span>{title}</span>}
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder={placeholder}/>
        </div>
    );

};

export default TextArea;