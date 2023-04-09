import useDesign from "@/util/design";

interface AnswerButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

const AnswerButton = ({ text, onClick, className = "", disabled = false }: AnswerButtonProps) => {
    const buttonColor = useDesign("buttonColor");
    const buttonText = useDesign("buttonText");

    return (
        <button
            className={`${disabled ? "cursor-not-allowed" : "bg-blue-500"} transition-colors duration-100 hover py-1 px-3 rounded-md font-medium ${className}`}
            style={{
                color: disabled ? buttonColor : buttonText,
                backgroundColor: disabled ? "transparent" : buttonColor
            }}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default AnswerButton;