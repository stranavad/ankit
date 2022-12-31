"use client";
import {useContext} from "react";
import {addMemberToSpace, removeMemberFromSpace, useSpaceMembers} from "@/routes/space";
import {ApplicationUser} from "@/types/user";
import {RoleType} from "@/types/role";
import {updateMemberRole} from "@/routes/member";
import {SearchContext} from "@/util/context";
import MembersList from "@/components/Lists/MembersList";

const Members = ({params: {id}}: { params: { id: string } }) => {
    const spaceId = parseInt(id);
    const {search} = useContext(SearchContext);
    const {data, mutate} = useSpaceMembers(spaceId);
    const members = (search ? data?.filter(({name}) => name.includes(search)) : data) || [];

    const addUser = (user: ApplicationUser) => {
        mutate(async () => {
            const newMember = await addMemberToSpace({userId: user.id, username: user.name}, spaceId);
            return newMember.data;
        }, {revalidate: false});
    };

    const removeMember = (memberId: number) => {
        mutate(async () => {
            const newMembers = await removeMemberFromSpace(spaceId, memberId);
            return newMembers.data;
        }, {revalidate: false});
    };

    const updateRole = (role: RoleType, memberId: number) => {
        mutate(async (cachedMembers) => {
            const updatedMember = await updateMemberRole(role, memberId, spaceId);
            return cachedMembers?.map((member) => member.id === memberId ? updatedMember.data : member);
        }, {revalidate: false});
    };

    return (
        <div className="content">
            <div style={{width: "800px", display: "flex", justifyContent: "center"}}>
                {/*<MemberSearch addUser={addUser} spaceId={spaceId}/>*/}
            </div>
            <MembersList members={members} updateRole={updateRole} removeMember={removeMember}/>
        </div>
    );
};

export default Members;