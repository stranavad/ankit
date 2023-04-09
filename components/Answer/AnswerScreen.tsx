import useDesign from "@/util/design";

interface AnswerScreenProps {
    children: any;
    translate: string;
    fixed?: boolean;
}

const AnswerScreen = ({ children, translate, fixed = false }: AnswerScreenProps) => {
    const backgroundColor = useDesign("backgroundColor");
    return (
        <div
            style={{ backgroundColor }}
            className={`${fixed ? "fixed" : "absolute"} min-h-[100vh] inset-0 bottom-auto flex py-24 px-4 justify-center transition-transform duration-200 ${translate}`}>
            {children}
        </div>
    );
};

export default AnswerScreen;