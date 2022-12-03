import {ReactElement, useEffect, useState} from "react";
import {ApplicationSpace} from "@/types/space";
import {ApplicationMember} from "@/types/member";
import {getCurrentSpace} from "@/api/space";
import {defaultMember, defaultSpace, MemberContext, SpaceContext} from "@/util/context";

interface CurrentSpaceProviderProps {
    children: ReactElement;
    spaceId: number;
}


const CurrentSpaceProvider = ({children, spaceId}: CurrentSpaceProviderProps) => {
    const [space, setSpace] = useState<ApplicationSpace>(defaultSpace);
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

    useEffect(() => {
        oldSpaceId !== spaceId && fetch();
        oldSpaceId = spaceId;
    }, [spaceId]);

    return (
        <SpaceContext.Provider value={{space}}>
            <MemberContext.Provider value={{member}}>
                {children}
            </MemberContext.Provider>
        </SpaceContext.Provider>
    );
};

export default CurrentSpaceProvider;