import {ReactElement} from "react";

const ModalContent = ({children}: { children: ReactElement | ReactElement[] }) => {
    return (
        <div className="p-5 max-w-2xl">
            {children}
        </div>
    );
};

export default ModalContent;

