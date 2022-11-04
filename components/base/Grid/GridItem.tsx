import {ReactElement} from "react";

interface GridItemProps {
    size: number;
    columns?: number;
    children: ReactElement;
}

const GridItem = ({size, columns, children, ...props}: GridItemProps) => {
    return (
        <div {...props} style={{width: `${(100 / (columns || 12)) * size}%`}}>
            {children}
        </div>
    );
};

export default GridItem;