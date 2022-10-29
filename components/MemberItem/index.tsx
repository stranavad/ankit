import {ApplicationMember} from "@/types/member";
import styles from "./index.module.scss";
import Image from "next/image";
import {checkSpacePermission, Permission} from "@/util/permission";
import RolePicker from "@/components/RolePicker";
import {RoleType} from "@/types/role";
import Button from "@/components/base/Button";

interface MemberItemProps {
    member: ApplicationMember;
    removeMember: (member: ApplicationMember) => void;
    updateRole: (role: RoleType, memberId: number) => void;
}

const MemberItem = ({member, removeMember, updateRole}: MemberItemProps) => {
    return (
        <div className={styles.container}>
            <div className="basis-1/12 flex items-center">
                {member.image && <Image src={member.image} width="40px" height="40px" className={styles.image}/>}
            </div>
            <div className="basis-4/12">
                {member.name}
            </div>
            <div className="basis-1/4">
                <RolePicker role={member.role} updateRole={(data) => updateRole(data, member.id)}/>
            </div>
            <div className="basis-1/4">
                {checkSpacePermission(Permission.DELETE_MEMBER) && (
                    <Button onClick={() => removeMember(member)} variant="filled">Delete</Button>
                )}
            </div>
        </div>
    );
};

export default MemberItem;