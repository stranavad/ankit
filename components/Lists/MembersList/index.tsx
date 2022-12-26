import {ApplicationMember} from "@/types/member";
import Image from "next/image";
import ConfirmationModal from "@/components/Modals/ConfirmationModal";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import {checkSpacePermission, Permission} from "@/util/permission";
import {useContext} from "react";
import {MemberContext} from "@/util/memberContext";
import {RoleType} from "@/types/role";
import RolePicker from "@/components/RolePicker";

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
        <div className="table border-collapse table-auto w-full text-sm mt-5">
            <div className="table-header-group">
                <div className="table-row">
                    <div
                        className="table-cell border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400  text-left">Photo
                    </div>
                    <div
                        className="table-cell border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">Name
                    </div>
                    <div
                        className="table-cell border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">Role
                    </div>
                    <div
                        className="table-cell border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">Actions
                    </div>
                </div>
            </div>
            <div className="table-row-group bg-white">
                {members.map((member) => (
                    <div className="table-row" key={member.id}>
                        <div
                            className="table-cell border-b border-slate-100 p-4 pl-8 text-slate-500">
                            <Image src={member.image as string} alt={`${member.name}'s profile picture`} width="40"
                                   height="40" className="rounded-full"/>
                        </div>
                        <div
                            className="table-cell border-b border-slate-100 p-4 text-slate-500 flex align-middle font-medium">
                            {member.name}
                        </div>
                        <div
                            className="table-cell border-b border-slate-100 p-4 text-slate-500 flex align-middle">
                            <RolePicker role={member.role} updateRole={(role) => updateRole(role, member.id)}
                                        disabled={updateRoleDisabled(member)}/>
                        </div>
                        <div
                            className="table-cell border-b border-slate-100  p-4 pr-8 text-slate-500">
                            <ConfirmationModal title="Do you really want to delete this member?"
                                               description={`This action is irreversible and you would have to invite ${member.name} again in case you change your mind.`}
                                               submitButtonText="Delete"
                                               submit={() => removeMember(member.id)}
                                               renderItem={openModal => <button className="mr-3"
                                                                                disabled={deleteButtonDisabled(member)}
                                                                                onClick={openModal}>
                                                   <TrashIcon
                                                       className={`h-5 w-5 text-red-500 ${deleteButtonDisabled(member) ? "text-gray-500 cursor-not-allowed" : ""}`}/>
                                               </button>}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MembersList;