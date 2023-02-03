import { ReactNode } from "react";

const Table = ({children}: {children: ReactNode | ReactNode[]}) => {
    return (
        <div className="table border-collapse table-auto w-full text-sm mt-5">
            {children}
        </div>
    )
}

export default Table;