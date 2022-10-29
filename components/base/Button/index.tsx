import {ReactElement, ChangeEvent, MouseEventHandler} from "react";
import styles from "./index.module.scss";

interface ButtonProps {
    children: ReactElement | string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    variant: "filled" | "outlined" | "text";
}

const Button = ({children, variant, ...args}: ButtonProps) => {
    return <button className={styles[variant]} {...args}>{children}</button>;
};

export default Button;