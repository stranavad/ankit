import {ApplicationMember} from "@/types/member";
import Image from "next/image";
import ConfirmationModal from "@/components/Modals/ConfirmationModal";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {checkSpacePermission, Permission} from "@/util/permission";
import {useContext} from "react";
import {MemberContext} from "@/util/memberContext";
import {RoleType} from "@/types/role";
import RolePicker from "@/components/Pickers/RolePicker";
import IconButton from "@/components/Button/IconButton";

interface MembersListProps {
    members: ApplicationMember[];
    removeMember: (id: number) => void;
    updateRole: (role: RoleType, id: number) => void;
}

const MembersList = ({members, updateRole, removeMember}: MembersListProps) => {
    const {member: currentMember} = useContext(MemberContext);
    const deleteButtonDisabled = (member: ApplicationMember) => !checkSpacePermission(Permission.DELETE_MEMBER, currentMember.role) || member.id === currentMember.id || member.role === RoleType.OWNER;
    const updateRoleDisabled = (member: ApplicationMember) => !checkSpacePermission(Permission.UPDATE_ROLE, currentMember.role) || member.id === currentMember.id || member.role === RoleType.OWNER;

    return (
        <div className="table border-collapse table-auto w-full text-sm">
            <div className="table-header-group">
                <div className="table-row">
                    <div
                        className="hidden sm:table-cell border-b font-medium p-4 pl-2 pt-0 pb-3 text-slate-400  text-left">Photo
                    </div>
                    <div
                        className="table-cell border-b font-medium p-4 pl-2 sm:pl-0 pt-0 pb-3 text-slate-400 text-left">Name
                    </div>
                    <div
                        className="table-cell border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">Role
                    </div>
                    <div
                        className="table-cell border-b font-medium p-4 pr-2 pt-0 pb-3 text-slate-400 text-left">Actions
                    </div>
                </div>
            </div>
            <div className="table-row-group bg-white">
                {members.map((member) => (
                    <div className="table-row" key={member.id}>
                        <div
                            className="hidden sm:table-cell border-b border-slate-100 p-4 pl-2 text-slate-500">
                            <Image src={member.image as string} alt={`${member.name}'s profile picture`} width="40"
                                   height="40" className="rounded-full"/>
                        </div>
                        <div
                            className="table-cell border-b pl-2 sm:pl-4 border-slate-100 p-4 text-slate-500 align-middle font-medium">
                            {member.name}
                        </div>
                        <div
                            className="table-cell border-b border-slate-100 p-4 text-slate-500 align-middle">
                            <RolePicker role={member.role} updateRole={(role) => updateRole(role, member.id)}
                                        disabled={updateRoleDisabled(member)}/>
                        </div>
                        <div
                            className="table-cell border-b border-slate-100  p-4 pr-2 text-slate-500">
                            <ConfirmationModal title="Do you really want to delete this member?"
                                               description={`This action is irreversible and you would have to invite ${member.name} again in case you change your mind.`}
                                               submitButtonText="Delete"
                                               submit={() => removeMember(member.id)}
                                               renderItem={openModal => 
                                               <IconButton icon={TrashIcon} disabled={deleteButtonDisabled(member)} onClick={openModal} size="medium" color="error"/>}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MembersList;