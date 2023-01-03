"use client";
import EntityName from "@/components/Inputs/EntityName";
import {deleteSpace, leaveSpace, updateSpace, UpdateSpaceData, useSpace} from "@/routes/space";
import EntityDescription from "@/components/Inputs/EntityDescription";
import ConfirmationModal from "@/components/Modals/ConfirmationModal";
import Button from "@/components/Button";
import {MemberContext} from "@/util/memberContext";
import {useContext} from "react";
import {RoleType} from "@/types/role";
import {useRouter} from "next/navigation";
import {checkSpacePermission, Permission} from "@/util/permission";
import MembersList from "@/components/Lists/MembersList";

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

    const leaveButtonDisabled = !checkSpacePermission(Permission.DELETE_SPACE, space.role) || space.personal;
    ;
    const deleteButtonDisabled = currentMember.role !== RoleType.OWNER;

    return (
        <div className="content">
            <div className="bg-white shadow p-5 rounded-md">
                <EntityName value={space.name} update={updateName}/>
                <EntityDescription value={space.description} update={updateDescription}/>

                {/* MEMBERS */}
                <h2 className="mt-10 text-lg font-medium">Members</h2>
                <div className="mt-1 mb-3 h-px bg-gray-200 w-full"/>
                <MembersList members={space.members} removeMember={() => undefined} updateRole={() => undefined}/>
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