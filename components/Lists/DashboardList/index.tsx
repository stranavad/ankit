import {DashboardQuestionnaire} from "@/types/questionnaire";
import {checkSpacePermission, Permission} from "@/util/permission";
import {getQuestionnaireLink} from "@/util/url";
import Link from "next/link";
import QuestionnaireActions from "../QuestionnairesList/QuestionnaireActions";
import TableContent from "../Utils/Context";
import TableHeader, {TableHeaderItem} from "../Utils/Header";
import TableRow from "../Utils/Row";
import Table from "../Utils/Table";
import TableItem from "../Utils/Item";
import StatusIndicator from "../Utils/StatusIndicator";

interface DashboardListProps {
    questionnaires: DashboardQuestionnaire[];
    removeQuestionnaire: (id: number) => void;
}

const headerItems: TableHeaderItem[] = [
    {
        text: "Name",
    },
    {
        text: "Answers",
        breakpoint: "sm",
    },
    {
        text: "Space",
        breakpoint: "sm"
    },
    {
        text: "Actions"
    }
];

const DashboardList = ({questionnaires, removeQuestionnaire}: DashboardListProps) => {
    const deleteButtonDisabled = (questionnaire: DashboardQuestionnaire) => !checkSpacePermission(Permission.DELETE_QUESTIONNAIRE, questionnaire.role);


    return (
        <Table>
            <TableHeader items={headerItems}/>
            <TableContent>
                {questionnaires.map((questionnaire) => (
                    <TableRow key={questionnaire.id}>
                        <TableItem className="font-medium">
                            <div className="flex items-center gap-3">
                                <StatusIndicator status={questionnaire.status}/>
                                <Link href={getQuestionnaireLink(questionnaire.spaceId, questionnaire.id)}
                                      className="cursor-pointer">{questionnaire.name}</Link>
                            </div>
                        </TableItem>
                        <TableItem sm>
                            {questionnaire.answerCount}
                        </TableItem>
                        <TableItem className="text-xs" sm>
                            {questionnaire.spaceName}
                        </TableItem>
                        <TableItem className="align-middle">
                            <QuestionnaireActions questionnaire={questionnaire}
                                                  removeQuestionnaire={removeQuestionnaire}
                                                  removeDisabled={deleteButtonDisabled(questionnaire)}/>
                        </TableItem>
                    </TableRow>
                ))}
            </TableContent>
        </Table>
    );
};

export default DashboardList;