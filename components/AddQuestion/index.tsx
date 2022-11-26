import {FaCheckCircle, FaPenNib, FaPlus, FaListUl} from "react-icons/fa";
import {MouseEventHandler, useRef, useState} from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import {QuestionType} from "@/types/questionnaire";
import MenuSelect, {MenuSelectItem} from "@/components/MenuSelect";

const AddQuestion = ({add}: {add: (type: QuestionType) => void}) => {
    const [open, setOpen] = useState<boolean>(false);
    const ref = useRef<HTMLButtonElement | null>(null);

    const onSelect = (type: QuestionType) => {
        setOpen(false);
        add(type);
    }

    const types: MenuSelectItem<QuestionType>[] = [
        {
            title: 'Select',
            action: () => onSelect(QuestionType.SELECT),
            icon: FaCheckCircle
        },
        {
            title: 'Multi Select',
            action: () => onSelect(QuestionType.MULTI_SELECT),
            icon: FaListUl
        },
        {
            title: 'Text',
            action: () => onSelect(QuestionType.TEXT),
            icon: FaPenNib
        }
    ]

    const openMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
        setOpen(o => !o);
        e.stopPropagation();
    }

    return (
        <div>
            <button ref={ref} className={classNames('icon', styles.trigger)} onClick={openMenu}><FaPlus size="2em"/></button>
            <MenuSelect anchor={ref.current} show={open} handleClose={() => setOpen(false)} items={types}/>
        </div>
    )
}

export default AddQuestion;