import {createContext} from "react";
import {DetailSpace} from "@/types/space";
import {ApplicationMember} from "@/types/member";
import {RoleType} from "@/types/role";

/* TODO change name to current data */
export const defaultSpace: DetailSpace = {
    id: 0,
    name: "name",
    description: "description",
    username: "username",
    accepted: true,
    personal: true,
    role: RoleType.VIEW
};
export const defaultMember: ApplicationMember = {
    id: 0,
    name: "member name",
    role: RoleType.VIEW,
    accepted: true,
    email: "mail@gmail.com",
    image: null,
};

export interface SpaceContextData {
    space: DetailSpace,
    member: ApplicationMember,
    fetch: () => void,
    updateSpace: (data: DetailSpace) => void,
    updateMember: (data: ApplicationMember) => void

}

export const SpaceContext = createContext<SpaceContextData>({
    space: defaultSpace,
    member: defaultMember,
    fetch: () => undefined,
    updateSpace: () => undefined,
    updateMember: () => undefined,
});

export interface SearchContextData {
    search: string;
    debouncedSearch: string;
    clear: () => void;
}

export const SearchContext = createContext<SearchContextData>({
    search: '',
    debouncedSearch: '',
    clear: () => undefined
})