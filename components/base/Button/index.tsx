import {ReactElement, MouseEventHandler} from "react";
import styles from "./index.module.scss";
import classNames from "classnames";

interface ButtonProps {
    children: ReactElement | string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    textColor?: string;
    variant: "filled" | "outlined" | "text";
}

const Button = ({children, variant, disabled, textColor, ...args}: ButtonProps) => {
    return <button className={classNames(styles.button, styles[variant])}
                   disabled={disabled} style={{color: textColor}} {...args}>{children}</button>;
};

export default Button;