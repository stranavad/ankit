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

const Options = ({options}: { options: Option[] }) => {
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
            setItems((items) => {
                const oldItem = items.find(({id}) => id === active.id);
                const newItem = items.find(({id}) => id === over?.id);

                if (!oldItem || !newItem) {
                    return items;
                }

                const oldIndex = items.indexOf(oldItem);
                const newIndex = items.indexOf(newItem);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const updateOptionValue = (value: string, index: number) => {
        setItems(items => {
            const newItems = [...items];
            newItems[index].value = value;
            return newItems;
        });
    };

    const deleteOption = (index: number) => {
        setItems(items => {
            const newItems = [...items];
            newItems.splice(index, 1);
            return newItems;
        });
    };

    const addOption = () => {
        const maxId = Math.max(...items.map(({id}) => id));
        // setItems(items => ([...items, {id: maxId + 1, value: maxId + 1 + " option"}]));
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
                                                                   updateValue={(value) => updateOptionValue(value, index)}
                                                                   remove={() => deleteOption(index)}/>)}
                </SortableContext>
            </DndContext>
            <button className="text" style={{fontSize: "0.7em"}} onClick={addOption}>Add Option</button>
        </>
    );
};

export default Options;