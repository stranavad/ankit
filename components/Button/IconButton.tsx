import { JSXElementConstructor } from "react";

interface IconButtonProps {
    icon: JSXElementConstructor<any>;
    size?: "small" | "medium" | "large";
    color: "default" | "success" | "primary" | "error";
    className?: string;
    disabled?: boolean;
    onClick: () => void;
    invert?: boolean;
}

const IconButton = ({
    invert = false,
    icon: Icon,
    size = "small",
    color = "default",
    className = "",
    onClick,
    disabled = false
}: IconButtonProps) => {
    let iconSize = "h-4 w-4";
    let iconColor = "text-gray-500";
    let hoverColor = "hover:text-gray-500";

    switch (size) {
    case "medium":
        iconSize = "h-5 w-5";
        break;
    case "large":
        iconSize = "h-6 w-6";
        break;
    }

    switch (color) {
    case "success":
        iconColor = invert ? "text-gray-500" : "text-green-500";
        hoverColor = invert ? "hover:text-green-500" : "hover:text-gray-500";
        break;
    case "primary":
        iconColor = invert ? "text-gray-500" : "text-indigo-500";
        hoverColor = invert ? "hover:text-indigo-500" : "hover:text-gray-500";
        break;
    case "error":
        iconColor = invert ? "text-gray-500" : "text-red-500";
        hoverColor = invert ? "hover:text-red-500" : "hover:text-gray-500";
        break;
    }

    return (
        <button className={className} disabled={disabled} onClick={onClick}>
            <Icon
                className={`${iconSize} ${disabled ? "text-gray-600" : iconColor} ${disabled ? "cursor-not-allowed" : hoverColor} transition-colors duration-75`} />
        </button>
    );
};

export default IconButton;