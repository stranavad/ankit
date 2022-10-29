import {ChangeEvent, RefObject, useRef} from "react";
import styles from "./index.module.scss";

interface TextInputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const TextInput = ({...args}: TextInputProps) => {
    return <input className={styles.input} {...args}/>;
};

export default TextInput;