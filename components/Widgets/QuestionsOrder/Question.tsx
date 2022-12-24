import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import styles from "./index.module.scss";
import {SimpleQuestion} from "@/components/Widgets/QuestionsOrder/index";
import {MdOutlineDragIndicator} from 'react-icons/md';
import classnames from 'classnames';

interface QuestionProps {
    question: SimpleQuestion;
}


const Question = ({question}: QuestionProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: question.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} className={classnames(styles.question, !question.visible ? styles.notVisible : undefined)}  {...listeners}>
            <div className={styles.dragHandle}>
                <MdOutlineDragIndicator/>
                <div/>
            </div>
            <span>{question.title}</span>
        </div>
    );
};

export default Question;