"use client";
import {useContext, useState, lazy, Suspense} from "react";
import {createSpace, CreateSpaceData, deleteSpace, useSpaces} from "@/routes/space";
import {useSession} from "next-auth/react";

const CreateSpaceModal = lazy(() => import("@/components/CreateSpace"));
const SpacesList = lazy(() => import("@/components/SpacesList"));
import {SearchContext} from "@/util/context";
import {Button, Text, Spinner} from "@geist-ui/core";
import {Plus} from "@geist-ui/icons";


const Spaces = () => {
    const {data, mutate} = useSpaces();
    const {search} = useContext(SearchContext);

    const spaces = (search ? data?.filter((space) => space.accepted && space.name.includes(search)) : data?.filter((space) => space.accepted)) || [];

    const [createSpaceModal, setCreateSpaceModal] = useState<boolean>(false);

    const {data: sessionData} = useSession();
    const user = sessionData?.user;
    const removeSpace = (spaceId: number) => {
        mutate(async (spaces) => {
            await deleteSpace(spaceId);
            return spaces?.filter(({id}) => id !== spaceId) || [];
        });
    };

    const storeSpace = (data: CreateSpaceData) => {
        setCreateSpaceModal(false);
        mutate(async (spaces) => {
            const newSpace = await createSpace(data);
            return [newSpace.data, ...spaces || []];
        });
    };

    return (
        <>
            <Suspense>
                <CreateSpaceModal memberName={user?.name || ""} store={storeSpace} visible={createSpaceModal}
                                  onClose={setCreateSpaceModal}/>
            </Suspense>
            <div className="content">
                <div className="d-flex flex-align-center">
                    <Text h2 className="mr-5">Spaces</Text>
                    <Button scale={1 / 2} auto onClick={() => setCreateSpaceModal(true)} icon={<Plus/>}>Create
                        space</Button>
                </div>
                <Suspense fallback={<Spinner/>}>
                    <SpacesList spaces={spaces} removeSpace={removeSpace}/>
                </Suspense>
            </div>
        </>
    );
};

export default Spaces;