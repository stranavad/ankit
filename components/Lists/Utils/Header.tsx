
type HeaderBreakpoint = 'md' | 'sm';
export interface TableHeaderItem {
    text: string;
    breakpoint?: HeaderBreakpoint;
    class?: string;
}

interface TableHeaderProps {
    items: TableHeaderItem[];
}

const getDisplay = (breakpoint?: HeaderBreakpoint) => {
    if(!breakpoint){
        return 'table-cell'
    } else if(breakpoint === 'sm') {
        return 'hidden sm:table-cell';
    } else if(breakpoint === 'md'){
        return 'hidden md:table-cell';
    }
}

const TableHeader = ({items}: TableHeaderProps) => {
    return (
        <div className="table-header-group">
            <div className="table-row border-b">
                {items.map((item, index) => (
                    <div key={index} className={`${getDisplay(item.breakpoint)} font-medium first:pl-4 last:pr-4 p-4 pt-0 pb-3 text-slate-400 text-left ${item.class ? item.class : ''}`}>
                        {item.text}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default TableHeader;