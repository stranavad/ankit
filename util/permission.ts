import {RoleType} from "@/types/role";

export const enum Permission {
    ADD_MEMBER = "add member",
    DELETE_MEMBER = "delete member",
    DELETE_QUESTION = "delete question",
    UPDATE_ROLE = "update role",
    UPDATE_QUESTION_OPTION = "update question option",
    DELETE_QUESTION_OPTION = "delete question option",
    DELETE_SPACE = "delete space",
    DELETE_QUESTIONNAIRE = "delete questionnaire",
    UPDATE_PUBLISHED_QUESTIONNAIRE_NAME = "update published questionnaire name",
    DELETE_PUBLISHED_QUESTIONNAIRE = "delete published questionnaire"
}

const permissions: { [key in Permission]: RoleType } = {
    "add member": RoleType.ADMIN,
    "delete member": RoleType.ADMIN,
    "update role": RoleType.ADMIN,
    "delete space": RoleType.OWNER,
    "delete questionnaire": RoleType.ADMIN,
    "delete question": RoleType.EDIT,
    "update published questionnaire name": RoleType.ADMIN,
    "delete published questionnaire": RoleType.ADMIN,
    "update question option": RoleType.EDIT,
    "delete question option": RoleType.EDIT
};

export const checkSpacePermission = (permission: Permission, role: RoleType): boolean => {
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