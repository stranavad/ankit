"use client";
import {useContext} from "react";
import Link from "next/link";
import {SpaceContext} from "@/util/context";

interface Props {
    params: {
        id: number
    };
}

const SpacePage = ({params}: Props) => {
    const {space} = useContext(SpaceContext);


    return (
        <>
            {space && (
                <>
                    <h1>{space.name}</h1>
                    <Link href={`/spaces/${params.id}/members`}>Members</Link>
                </>
            )}
        </>
    );
};

export default SpacePage;