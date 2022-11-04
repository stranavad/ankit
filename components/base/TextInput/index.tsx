import {ChangeEvent} from "react";
import styles from "./index.module.scss";
import classNames from "classnames";

interface TextInputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

const TextInput = ({className, ...args}: TextInputProps) => {
    return <input className={classNames(styles.input, className)} {...args}/>;
};

export default TextInput;