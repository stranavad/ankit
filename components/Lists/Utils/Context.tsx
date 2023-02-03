import { ReactNode } from "react"

const TableContent = ({children}: {children: ReactNode | ReactNode[]}) => {
    return (
        <div className="table-row-group bg-white">
            {children}
        </div>
    )
}

export default TableContent