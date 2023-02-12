interface AnswerButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

const AnswerButton = ({text, onClick, className = "", disabled=false}: AnswerButtonProps) => {
    return (
        <button
            className={`${disabled ? 'cursor-not-allowed text-slate-400' : 'bg-blue-500 hover:bg-blue-800 text-slate-100'} transition-colors duration-100 hover py-1 px-3 rounded-md font-medium ${className}`}
            onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};

export default AnswerButton;