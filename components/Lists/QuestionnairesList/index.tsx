import {ApplicationQuestionnaire} from "@/types/questionnaire";
import ConfirmationModal from "@/components/Modals/ConfirmationModal";
import Link from "next/link";
import {SpaceContext} from "@/util/spaceContext";
import {useContext} from "react";
import {TrashIcon} from "@heroicons/react/24/outline";
import {checkSpacePermission, Permission} from "@/util/permission";
import StatusPicker from "@/components/Pickers/StatusPicker";
import IconButton from "@/components/Button/IconButton";

interface QuestionnairesListProps {
    questionnaires: ApplicationQuestionnaire[];
    removeQuestionnaire: (id: number) => void;
}

const QuestionnairesList = ({questionnaires, removeQuestionnaire}: QuestionnairesListProps) => {
    const {space} = useContext(SpaceContext);
    const deleteButtonDisabled = !checkSpacePermission(Permission.DELETE_QUESTIONNAIRE, space.role);

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
                            <Link href={`/app/spaces/${space.id}/questionnaires/${questionnaire.id}`}
                                  className="block w-full cursor-pointer">{questionnaire.name}</Link>
                        </div>
                        <div
                            className="table-cell border-b border-slate-100 p-4 text-slate-500 ">
                            <StatusPicker status={questionnaire.status}/>
                        </div>
                        <div
                            className="table-cell border-b border-slate-100  p-4 pr-8 text-slate-500 align-middle">
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