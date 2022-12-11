import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {Option} from "@/types/questionnaire";
import styles from "./index.module.scss";
import {FaTrash} from "react-icons/fa";
import {useEffect, useState} from "react";
import useDebounce from "@/util/debounce";

interface OptionsProps {
    option: Option;
    updateValue: (value: string) => void;
    remove: () => void;
}

const QuestionOption = ({option, updateValue, remove}: OptionsProps) => {
    const [value, setValue] = useState<string>(option.value);
    const debouncedValue = useDebounce(value);

    useEffect(() => {
        value && updateValue(value);
    }, [debouncedValue]);

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
            <div className={styles.checkCircle}>
                <div/>
            </div>
            <input id={`option-${option.id}`} className="text" value={value}
                   onChange={(e) => setValue(e.target.value)}
                   style={{width: "100%", paddingRight: "10px", paddingLeft: "10px"}}/>
            <button className="icon" onClick={remove}><FaTrash/></button>
        </div>
    );
};

export default QuestionOption;