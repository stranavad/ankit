"use client";
import {ApplicationMember} from "@/types/member";
import {useEffect, useState} from "react";
import MemberItem from "@/components/MemberItem";
import {addMemberToSpace, getSpaceMembers, removeMemberFromSpace} from "@/api/space";
import MemberSearch from "@/components/MemberSearch";
import {ApplicationUser} from "@/types/user";
import {RoleType} from "@/types/role";
import {updateMemberRole} from "@/api/member";
import GridItem from "@/components/base/Grid/GridItem";
import {TableHeader} from "@/types/table";

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
    const [members, setMembers] = useState<ApplicationMember[]>([]);

    useEffect(() => {
        getSpaceMembers(spaceId).then((response) => setMembers(response.data));
    }, [spaceId]);

    const addUser = (user: ApplicationUser) => {
        addMemberToSpace({userId: user.id, username: user.name}, spaceId).then((response) => {
            setMembers(response.data);
        });
    };

    const removeMember = (member: ApplicationMember) => {
        removeMemberFromSpace(spaceId, member.id).then((response) => setMembers(response.data));
    };

    const updateRole = (role: RoleType, memberId: number) => {
        updateMemberRole(role, memberId, spaceId).then((response) => {
            response.data && setMembers(data => data.map((item) => {
                if (item.id === memberId) {
                    return response.data;
                } else {
                    return item;
                }
            }));
        });
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