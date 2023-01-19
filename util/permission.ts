import {RoleType} from "@/types/role";

export const enum Permission {
    ADD_MEMBER = "add member",
    DELETE_MEMBER = "delete member",
    DELETE_QUESTION = "delete question",
    UPDATE_ROLE = "update role",
    ADD_QUESTION = "add question",
    UPDATE_SPACE = "update space",
    UPDATE_QUESTION_OPTION = "update question option",
    DELETE_QUESTION_OPTION = "delete question option",
    UPDATE_QUESTION_TITLE = "update question title",
    DELETE_SPACE = "delete space",
    CREATE_QUESTIONNAIRE = "create questionnaire",
    DELETE_QUESTIONNAIRE = "delete questionnaire",
    UPDATE_PUBLISHED_QUESTIONNAIRE_NAME = "update published questionnaire name",
    DELETE_PUBLISHED_QUESTIONNAIRE = "delete published questionnaire",
    PUBLISH_QUESTIONNAIRE = "publish questionnaire",
    UPDATE_QUESTIONNAIRE_NAME = "update questionnaire name",
    UPDATE_QUESTIONNAIRE_STATUS = "update questionnaire status",
    // New permissions
    UPDATE_QUESTIONNAIRE = "update questionnaire",
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
    "delete question option": RoleType.EDIT,
    "publish questionnaire": RoleType.EDIT,
    "update question title": RoleType.EDIT,
    "add question": RoleType.EDIT,
    "update questionnaire name": RoleType.EDIT,
    "update space": RoleType.ADMIN,
    "create questionnaire": RoleType.EDIT,
    "update questionnaire status": RoleType.EDIT,
    // New permissions
    "update questionnaire": RoleType.EDIT,
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