import {Button, Link, Table} from "@geist-ui/core";
import {ApplicationSpace} from "@/types/space";
import Trash2 from "@geist-ui/icons/trash2";
import NextLink from "next/link";
import {checkSpacePermission, Permission} from "@/util/permission";

interface SpacesListProps {
    spaces: ApplicationSpace[];
    removeSpace: (id: number) => void;
}

const SpacesList = ({spaces, removeSpace}: SpacesListProps) => {
    const renderDeleteButton = (_: any, space: ApplicationSpace) => {
        const disabled = space.personal || !checkSpacePermission(Permission.DELETE_SPACE, space.role);
        return (
            <Button type="error" disabled={disabled} iconRight={<Trash2/>} onClick={() => removeSpace(space.id)}
                    ghost auto scale={1 / 2}/>
        );
    };

    const renderSpaceName = (name: any, space: ApplicationSpace) => {
        return (
            <NextLink href={`/spaces/${space.id}`} style={{width: "100%"}}><Link>{name}</Link></NextLink>
        );
    };

    return (
        <Table data={spaces}>
            <Table.Column prop="name" label="Name" render={renderSpaceName}/>
            <Table.Column prop="role" label="Role"/>
            <Table.Column prop="username" label="Username"/>
            <Table.Column prop="id" label="Actions" render={renderDeleteButton}/>
        </Table>
    );
};

export default SpacesList;