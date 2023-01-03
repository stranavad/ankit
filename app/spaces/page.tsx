"use client";
import {useContext, useState} from "react";
import {createSpace, CreateSpaceData, deleteSpace, useSpaces} from "@/routes/space";
import Modal from "@/components/base/Modal";
import {useSession} from "next-auth/react";
import CreateSpaceForm from "@/components/Modals/CreateSpace";
import {SearchContext} from "@/util/context";
import Button from "@/components/Button";
import SpacesList from "@/components/Lists/SpacesList";


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

    const leaveSpace = (spaceId: number) => {
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
            <Modal open={createSpaceModal} setOpen={setCreateSpaceModal}>
                <CreateSpaceForm memberName={user?.name || ""} store={storeSpace} setOpen={setCreateSpaceModal}/>
            </Modal>
            <div className="content">
                <div className="flex align-center">
                    <h2 className="text-2xl font-bold mr-5">Your Spaces</h2>
                    <Button className="text-xs py-0.5 px-2" onClick={() => setCreateSpaceModal(true)}>Create
                        space</Button>
                </div>
                <SpacesList spaces={spaces} removeSpace={removeSpace} leaveSpace={leaveSpace}/>
            </div>
        </>
    );
};

export default Spaces;