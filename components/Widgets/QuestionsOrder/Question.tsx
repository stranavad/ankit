import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {SimpleQuestion} from "@/components/Widgets/QuestionsOrder/index";
import {ChevronUpDownIcon} from "@heroicons/react/24/outline";

interface QuestionProps {
    question: SimpleQuestion;
}

const Question = ({question}: QuestionProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: question.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={{...style, touchAction: 'none'}} {...attributes}
             {...listeners}
             className={`flex items-center my-4 transition-colors duration-75 ${question.visible ? "text-gray-900 hover:text-indigo-500" : "text-gray-400 hover:text-indigo-300"}`}>
            <ChevronUpDownIcon
                className="w-6 h-6 min-w-[1.5rem] text-current hover:text-indigo-500 mr-3"/>
            <span className="text-lg text-ellipsis overflow-hidden">{question.title}</span>
        </div>
    );
};

export default Question;