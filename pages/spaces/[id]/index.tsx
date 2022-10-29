import type {NextPage} from "next";
import {useContext} from "react";
import CurrentSpaceProvider, {SpaceContext} from "@/components/CurrentSpaceProvider";
import Link from "next/link";

const SpacePage: NextPage = () => {
    const {space} = useContext(SpaceContext);


    return (
        <>
            {space && (
                <>
                    <h1>{space.name}</h1>
                    <h2>{space.description}</h2>
                    <Link href={`/spaces/${space.id}/members`}>Members</Link>
                </>
            )}
        </>
    );
};

export default SpacePage;