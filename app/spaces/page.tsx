"use client";
import {useContext, useState} from "react";
import { createSpace, deleteSpace, useSpaces} from "@/routes/space";
import styles from "./index.module.scss";
import Modal from "@/components/base/Modal";
import {useSession} from "next-auth/react";
import CreateSpaceForm, {CreateData} from "@/components/CreateSpace";
import {TableHeader} from "@/types/table";
import {SearchContext} from "@/util/context";
import GridItem from "@/components/base/Grid/GridItem";
import Link from "next/link";


const tableHeaders: TableHeader[] = [
    {
        title: "Name",
        size: 5,
    },
    {
        title: "Role",
        size: 3
    },
    {
        title: "Username",
        size: 3,
    },
    {
        title: "Actions",
        size: 1
    }
];


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

    const storeSpace = (data: CreateData) => {
        setCreateSpaceModal(false);
        mutate(async (spaces) => {
            const newSpace = await createSpace(data);
            return [newSpace.data, ...spaces || []];
        });
    };

    return (
        <>
            <Modal open={createSpaceModal} onClose={() => setCreateSpaceModal(false)}>
                <CreateSpaceForm memberName={user?.name || ""} store={storeSpace}/>
            </Modal>
            <div className="content">
                <div className={styles.createSpaceContainer}>
                    <button className="filled" onClick={() => setCreateSpaceModal(true)}>
                        Create space
                    </button>
                </div>
                <div className="grid">
                    <div className="header">
                        {tableHeaders.map((header, index) => (
                            <GridItem key={index} size={header.size}>
                                <h5>{header.title}</h5>
                            </GridItem>
                        ))}
                    </div>
                    {spaces.map((space) => (
                        <div className="line" key={space.id}>
                            <GridItem size={5}>
                                <Link href={`/spaces/${space.id}`} className="link">
                                    <h3>{space.name}</h3>
                                </Link>
                            </GridItem>
                            <GridItem size={3}>
                                <h5>{space.role}</h5>
                            </GridItem>
                            <GridItem size={3}>
                                <h5>{space.username}</h5>
                            </GridItem>
                            <GridItem size={1}>
                                <button className="text" onClick={() => removeSpace(space.id)}
                                        disabled={space.personal}>Delete
                                </button>
                            </GridItem>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Spaces;