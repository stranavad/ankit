import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {Option} from "@/types/questionnaire";
import styles from "./index.module.scss";
import {FaTrash} from "react-icons/fa";

interface OptionsProps {
    option: Option;
    updateValue: (value: string) => void;
    remove: () => void;
}

const Option = ({option, updateValue, remove}: OptionsProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: option.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} className={styles.optionContainer}>
            <div className={styles.dragHandle} {...listeners}>
                <div/>
                <div/>
            </div>
            <input className="text" value={option.value} onChange={(e) => updateValue(e.target.value)}
                   style={{width: "100%", paddingRight: "10px", paddingLeft: "10px"}}/>
            <button className="icon" onClick={remove}><FaTrash/></button>
        </div>
    );
};

export default Option;