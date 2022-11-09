"use client";
import {ApplicationMember} from "@/types/member";
import {useContext, useEffect, useState} from "react";
import MemberItem from "@/components/MemberItem";
import {addMemberToSpace, getSpaceMembers, removeMemberFromSpace} from "@/api/space";
import MemberSearch from "@/components/MemberSearch";
import {ApplicationUser} from "@/types/user";
import {RoleType} from "@/types/role";
import {updateMemberRole} from "@/api/member";
import {SpaceContext} from "@/util/context";
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

const Members = () => {
    const [members, setMembers] = useState<ApplicationMember[]>([]);
    const {space} = useContext(SpaceContext);

    useEffect(() => {
        getSpaceMembers(space.id).then((response) => setMembers(response.data));
    }, [space.id]);

    const addUser = (user: ApplicationUser) => {
        addMemberToSpace({userId: user.id, username: user.name}, space.id).then((response) => {
            setMembers(response.data);
        });
    };

    const removeMember = (member: ApplicationMember) => {
        removeMemberFromSpace(space.id, member.id).then((response) => setMembers(response.data));
    };

    const updateRole = (role: RoleType, memberId: number) => {
        updateMemberRole(role, memberId, space.id).then((response) => {
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
        <>
            <div className="content">
                <div style={{width: "800px", display: "flex", justifyContent: "center"}}>
                    <MemberSearch addUser={addUser}/>
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
        </>
    );
};

export default Members;