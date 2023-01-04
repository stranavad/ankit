import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import type {Option} from "@/types/questionnaire";
import {useEffect, useState} from "react";
import useDebounce from "@/util/debounce";
import {ChevronUpDownIcon, TrashIcon} from "@heroicons/react/24/outline";

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
        <div ref={setNodeRef} style={style} {...attributes}
             className="flex items-center my-2 w-full py-2">
            <div className="" {...listeners}>
                <ChevronUpDownIcon
                    className="w-6 h-6 text-current hover:text-indigo-500 transition-colors duration-75"/>
            </div>
            <input id={`option-${option.id}`}
                   className="mx-2 px-0 w-full bg-transparent border-b-2 border-b-transparent pb-1 hover:border-b-2 hover:border-b-indigo-500 outline-none"
                   value={value}
                   onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={remove}><TrashIcon
                className="w-5 h-5 text-gray-500 hover:text-red-600 transition-colors duration-75"/></button>
        </div>
    );
};

export default QuestionOption;