import { type ReactNode } from "react";

const PageCard = ({ children, className = "" }: { children: ReactNode | ReactNode[], className?: string }) => {
    return (
        <div className={`bg-white px-5 py-3 rounded-md mt-5 ${className}`}>
            {children}
        </div>
    );
};

export default PageCard;