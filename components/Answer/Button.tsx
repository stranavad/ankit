interface AnswerButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
}

const AnswerButton = ({text, onClick, className = ""}: AnswerButtonProps) => {
    return (
        <button
            className={`bg-blue-500 hover:bg-blue-800 transition-colors duration-100 text-slate-100 hover py-1 px-3 rounded-md font-medium ${className}`}
            onClick={onClick}>
            {text}
        </button>
    );
};

export default AnswerButton;