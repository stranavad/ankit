import IconButton from "@/components/Button/IconButton";
import ConfirmationModal from "@/components/Modals/ConfirmationModal";
import { ApplicationQuestionnaire, DetailQuestionnaire } from "@/types/questionnaire";
import { copyQuestionnaireLink } from "@/util/questionnaire";
import { ShareIcon, TrashIcon } from "@heroicons/react/24/outline";

interface QuestionnaireActionsProps {
    questionnaire: ApplicationQuestionnaire | DetailQuestionnaire;
    share?: boolean;
    remove?: boolean;
    removeQuestionnaire?: (id: number) => void;
    removeDisabled?: boolean;
}

const QuestionnaireActions = ({share=true, remove=true, removeQuestionnaire=()=>undefined, questionnaire, removeDisabled=false}: QuestionnaireActionsProps) => {
    return (
        <>
            {share && (
                <IconButton className="mr-3" icon={ShareIcon} color="primary" size="medium" onClick={() => copyQuestionnaireLink(questionnaire)}/>
            )}
            {remove && (
                <ConfirmationModal title="Do you really want to delete this questionnaire?"
                    description="This action is irreversible and you will loose all your data"
                    submitButtonText="Delete"
                    submit={() => removeQuestionnaire(questionnaire.id)}
                    renderItem={openModal => 
                    <IconButton icon={TrashIcon} color="error" size="medium" disabled={removeDisabled} onClick={openModal}/>}/>
            )}
        </>
    )
}

export default QuestionnaireActions;