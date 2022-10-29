import {ApplicationMember} from "@/types/member";
import {useContext, useEffect, useState} from "react";
import MemberItem from "@/components/MemberItem";
import {addMemberToSpace, getSpaceMembers, removeMemberFromSpace} from "@/api/space";
import {SpaceContext} from "@/components/CurrentSpaceProvider";
import MemberSearch from "@/components/MemberSearch";
import {ApplicationUser} from "@/types/user";
import classNames from "classnames";
import styles from "./index.module.scss";
import {RoleType} from "@/types/role";
import {updateMemberRole} from "@/api/member";

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
            <div style={{width: "800px", display: "flex", justifyContent: "center"}}>
                <MemberSearch addUser={addUser}/>
            </div>
            <div className={classNames("flex", "flex-col", styles.container)}>
                {members.map((member) => <MemberItem key={member.id} member={member} removeMember={removeMember}
                    updateRole={updateRole}/>)}
            </div>
        </>
    );
};

export default Members;