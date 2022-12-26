import {ApplicationQuestionnaire, getStatusColor} from "@/types/questionnaire";
import ConfirmationModal from "@/components/Modals/ConfirmationModal";
import Link from "next/link";
import {SpaceContext} from "@/util/spaceContext";
import {useContext} from "react";
import {TrashIcon} from "@heroicons/react/24/solid";
import {checkSpacePermission, Permission} from "@/util/permission";

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
                            <Link href={`/spaces/${space.id}/questionnaires/${questionnaire.id}`}
                                  className="block w-full cursor-pointer">{questionnaire.name}</Link>
                        </div>
                        <div
                            className="table-cell border-b border-slate-100 p-4 text-slate-500 ">
                            <span
                                className={`capitalize bg-${getStatusColor(questionnaire.status)}-400 py-1 px-2 rounded-xl text-xs text-white`}>
                                {questionnaire.status}
                            </span>
                        </div>
                        <div
                            className="table-cell border-b border-slate-100  p-4 pr-8 text-slate-500">
                            <ConfirmationModal title="Do you really want to delete this questionnaire?"
                                               description="This action is irreversible and you will loose all your data"
                                               submitButtonText="Delete"
                                               submit={() => removeQuestionnaire(space.id)}
                                               renderItem={openModal => <button className="mr-3"
                                                                                disabled={deleteButtonDisabled}
                                                                                onClick={openModal}>
                                                   <TrashIcon
                                                       className={`h-5 w-5 text-red-500 ${deleteButtonDisabled ? "text-gray-500 cursor-not-allowed" : ""}`}/>
                                               </button>}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionnairesList;