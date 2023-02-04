import {ReactElement} from "react";

const ModalActions = ({children}: { children: ReactElement | ReactElement[] }) => {
    return (
        <div className="sm:flex sm:flex-row-reverse p-5 pt-0">
            {children}
        </div>
    );
};

export default ModalActions;