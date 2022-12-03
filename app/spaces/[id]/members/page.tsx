"use client";
import {ApplicationMember} from "@/types/member";
import {useContext} from "react";
import MemberItem from "@/components/MemberItem";
import {addMemberToSpace, removeMemberFromSpace, useSpaceMembers} from "@/routes/space";
import MemberSearch from "@/components/MemberSearch";
import {ApplicationUser} from "@/types/user";
import {RoleType} from "@/types/role";
import {updateMemberRole} from "@/routes/member";
import GridItem from "@/components/base/Grid/GridItem";
import {TableHeader} from "@/types/table";
import {SearchContext} from "@/util/context";

const tableHeaders: TableHeader[] = [
    {
        title: "Photo",
        size: 1,
    },
    {
        title: "Name",
        size: 5
    },
    {
        title: "Role",
        size: 4,
    },
    {
        title: "Actions",
        size: 2
    }
];

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

    const removeMember = (member: ApplicationMember) => {
        mutate(async () => {
            const newMembers = await removeMemberFromSpace(spaceId, member.id);
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
                <MemberSearch addUser={addUser} spaceId={spaceId}/>
            </div>
            <div className="grid">
                <div className="header">
                    {tableHeaders.map((header, index) => (
                        <GridItem key={index} size={header.size}>
                            <h5>{header.title}</h5>
                        </GridItem>
                    ))}
                </div>
                {members.map((member) =>
                    <MemberItem key={member.id} member={member} removeMember={removeMember}
                                updateRole={updateRole}/>)}
            </div>
        </div>
    );
};

export default Members;