import {ReactElement} from "react";

interface ButtonProps {
    onClick?: () => void;
    children: ReactElement | string;
    className?: string;
    disabled?: boolean;
    primary?: boolean;
    secondary?: boolean;
    type?: ButtonType;
}

type ButtonType = "default" | "success" | "error"

export const Button = ({
    children,
    onClick,
    className,
    type = "default",
    secondary = false,
    disabled = false
}: ButtonProps) => {
    let colorType;

    if (!secondary) {
        if (!disabled) {
            switch (type) {
            case "default":
                colorType = "bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-400";
                break;
            case "success":
                colorType = "bg-green-500 hover:bg-green-700 focus:ring-green-400";
                break;
            case "error":
                colorType = "bg-red-600 hover:bg-red-800 focus:ring-red-400";
            }
        } else {
            colorType = "bg-gray-300 text-gray-400 shadow-none cursor-not-allowed";
        }

        return (
            <button
                onClick={onClick}
                disabled={disabled}
                className={`text-white font-semibold rounded-md focus:outline-none focus:ring-2  focus:ring-opacity-75 ${colorType}  ${className}`}>
                {children}
            </button>
        );
    }

    return (
        <button
            onClick={onClick}
            className={`bg-white text-slate-800 font-semibold rounded-md border border-gray-200 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75 ${className}`}>
            {children}
        </button>
    );

};

export default Button;