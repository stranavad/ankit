interface AnswerScreenProps {
    children: any;
    translate: string;
    fixed?: boolean
}

const AnswerScreen = ({children, translate, fixed=false}: AnswerScreenProps) => {
    return (
        <div
            className={`${fixed ? 'fixed' : 'absolute'} inset-0 bottom-auto flex py-24 px-4 justify-center transition-transform duration-200 ${translate}`}>
            {children}
        </div>
    );
};

export default AnswerScreen;