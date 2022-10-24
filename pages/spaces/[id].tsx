import type {NextPage} from "next";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getSpaceById} from "@/api/space";
import {DetailSpace} from "@/types/space";
import {AxiosError} from "axios";

const SpacePage: NextPage = () => {
    const [space, setSpace] = useState<DetailSpace | null>(null);

    const router = useRouter();
    const spaceId = Number(router.query.id);

    useEffect(() => {
        if (!isNaN(spaceId)) {
            getSpaceById(spaceId)
                .then((response) => setSpace(response.data))
                .catch(async (e: AxiosError) => {
                    if (e.response?.status === 400) {
                        await router.push("/spaces");
                    }
                });
        }
    }, [spaceId]);

    if (space) {
        return (
            <>
                <h1>{space.name}</h1>
                <h2>{space.description}</h2>
            </>
        );
    }
    return (
        <>
            <h1>Hold up</h1>
        </>
    );
};

export default SpacePage;