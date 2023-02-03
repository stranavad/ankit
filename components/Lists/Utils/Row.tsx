import { ReactNode } from "react"

const TableRow = ({children}: {children: ReactNode | ReactNode[]}) => {
    return (
        <div className="table-row">
            {children}
        </div>
    ) 
}

export default TableRow;