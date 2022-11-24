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
import Option from "./Option";
import {QuestionOption} from "@/types/questionnaire";

const Options = () => {
	const [items, setItems] = useState<QuestionOption[]>([
		{
			id: 1,
			value: "First option"
		},
		{
			id: 2,
			value: "Second option",
		},
		{
			id: 3,
			value: "Third option"
		}
	]);

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
		})
	}

	const deleteOption = (index: number) => {
		setItems(items => {
			const newItems = [...items];
			newItems.splice(index, 1);
			return newItems;
		});
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={items}
				strategy={verticalListSortingStrategy}
			>
				{items.map((option, index) => <Option key={option.id}
											   option={option} updateValue={(value) => updateOptionValue(value, index)} remove={() => deleteOption(index)}/>)}
			</SortableContext>
		</DndContext>
	);
};

export default Options;