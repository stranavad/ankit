import React, {useState} from "react";
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
		console.log(event);

		if (active.id !== over?.id) {
			setItems((items) => {
				const oldItem = items.find(({id}) => id === active.id);
				const newItem = items.find(({id}) => id === over?.id);

				if (!oldItem || !newItem) {
					return;
				}

				const oldIndex = items.indexOf(oldItem);
				const newIndex = items.indexOf(newItem);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};

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
				{items.map((option) => <Option key={option.id}
											   option={option}/>)}
			</SortableContext>
		</DndContext>
	);
};

export default Options;