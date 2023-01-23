import {ApplicationQuestionnaire, Status} from "@/types/questionnaire";
import ConfirmationModal from "@/components/Modals/ConfirmationModal";
import Link from "next/link";
import {SpaceContext} from "@/util/spaceContext";
import {useContext} from "react";
import {TrashIcon, ShareIcon} from "@heroicons/react/24/outline";
import {checkSpacePermission, Permission} from "@/util/permission";
import StatusPicker from "@/components/Pickers/StatusPicker";
import IconButton from "@/components/Button/IconButton";
import { copyQuestionnaireLink } from "@/util/questionnaire";
import { getQuestionnaireLink } from "@/util/url";

interface QuestionnairesListProps {
    questionnaires: ApplicationQuestionnaire[];
    removeQuestionnaire: (id: number) => void;
    updateStatus: (status: Status, id: number) => void;
}

const QuestionnairesList = ({questionnaires, removeQuestionnaire, updateStatus}: QuestionnairesListProps) => {
    const {space} = useContext(SpaceContext);
    const deleteButtonDisabled = !checkSpacePermission(Permission.DELETE_QUESTIONNAIRE, space.role);
    const updateStatusDisabled = !checkSpacePermission(Permission.UPDATE_QUESTIONNAIRE_STATUS, space.role);

    return (
        <div className="table border-collapse table-auto w-full text-sm mt-5">
            <div className="table-header-group">
                <div className="table-row">
                    <div
                        className="table-cell border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400  text-left">Name
                    </div>
                    <div
                        className="table-cell border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">Status
                    </div>
                    <div
                        className="table-cell border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">Actions
                    </div>
                </div>
            </div>
            <div className="table-row-group bg-white">
                {questionnaires.map((questionnaire) => (
                    <div className="table-row" key={questionnaire.id}>
                        <div
                            className="table-cell border-b border-slate-100 p-4 pl-8 text-slate-500 font-medium">
                            <Link href={getQuestionnaireLink(space.id, questionnaire.id)}
                                  className="block w-full cursor-pointer">{questionnaire.name}</Link>
                        </div>
                        <div
                            className="table-cell border-b border-slate-100 p-4 text-slate-500 ">
                            <StatusPicker status={questionnaire.status} disabled={updateStatusDisabled} updateStatus={(status) => updateStatus(status, questionnaire.id)}/>
                        </div>
                        <div
                            className="table-cell border-b border-slate-100  p-4 pr-8 text-slate-500 align-middle">
                            <IconButton className="mr-3" icon={ShareIcon} color="primary" size="medium" onClick={() => copyQuestionnaireLink(questionnaire)}/>
                            <ConfirmationModal title="Do you really want to delete this questionnaire?"
                                               description="This action is irreversible and you will loose all your data"
                                               submitButtonText="Delete"
                                               submit={() => removeQuestionnaire(questionnaire.id)}
                                               renderItem={openModal => 
                                               <IconButton icon={TrashIcon} color="error" size="medium" disabled={deleteButtonDisabled} onClick={openModal}/>}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionnairesList;