import {createContext} from "react";
import {ApplicationSpace} from "@/types/space";
import {RoleType} from "@/types/role";

interface SpaceContextData {
    space: ApplicationSpace;
}

export const defaultSpace: ApplicationSpace = {
    id: 0,
    name: "",
    username: "username",
    accepted: true,
    personal: true,
    role: RoleType.VIEW
};

export const SpaceContext = createContext<SpaceContextData>({space: defaultSpace});