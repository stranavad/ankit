import QuestionEdit from "@/components/QuestionEdit";
import AddQuestion from "@/components/AddQuestion";
import {Question, QuestionType} from "@/types/questionnaire";

interface QuestionsListProps {
    questions: Question[];
    addQuestion: (type: QuestionType, index: number) => void;
    cloneQuestion: (id: number) => void;
    refetchQuestions: () => void;
}

const QuestionsList = ({
    questions,
    addQuestion,
    cloneQuestion,
    refetchQuestions,
}: QuestionsListProps) => {
    return (
        <>
            {questions.map((question, index) => (
                <div key={question.id} style={{width: "100%", maxWidth: "800px"}}>
                    <QuestionEdit question={question} refetch={refetchQuestions}
                                  cloneQuestion={cloneQuestion}/>
                    <AddQuestion add={(type) => addQuestion(type, index)}/>
                </div>
            ))}
        </>
    );
};

export default QuestionsList;