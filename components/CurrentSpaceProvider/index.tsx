import {createContext, ReactElement, useEffect, useMemo, useState} from "react";
import {DetailSpace} from "@/types/space";
import {ApplicationMember} from "@/types/member";
import {getCurrentSpace} from "@/api/space";
import {useRouter} from "next/router";
import {RoleType} from "@/types/role";

export interface SpaceContextData {
    space: DetailSpace,
    member: ApplicationMember,
    fetch: () => void,
    updateSpace: (data: DetailSpace) => void,
    updateMember: (data: ApplicationMember) => void

}

const defaultSpace: DetailSpace = {
    id: 0,
    name: "name",
    description: "description",
    username: "username",
    accepted: true,
    personal: true,
    role: RoleType.VIEW
};

const defaultMember: ApplicationMember = {
    id: 0,
    name: "member name",
    role: RoleType.VIEW,
    accepted: true,
    email: "mail@gmail.com",
    image: null,
};

export const SpaceContext = createContext<SpaceContextData>({
    space: defaultSpace,
    member: defaultMember,
    fetch: () => undefined,
    updateSpace: () => undefined,
    updateMember: () => undefined,
});

interface CurrentSpaceProviderProps {
    children: ReactElement;
}

const CurrentSpaceProvider = ({children}: CurrentSpaceProviderProps) => {
    const [space, setSpace] = useState<DetailSpace>(defaultSpace);
    const [member, setMember] = useState<ApplicationMember>(defaultMember);

    const router = useRouter();
    const spaceId = Number(router.query.id);

    let oldSpaceId: null | number = null;

    const fetch = () => {
        spaceId && getCurrentSpace(spaceId)
            .then((response) => {
                if (response?.data) {
                    setSpace(response.data.space);
                    setMember(response.data.member);
                }
            });
    };

    useEffect(() => {
        oldSpaceId !== spaceId && fetch();
        oldSpaceId = spaceId;
    }, [spaceId]);

    const contextData: SpaceContextData = useMemo(() => ({
        space,
        member,
        fetch,
        updateMember: (data) => setMember(member),
        updateSpace: (space) => setSpace(space)
    }), [space, member]);

    return (
        <SpaceContext.Provider value={contextData}>
            {(space.id && spaceId) || !spaceId ? children : <h1>Hold up</h1>}
        </SpaceContext.Provider>
    );
};

export default CurrentSpaceProvider;