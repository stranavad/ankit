"use client";
import {ReactElement, useContext, useEffect} from "react";
import {useCurrentSpace} from "@/routes/space";
import {defaultMember, defaultSpace, MemberContext, SpaceContext} from "@/util/context";
import {TopBarContext} from "@/util/topBarContext";
import {getSpaceLink} from "@/util/url";
import {useRouter} from "next/navigation";

interface CurrentSpaceProviderProps {
    children: ReactElement;
    spaceId: number;
}

const CurrentSpaceProvider = ({children, spaceId}: CurrentSpaceProviderProps) => {
    const {setSpace: setTopBarSpace} = useContext(TopBarContext);
    const {data, isError} = useCurrentSpace(spaceId);

    const space = data?.space || defaultSpace;
    const member = data?.member || defaultMember;

    const router = useRouter();

    if (isError) {
        router.push("/app/spaces");
    }


    useEffect(() => {
        setTopBarSpace({title: space.name, path: getSpaceLink(space.id)});
    }, [space.id, space.name]);


    return (
        <SpaceContext.Provider value={{space}}>
            <MemberContext.Provider value={{member}}>
                {children}
            </MemberContext.Provider>
        </SpaceContext.Provider>
    );
};

export default CurrentSpaceProvider;