import {ReactElement, useEffect, useMemo, useState} from "react";
import {DetailSpace} from "@/types/space";
import {ApplicationMember} from "@/types/member";
import {getCurrentSpace} from "@/api/space";
import {defaultMember, defaultSpace, SpaceContext, SpaceContextData} from "@/util/context";

interface CurrentSpaceProviderProps {
    children: ReactElement;
    spaceId: number;
}


const CurrentSpaceProvider = ({children, spaceId}: CurrentSpaceProviderProps) => {
    const [space, setSpace] = useState<DetailSpace>(defaultSpace);
    const [member, setMember] = useState<ApplicationMember>(defaultMember);

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

    // useEffect(() => {
    //     fetch();
    // }, [])

    useEffect(() => {
        oldSpaceId !== spaceId && fetch();
        oldSpaceId = spaceId;
    }, [spaceId]);

    const contextData: SpaceContextData = useMemo(() => ({
        space,
        member,
        fetch,
        updateMember: (data) => setMember(data),
        updateSpace: (space) => setSpace(space)
    }), [space, member]);

    return (
        <SpaceContext.Provider value={contextData}>
            {(space.id && spaceId) || !spaceId ? children : <h1>Hold up</h1>}
        </SpaceContext.Provider>
    );
};

export default CurrentSpaceProvider;