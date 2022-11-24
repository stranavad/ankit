import React from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {QuestionOption} from "@/types/questionnaire";

const Option = ({option}: { option: QuestionOption }) => {
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
        <div ref={setNodeRef} style={style} {...attributes} className="drag-something">
            <div style={{width: 25, height: 25, backgroundColor: "black"}} {...listeners}/>
            <button>{option.value}</button>
        </div>
    );
};

export default Option;