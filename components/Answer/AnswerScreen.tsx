interface AnswerScreenProps {
    children: any;
    translate: string;
}

const AnswerScreen = ({children, translate}: AnswerScreenProps) => {
    return (
        <div
            className={`absolute inset-0 bottom-auto flex py-24 justify-center transition-transform duration-200 ${translate}`}>
            {children}
        </div>
    );
};

export default AnswerScreen;