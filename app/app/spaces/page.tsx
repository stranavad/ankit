"use client";
import {lazy, useState, Suspense} from "react";
import {createSpace, CreateSpaceData, deleteSpace, leaveSpace, useSpaces} from "@/routes/space";
import {useSession} from "next-auth/react";
import Button from "@/components/Button";

const SpacesList = lazy(() => import("@/components/Lists/SpacesList"));
const Modal = lazy(() => import("@/components/base/Modal"));
const CreateSpaceForm = lazy(() => import("@/components/Modals/CreateSpace"));


const Spaces = () => {
    const {data, mutate} = useSpaces();
    const spaces = data?.filter(({accepted}) => accepted) || [];

    const [createSpaceModal, setCreateSpaceModal] = useState<boolean>(false);

    const {data: sessionData} = useSession();
    const user = sessionData?.user;
    const removeSpace = (spaceId: number) => {
        mutate(async (spaces) => {
            await deleteSpace(spaceId);
            return spaces?.filter(({id}) => id !== spaceId) || [];
        });
    };

    const leave = (spaceId: number) => {
        mutate(async (spaces) => {
            await leaveSpace(spaceId);
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
                <Modal open={createSpaceModal} setOpen={setCreateSpaceModal}>
                    <CreateSpaceForm memberName={user?.name || ""} store={storeSpace} setOpen={setCreateSpaceModal}/>
                </Modal>
            </Suspense>
            <div className="content">
                <div className="flex align-center">
                    <h2 className="text-2xl font-bold mr-5">Your Spaces</h2>
                    <Button className="text-xs py-0.5 px-2" onClick={() => setCreateSpaceModal(true)}>Create
                        space</Button>
                </div>
                <Suspense>
                    <SpacesList spaces={spaces} removeSpace={removeSpace} leaveSpace={leave}/>
                </Suspense>
            </div>
        </>
    );
};

export default Spaces;