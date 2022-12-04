import styles from "./index.module.scss";

const Loader = ({message}: { message: string }) => {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader}/>
            <span>{message}</span>
        </div>
    );
};

export default Loader;