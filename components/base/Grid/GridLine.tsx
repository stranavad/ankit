import {ReactElement} from "react";
import styles from "./index.module.scss";

const GridLine = ({children}: { children: ReactElement | ReactElement[] }) => {
    return (
        <div className={styles.gridLine}>{children}</div>
    );
};

export default GridLine;