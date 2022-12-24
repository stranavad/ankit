"use client";
import styles from "./index.module.scss";
// DND
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
import {useState} from "react";
import Question from "./Question";

export interface SimpleQuestion {
    id: number;
    title: string;
    visible: boolean;
    required: boolean;
}

const mockQuestions: SimpleQuestion[] = [
    {id: 1, title: "First question", visible: true, required: true},
    {id: 2, title: "Second question", visible: false, required: false},
    {id: 3, title: "Third question", visible: true, required: false,},
    {id: 4, title: "Fourth question", visible: true, required: true},
    {id: 5, title: "Fifth question", visible: false, required: true}
];

const QuestionsOrder = () => {
    const [questions, setQuestions] = useState<SimpleQuestion[]>(mockQuestions);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (active.id !== over?.id) {
            setQuestions((items) => {
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

    return (
        <div className={styles.widget}>
            <div className={styles.topMenu}>
                <h2>Frantuv dotaznik</h2>
                {/*<button>hide</button>*/}
            </div>
            <div className={styles.questions}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={questions}
                        strategy={verticalListSortingStrategy}
                    >
                        {questions.map((question) => (
                            <Question key={question.id} question={question}/>
                        ))}

                    </SortableContext>

                </DndContext>
            </div>
        </div>
    );
};

export default QuestionsOrder;