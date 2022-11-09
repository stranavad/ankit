import {ApplicationMember} from "@/types/member";
import Image from "next/image";
import {checkSpacePermission, Permission} from "@/util/permission";
import RolePicker from "@/components/RolePicker";
import {RoleType} from "@/types/role";
import GridItem from "@/components/base/Grid/GridItem";
import {useContext} from "react";
import {SpaceContext} from "@/util/context";

interface MemberItemProps {
    member: ApplicationMember;
    removeMember: (member: ApplicationMember) => void;
    updateRole: (role: RoleType, memberId: number) => void;
}

const MemberItem = ({member, removeMember, updateRole}: MemberItemProps) => {
    const {member: currentMember} = useContext(SpaceContext);
    const rolePickerDisabled = member.role === RoleType.OWNER || !checkSpacePermission(Permission.UPDATE_ROLE, currentMember.role) || (member.role === RoleType.ADMIN && currentMember.role !== RoleType.OWNER);
    return (
        <div className="line">
            <GridItem size={1}>
                {member.image ?
                    <Image src={member.image} width="40" height="40" className="user-image"
                           alt="user image"/> : <></>}
            </GridItem>
            <GridItem size={5}>
                <h3>
                    {member.name}
                </h3>
            </GridItem>
            <GridItem size={4}>
                <RolePicker role={member.role} updateRole={(data) => updateRole(data, member.id)}
                            disabled={rolePickerDisabled}/>
            </GridItem>
            <GridItem size={2}>
                {checkSpacePermission(Permission.DELETE_MEMBER, useContext(SpaceContext).member.role) ? (
                    <button className="text" onClick={() => removeMember(member)}>Delete</button>
                ) : <></>}
            </GridItem>
        </div>
    );
};

export default MemberItem;