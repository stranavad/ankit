import styles from "./index.module.scss";
import QuestionsOrder from "@/components/Widgets/QuestionsOrder";

const Widgets = () => {
    return (
        <div className={styles.widgetsContainer}>
            <QuestionsOrder/>
        </div>
    );
};

export default Widgets;