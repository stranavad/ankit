import {FaCheckCircle, FaPenNib, FaPlus, FaListUl} from "react-icons/fa";
import {MouseEventHandler, useRef, useState} from "react";
import Popper from "@/components/base/Popper";
import styles from "./index.module.scss";
import classNames from "classnames";
import {QuestionType} from "@/types/questionnaire";
import {IconType} from "react-icons";

interface TypeItem {
    title: string;
    type: QuestionType;
    icon: IconType;
}

const types: TypeItem[] = [
    {
        title: 'Select',
        type: QuestionType.SELECT,
        icon: FaCheckCircle
    },
    {
        title: 'Multi Select',
        type: QuestionType.MULTI_SELECT,
        icon: FaListUl
    },
    {
        title: 'Text',
        type: QuestionType.TEXT,
        icon: FaPenNib
    }
]

const AddQuestion = ({add}: {add: (type: QuestionType) => void}) => {
    const [open, setOpen] = useState<boolean>(false);
    const ref = useRef<HTMLButtonElement | null>(null);

    const openMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
        setOpen(o => !o);
        e.stopPropagation();
    }

    const onSelect = (type: QuestionType) => {
        setOpen(false);
        add(type);
    }

    return (
        <div>
            <button ref={ref} className={classNames('icon', styles.trigger)} onClick={openMenu}><FaPlus size="2em"/></button>
            <Popper show={open} anchor={ref.current} handleClose={() => setOpen(false)}>
                <div className={classNames('popper-container', styles.menu)}>
                    {types.map((type, index) => (
                        <button key={index} className="text small" onClick={() => onSelect(type.type)}><type.icon/>{type.title}</button>
                    ))}
                </div>
            </Popper>
        </div>
    )
}

export default AddQuestion;