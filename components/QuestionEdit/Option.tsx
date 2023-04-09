import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Option } from "@/types/questionnaire";
import { useContext, useEffect, useState } from "react";
import useDebounce from "@/util/debounce";
import { ChevronUpDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import IconButton from "../Button/IconButton";
import { checkSpacePermission, Permission } from "@/util/permission";
import { MemberContext } from "@/util/memberContext";

interface OptionsProps {
    option: Option;
    updateValue: (value: string) => void;
    remove: () => void;
    disabled?: boolean;
}

const QuestionOption = ({ option, updateValue, remove, disabled = false }: OptionsProps) => {
    const [value, setValue] = useState<string>(option.value);
    const debouncedValue = useDebounce(value);
    const { member } = useContext(MemberContext);

    useEffect(() => {
        value && updateValue(value);
    }, [debouncedValue]);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: option.id, disabled });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    const updateOptionDisabled = !checkSpacePermission(Permission.UPDATE_QUESTION_OPTION, member.role);
    const deleteOptionDisabled = !checkSpacePermission(Permission.DELETE_QUESTION_OPTION, member.role);

    return (
        <div ref={setNodeRef} style={{ ...style, touchAction: "none" }} {...attributes}
             className="flex items-center my-2 w-full py-2">
            {!disabled && (
                <div className="" {...listeners}>
                    <ChevronUpDownIcon
                        className="w-6 h-6 text-current hover:text-indigo-500 transition-colors duration-75" />
                </div>
            )}
            <input id={`option-${option.id}`}
                   className={`mx-2 px-0 w-full bg-transparent border-b-2 border-b-transparent pb-1 ${disabled ? "cursor-not-allowed" : "hover:border-b-2 hover:border-b-indigo-500"} outline-none`}
                   value={value}
                   disabled={updateOptionDisabled}
                   onChange={(e) => setValue(e.target.value)}
            />
            {!disabled && (
                <IconButton disabled={deleteOptionDisabled} icon={TrashIcon} onClick={remove} color="error" invert
                            size="medium" />
            )}
        </div>
    );
};

export default QuestionOption;