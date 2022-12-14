import {useState} from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors, DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import OptionComponent from "./Option";
import {Option} from "@/types/questionnaire";
import styles from "./index.module.scss";
import classNames from "classnames";
import {createOption, deleteOption, updateOption, updateOptionPosition} from "@/routes/question";

const Options = ({
    options,
    questionId,
    questionnaireId
}: { options: Option[], questionnaireId: number, questionId: number }) => {
    const [items, setItems] = useState<Option[]>(options);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (active.id !== over?.id) {
            let activeId: number | null = null;
            let activeIndex: number | null = null;
            let overId: number | null = null;
            let overIndex: number | null = null;
            setItems((items) => {
                const oldItem = items.find(({id}) => id === active.id);
                const newItem = items.find(({id}) => id === over?.id);

                if (!oldItem || !newItem) {
                    return items;
                }

                activeId = oldItem.id;
                overId = newItem.id;

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
        setItems(items => ([...items, {id: maxId + 1, value, position: 3}]));
        // I don't want to use refs
        setTimeout(() => document.getElementById(`option-${maxId + 1}`)?.focus(), 0);
    };

    return (
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map((option, index) => <OptionComponent key={option.id}
                                                                   option={option}
                                                                   updateValue={(value) => updateOptionValue(value, index, option.id)}
                                                                   remove={() => removeOption(index, option.id)}/>)}
                </SortableContext>
            </DndContext>
            <div className={classNames(styles.optionContainer, styles.mock)}>
                <div className={styles.checkCircle}>
                    <div/>
                </div>
                <input className="text" placeholder="Add new" onFocus={addOption}/>
            </div>
        </>
    );
};

export default Options;