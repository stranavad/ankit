import {createContext} from "react";
import {ApplicationMember} from "@/types/member";
import {RoleType} from "@/types/role";

interface MemberContextData {
    member: ApplicationMember;
}

export const defaultMember: ApplicationMember = {
    id: 0,
    name: "",
    role: RoleType.VIEW,
    accepted: true,
    email: "",
    image: null,
};

export const MemberContext = createContext<MemberContextData>({
    member: defaultMember
});
