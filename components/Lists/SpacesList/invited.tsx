import {ApplicationSpace} from "@/types/space";
import PageHeader from "@/components/Utils/PageHeader";
import Table from "@/components/Lists/Utils/Table";
import TableHeader, {TableHeaderItem} from "@/components/Lists/Utils/Header";
import TableContent from "@/components/Lists/Utils/Context";
import TableRow from "@/components/Lists/Utils/Row";
import TableItem from "@/components/Lists/Utils/Item";
import Button from "@/components/Button";

interface InvitedSpacesProps {
    spaces: ApplicationSpace[];
    acceptInvitation: (accept: boolean, spaceId: number) => void;
}

const headerItems: TableHeaderItem[] = [
    {
        text: "Name",
    },
    {
        text: "Role",
        breakpoint: "sm"
    },
    {
        text: "Actions"
    }
];

const InvitedSpaces = ({spaces, acceptInvitation}: InvitedSpacesProps) => {
    if (!spaces.length) {
        return <></>;
    }

    return (
        <div className="mt-5">
            <PageHeader title="Invited spaces" subtitle/>
            <Table>
                <TableHeader items={headerItems}/>
                <TableContent>
                    {spaces.map((space) => (
                        <TableRow key={space.id}>
                            <TableItem className="font-medium">
                                {space.name}
                            </TableItem>
                            <TableItem>
                                {space.role}
                            </TableItem>
                            <TableItem>
                                <Button type="success" secondary className="p-1 mr-3"
                                        onClick={() => acceptInvitation(true, space.id)}>Accept</Button>
                                <Button type="warning" secondary className="p-1"
                                        onClick={() => acceptInvitation(false, space.id)}>Reject</Button>
                            </TableItem>
                        </TableRow>
                    ))}
                </TableContent>
            </Table>
        </div>
    );
};

export default InvitedSpaces;