import Sidebar from "@/components/Sidebar";
import {ReactNode} from "react";

const QuestionnaireLayout = ({children}: { children: ReactNode }) => {
    return (
        <Sidebar items={[]}>
            <>
                {children}
            </>
        </Sidebar>
    );
};


export default QuestionnaireLayout;