"use client";
import {ReactElement, useContext, useEffect, useState} from "react";
import {ApplicationSpace} from "@/types/space";
import {ApplicationMember} from "@/types/member";
import {getCurrentSpace} from "@/routes/space";
import {defaultMember, defaultSpace, MemberContext, SpaceContext} from "@/util/context";
import { TopBarContext } from "@/util/topBarContext";
import { getSpaceLink } from "@/util/url";

interface CurrentSpaceProviderProps {
    children: ReactElement;
    spaceId: number;
}

const CurrentSpaceProvider = ({children, spaceId}: CurrentSpaceProviderProps) => {
    const {setSpace: setTopBarSpace, setQuestionnaire: setTopBarQuestionnaire} = useContext(TopBarContext);
    const [space, setSpace] = useState<ApplicationSpace>(defaultSpace);
    const [member, setMember] = useState<ApplicationMember>(defaultMember);

    let oldSpaceId: null | number = null;

    const fetch = () => {
        spaceId && getCurrentSpace(spaceId)
            .then((response) => {
                if (response?.data) {
                    const spaceData = response.data.space;

                    setTopBarSpace({title: spaceData.name, path: getSpaceLink(spaceData.id)});
                    setTopBarQuestionnaire(null);
                    setSpace(spaceData);
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