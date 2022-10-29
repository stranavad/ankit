import {RoleType} from "@/types/role";
import {useContext} from "react";
import {SpaceContext} from "@/components/CurrentSpaceProvider";

export const enum Permission {
    ADD_MEMBER = "add member",
    DELETE_MEMBER = "delete member"
}

const permissions: { [key in Permission]: RoleType } = {
    "add member": RoleType.ADMIN,
    "delete member": RoleType.OWNER
};

export const checkSpacePermission = (permission: Permission): boolean => {
    const {member: {role}} = useContext(SpaceContext);
    return isRoleEnough(role, permissions[permission]);
};

export const isRoleEnough = (actualRole: RoleType, requiredRole: RoleType) => {
    switch (requiredRole) {
    case RoleType.VIEW:
        return [
            RoleType.OWNER,
            RoleType.ADMIN,
            RoleType.EDIT,
            RoleType.VIEW,
        ].includes(actualRole);
    case RoleType.EDIT:
        return [RoleType.OWNER, RoleType.ADMIN, RoleType.EDIT].includes(
            actualRole,
        );
    case RoleType.ADMIN:
        return [RoleType.OWNER, RoleType.ADMIN].includes(actualRole);
    case RoleType.OWNER:
        return actualRole === RoleType.OWNER;
    }
};