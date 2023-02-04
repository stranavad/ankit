import {ReactNode} from "react";

interface PageHeaderProps {
    title: string;
    children?: ReactNode | ReactNode[];
    subtitle?: boolean;
    className?: string;
}

const PageHeader = ({title, children, subtitle = false, className = ""}: PageHeaderProps) => {
    return (
        <div className="flex align-center justify-between">
            <h2 className={`${subtitle ? "text-xl" : "text-2xl"} font-bold mr-5 ${className}`}>{title}</h2>
            <div>
                {children}
            </div>
        </div>
    );
};

export default PageHeader;