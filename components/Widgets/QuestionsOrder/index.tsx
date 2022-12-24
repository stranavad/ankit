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
import {useContext} from "react";
import Question from "./Question";
import {QuestionsWidgetContext} from "@/util/questionsWidgetContext";
import {QuestionnaireContext} from "@/util/questionnaireContext";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";
import {updateQuestionPosition} from "@/routes/question";

export interface SimpleQuestion {
    id: number;
    title: string;
    visible: boolean;
    required: boolean;
}

const QuestionsOrder = () => {
    const {questions, setQuestions} = useContext(QuestionsWidgetContext);
    const {questionnaire} = useContext(QuestionnaireContext);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (active.id !== over?.id) {
            const oldItem = questions.find(({id}) => id === active.id);
            const newItem = questions.find(({id}) => id === over?.id);

            if (!oldItem || !newItem) {
                return questions;
            }

            const oldIndex = questions.indexOf(oldItem);
            const newIndex = questions.indexOf(newItem);

            setQuestions(arrayMove(questions, oldIndex, newIndex));
            if (oldIndex !== null && newIndex !== null)
                updateQuestionPosition(questionnaire.id, {
                    activeIndex: oldIndex,
                    overIndex: newIndex
                }).then((response) => {
                    setQuestions(response.data);
                });
        }
    };

    return (
        <div className={styles.widget}>
            <div className={styles.topMenu}>
                <h2>{questionnaire.name}</h2>
            </div>
            <div className={styles.questions}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToVerticalAxis]}
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