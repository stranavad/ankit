import {useContext, useState} from "react";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy,} from "@dnd-kit/sortable";
import OptionComponent from "./Option";
import {Option, QuestionType} from "@/types/questionnaire";
import {createOption, deleteOption, updateOption, updateOptionPosition} from "@/routes/question";
import {ChevronUpDownIcon} from "@heroicons/react/24/outline";
import { checkSpacePermission, Permission } from "@/util/permission";
import { MemberContext } from "@/util/memberContext";

const questionTypesWithOptions: QuestionType[] = [QuestionType.SELECT, QuestionType.MULTI_SELECT];


interface OptionsProps {
    options: Option[];
    questionnaireId: number;
    questionId: number;
    type: QuestionType;
}

const Options = ({
    type,
    options,
    questionId,
    questionnaireId
}: OptionsProps) => {
    if (!questionTypesWithOptions.includes(type)) {
        return <></>;
    }

    const [items, setItems] = useState<Option[]>(options);
    const {member} = useContext(MemberContext);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (active.id !== over?.id) {
            let activeIndex: number | null = null;
            let overIndex: number | null = null;
            setItems((items) => {
                const oldItem = items.find(({id}) => id === active.id);
                const newItem = items.find(({id}) => id === over?.id);

                if (!oldItem || !newItem) {
                    return items;
                }


                const oldIndex = items.indexOf(oldItem);
                const newIndex = items.indexOf(newItem);
                activeIndex = oldIndex;
                overIndex = newIndex;

                return arrayMove(items, oldIndex, newIndex);
            });
            if (activeIndex !== null && overIndex !== null) {
                updateOptionPosition(questionnaireId, questionId, {
                    activeIndex,
                    overIndex,
                }).then((response) => {
                    setItems(response.data.options);
                });
            }

        }
    };

    const updateOptionValue = (value: string, index: number, id: number) => {
        if (items[index].value !== value) {
            setItems(items => {
                const newItems = [...items];
                newItems[index].value = value;
                return newItems;
            });
            updateOption(questionnaireId, questionId, id, {value}).then((response) => {
                setItems(response.data.options);
            });
        }
    };

    const removeOption = (index: number, id: number) => {
        deleteOption(questionnaireId, questionId, id).then((response) => setItems(response.data.options));
        setItems(items => {
            const newItems = [...items];
            newItems.splice(index, 1);
            return newItems;
        });
    };

    const addOption = () => {
        const maxId = Math.max(...items.map(({id}) => id));
        const value = "Option " + maxId + 1;
        createOption(questionnaireId, questionId, {value}).then((response) => setItems(response.data.options));
        setItems(items => ([...items, {id: maxId + 1, value, position: 3, deleted: false}]));
        // I don't want to use refs
        setTimeout(() => document.getElementById(`option-${maxId + 1}`)?.focus(), 0);
    };

    const updateOptionsDisabled = !checkSpacePermission(Permission.UPDATE_QUESTION_OPTION, member.role);

    return (
        <div className="mt-2">
            <span className="text-sm">Options</span>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    disabled={updateOptionsDisabled}
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map((option, index) => <OptionComponent key={option.id}
                                                                   option={option}
                                                                   disabled={updateOptionsDisabled}
                                                                   updateValue={(value) => updateOptionValue(value, index, option.id)}
                                                                   remove={() => removeOption(index, option.id)}/>)}
                </SortableContext>
            </DndContext>
            {!updateOptionsDisabled && (
                <div className="flex items-center my-2 w-full ">
                    <ChevronUpDownIcon className="w-6 h-6 text-gray-300"/>
                    <input className="mx-2 bg-transparent" placeholder="Add new" onFocus={addOption}/>
                </div>
            )}
        </div>
    );
};

export default Options;