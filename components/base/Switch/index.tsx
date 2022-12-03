import styles from "./index.module.scss";

interface SwitchProps {
    title?: string;
    value: boolean;
    update: (value: boolean) => void;
}

const Switch = ({title, value, update}: SwitchProps) => {
    return (
        <div className={styles.wrapper}>
            {title && <div className={styles.title}>{title}</div>}
            <label className={styles.switch}>
                <input type="checkbox" className={styles.input} checked={value}
                       onChange={e => update(e.target.checked)}/>
                <span className={styles.slider}/>
            </label>
        </div>
    );
};

export default Switch;