import {ReactElement} from "react";

const ModalContent = ({children}: { children: ReactElement | ReactElement[] }) => {
    return (
        <div className="p-5">
            {children}
        </div>
    );
};

export default ModalContent;

