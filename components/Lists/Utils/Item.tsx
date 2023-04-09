import { ReactNode } from "react";

const TableItem = ({ children, className = "", md = false, sm = false }: {
    children: ReactNode | ReactNode[],
    className?: string,
    md?: boolean,
    sm?: boolean
}) => {
    let display = "table-cell";

    if (md) {
        display = "hidden md:table-cell";
    } else if (sm) {
        display = "hidden sm:table-cell";
    }

    return (
        <div className={`${display} border-b border-slate-100 p-4 first:pl-4 last:pr-4 text-slate-500 ${className}`}>
            {children}
        </div>
    );
};

export default TableItem;