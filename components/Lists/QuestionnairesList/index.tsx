import {ApplicationQuestionnaire, Status} from "@/types/questionnaire";
import Link from "next/link";
import {SpaceContext} from "@/util/spaceContext";
import {useContext} from "react";
import {checkSpacePermission, Permission} from "@/util/permission";
import StatusPicker from "@/components/Pickers/StatusPicker";
import { getQuestionnaireLink } from "@/util/url";
import TableHeader, { TableHeaderItem } from "../Utils/Header";
import Table from "../Utils/Table";
import TableContent from "../Utils/Content";
import TableRow from "../Utils/Row";
import TableItem from "../Utils/Item";
import QuestionnaireActions from "./QuestionnaireActions";

interface QuestionnairesListProps {
    questionnaires: ApplicationQuestionnaire[];
    removeQuestionnaire: (id: number) => void;
    updateStatus: (status: Status, id: number) => void;
}

const headerItems: TableHeaderItem[] = [
    {
        text: 'Name',
    },
    {
        text: 'Status'
    },
    {
        text: 'Actions'
    }
]

const QuestionnairesList = ({questionnaires, removeQuestionnaire, updateStatus}: QuestionnairesListProps) => {
    const {space} = useContext(SpaceContext);
    const deleteButtonDisabled = !checkSpacePermission(Permission.DELETE_QUESTIONNAIRE, space.role);
    const updateStatusDisabled = !checkSpacePermission(Permission.UPDATE_QUESTIONNAIRE_STATUS, space.role);

    return (
        <Table>
            <TableHeader items={headerItems}/>
            <TableContent>
                {questionnaires.map((questionnaire) => (
                    <TableRow key={questionnaire.id}>
                        <TableItem className="font-medium">
                            <Link href={getQuestionnaireLink(space.id, questionnaire.id)}
                                  className="block w-full cursor-pointer">{questionnaire.name}</Link>
                        </TableItem>
                        <TableItem>
                        <StatusPicker status={questionnaire.status} disabled={updateStatusDisabled} updateStatus={(status) => updateStatus(status, questionnaire.id)}/>
                        </TableItem>
                        <TableItem className="align-middle">
                            <QuestionnaireActions questionnaire={questionnaire} removeQuestionnaire={removeQuestionnaire} removeDisabled={deleteButtonDisabled}/>
                        </TableItem>
                    </TableRow>
                ))}
            </TableContent>
        </Table>
    );
};

export default QuestionnairesList;