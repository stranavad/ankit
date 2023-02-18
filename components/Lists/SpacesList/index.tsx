import {lazy} from 'react';
import {ApplicationSpace} from "@/types/space";
import Link from "next/link";
import {ArrowLeftOnRectangleIcon, TrashIcon} from "@heroicons/react/24/outline";
import {checkSpacePermission, Permission} from "@/util/permission";
import {RoleType} from "@/types/role";
import IconButton from "@/components/Button/IconButton";
import { getSpaceLink } from "@/util/url";
import TableHeader, { TableHeaderItem } from "../Utils/Header";
import Table from "../Utils/Table";
import TableContent from "../Utils/Context";
import TableRow from "../Utils/Row";
import TableItem from "../Utils/Item";

const ConfirmationModal = lazy(() => import("@/components/Modals/ConfirmationModal"));

interface SpacesListProps {
    spaces: ApplicationSpace[];
    removeSpace: (id: number) => void;
    leaveSpace: (id: number) => void;
}

const headerItems: TableHeaderItem[] = [
    {
        text: 'Name',
    },
    { 
        text: 'Username',
        breakpoint: 'md',
    },
    { 
        text: 'Role',
        breakpoint: 'sm',
    },
    {
        text: 'Actions'
    }
]

const SpacesList = ({spaces, removeSpace, leaveSpace}: SpacesListProps) => {
    const deleteButtonDisabled = (space: ApplicationSpace) => {
        return !checkSpacePermission(Permission.DELETE_SPACE, space.role) || space.personal;
    };

    const leaveButtonDisabled = (space: ApplicationSpace) => {
        return space.role === RoleType.OWNER;
    };

    return (
        <Table>
            <TableHeader items={headerItems}/>
            <TableContent>
            {spaces.map((space) => (
                    <TableRow key={space.id}>
                        <TableItem className="font-medium">
                            <Link href={getSpaceLink(space.id)}
                                  className="block w-full cursor-pointer">{space.name}</Link>
                        </TableItem>
                        <TableItem md>
                            {space.username}
                        </TableItem>
                        <TableItem sm>
                            {space.role}
                        </TableItem>
                        <TableItem>
                            <ConfirmationModal 
                                title="Do you really want to delete this space?"
                                description="This action is irreversible and you will loose all your data"
                                submitButtonText="Delete"
                                submit={() => removeSpace(space.id)}
                            >
                                {open => (
                                    <IconButton className="mr-1" icon={TrashIcon} size="medium" color="error" onClick={open} disabled={deleteButtonDisabled(space)}/>
                                )}
                            </ConfirmationModal>
                            <ConfirmationModal 
                                title="Do you really want to leave this space?"
                                description="This action is irreversible. You will have to contact the administrator of this space to get gain access "
                                submitButtonText="Leave"
                                submit={() => leaveSpace(space.id)}
                            >
                                {open => (
                                    <IconButton className="mr-1" icon={ArrowLeftOnRectangleIcon} size="medium" color="primary" onClick={open} disabled={leaveButtonDisabled(space)}/>
                                )}
                                </ConfirmationModal>
                        </TableItem>
                    </TableRow>
                ))}
            </TableContent>
        </Table>
    );
};

export default SpacesList;