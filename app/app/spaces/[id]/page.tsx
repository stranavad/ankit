"use client";
import EntityName from "@/components/Inputs/EntityName";
import {
    addMemberToSpace,
    deleteSpace,
    leaveSpace,
    removeMemberFromSpace,
    updateSpace,
    UpdateSpaceData,
    useSpace
} from "@/routes/space";
import EntityDescription from "@/components/Inputs/EntityDescription";
import ConfirmationModal from "@/components/Modals/ConfirmationModal";
import Button from "@/components/Button";
import {MemberContext} from "@/util/memberContext";
import {useContext} from "react";
import {RoleType} from "@/types/role";
import {useRouter} from "next/navigation";
import MembersList from "@/components/Lists/MembersList";
import {updateMemberRole} from "@/routes/member";
import MemberSearch from "@/components/MemberSearch";
import {ApplicationUser} from "@/types/user";
import { checkSpacePermission, Permission } from "@/util/permission";

interface Props {
    params: {
        id: string
    };
}

const SpacePage = ({params: {id}}: Props) => {
    const spaceId = parseInt(id);
    const {member: currentMember} = useContext(MemberContext);
    const {data: space, mutate} = useSpace(spaceId);
    const router = useRouter();


    if (!space) {
        return;
    }

    const updateFunction = async (data: UpdateSpaceData) => {
        return (await updateSpace(data, spaceId)).data;
    };

    const updateName = (name: string) => {
        mutate(() => updateFunction({name}), {
            revalidate: false,
            optimisticData: {...space, name}
        });
    };

    const updateDescription = (description: string) => {
        mutate(() => updateFunction({description}), {
            revalidate: false,
            optimisticData: {...space, description}
        });
    };

    const removeSpace = async () => {
        await deleteSpace(spaceId);
        router.push("/spaces");
    };

    const leave = async () => {
        await leaveSpace(spaceId);
        router.push("/spaces");
    };

    const removeMember = (memberId: number) => {
        mutate(async (space) => {
            const newMembers = await removeMemberFromSpace(spaceId, memberId);
            return space ? ({...space, members: newMembers.data}) : space;
        }, {revalidate: false});
    };

    const addUser = (user: ApplicationUser) => {
        mutate(async (space) => {
            if (!space) {
                return space;
            }

            const members = await addMemberToSpace({userId: user.id, username: user.name}, spaceId);
            return ({...space, members: members.data});
        }, {revalidate: false});
    };

    const updateRole = (role: RoleType, memberId: number) => {
        mutate(async (space) => {
            if (!space) {
                return space;
            }

            const updatedMember = await updateMemberRole(role, memberId, spaceId);
            const newMembers = space.members.map((member) => member.id === memberId ? updatedMember.data : member);
            return ({...space, members: newMembers});
        }, {revalidate: false});
    };

    const updateSpaceDisabled = !checkSpacePermission(Permission.UPDATE_SPACE, currentMember.role);
    const leaveButtonDisabled = currentMember.role === RoleType.OWNER;
    const deleteButtonDisabled = currentMember.role !== RoleType.OWNER;
    const addMemberDisabled = !checkSpacePermission(Permission.ADD_MEMBER, currentMember.role);

    return (
        <div className="content">
            <div className="mb-10 flex justify-between items-center">
                <h2 className="text-2xl font-semibold mr-5">Space dashboard</h2>
            </div>
            <div className="bg-white p-5 rounded-md">
                <EntityName value={space.name} update={updateName} disabled={updateSpaceDisabled}/>
                <EntityDescription value={space.description} update={updateDescription} disabled={updateSpaceDisabled}/>

                {/* MEMBERS */}
                <div className="mt-10 mb-5 flex items-center justify-between">
                    <h2 className="text-lg font-medium mr-5">Members</h2>
                    {!addMemberDisabled && (
                        <MemberSearch addUser={addUser}/>
                    )}
                </div>
                {/*<div className="mt-1 mb-3 h-px bg-gray-200 w-full"/>*/}
                <MembersList members={space.members} removeMember={removeMember} updateRole={updateRole}/>
                {/* ADVANCED */}
                <h2 className="mt-10 text-lg font-medium">Advanced</h2>
                <div className="mt-1 mb-3 h-px bg-gray-200 w-full"/>
                <div className="flex items-center my-3">
                    <span className="mr-5 text-sm">Leave this space</span>
                    <ConfirmationModal title={"Do you really want to transfer this questionnaire to another space?"}
                                       description={"This action is irreversible"}
                                       submit={leave}
                                       renderItem={openModal => <Button secondary type="warning"
                                                                        disabled={leaveButtonDisabled}
                                                                        className="py-1 px-2 text-xs"
                                                                        onClick={leaveButtonDisabled ? undefined : openModal}>Leave
                                       </Button>}/>
                </div>
                <div className="flex items-center my-3">
                    <span className="mr-5 text-sm">Delete this space</span>
                    <ConfirmationModal title={"Do you really want to delete this space?"}
                                       description={"This action is irreversible and you will loose all your data"}
                                       submit={removeSpace}
                                       renderItem={openModal => <Button secondary type="error"
                                                                        disabled={deleteButtonDisabled}
                                                                        className="py-1 px-2 text-xs"
                                                                        onClick={deleteButtonDisabled ? undefined : openModal}>Delete</Button>}/>
                </div>
            </div>
        </div>
    );
};

export default SpacePage;