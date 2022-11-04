"use client";
import {ApplicationSpace} from "@/types/space";
import {useEffect, useState, useContext} from "react";
import {getSpaces, deleteSpace, createSpace} from "@/api/space";
import styles from "./index.module.scss";
import Modal from "@/components/base/Modal";
import {useSession} from "next-auth/react";
import CreateSpaceForm, {CreateData} from "@/components/CreateSpace";
import {TableHeader} from "@/types/table";
import {SearchContext} from "@/util/context";
import Link from "next/link";
import GridItem from "@/components/base/Grid/GridItem";
import Button from "@/components/base/Button";
import GridLine from "@/components/base/Grid/GridLine";


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
    const [spaces, setSpaces] = useState<ApplicationSpace[]>([]);
    const [createSpaceModal, setCreateSpaceModal] = useState<boolean>(false);

    const {data} = useSession();
    const {debouncedSearch} = useContext(SearchContext);

    const loadSpaces = () => {
        getSpaces({search: debouncedSearch || undefined}).then((response) => setSpaces(response.data));
    };

    useEffect(loadSpaces, []);
    useEffect(loadSpaces, [debouncedSearch]);

    const removeSpace = (spaceId: number) => {
        setSpaces(data => data.filter(({id}) => id !== spaceId));
        deleteSpace(spaceId).then(() => loadSpaces());
    };

    const storeSpace = (data: CreateData) => {
        setCreateSpaceModal(false);
        createSpace(data).then((response) => {
            setSpaces(spaces => [response.data, ...spaces]);
            loadSpaces();
        });
    };


    return (
        <>
            <Modal open={createSpaceModal} onClose={() => setCreateSpaceModal(false)}>
                <CreateSpaceForm memberName={data?.user?.name || ""} store={storeSpace}/>
            </Modal>
            <div className={styles.wrapper}>
                <div className={styles.createSpaceContainer}>
                    <Button variant="filled" onClick={() => setCreateSpaceModal(true)}>
                        Create space
                    </Button>
                </div>
                <div className={styles.tableHeader}>
                    {tableHeaders.map((header, index) => (
                        <GridItem key={index} size={header.size}>
                            <h5>{header.title}</h5>
                        </GridItem>
                    ))}
                </div>
                {spaces.map((space) => (
                    <GridLine key={space.id}>
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
                            <Button variant="text" onClick={() => removeSpace(space.id)}
                                    disabled={space.personal}>Delete</Button>
                        </GridItem>
                    </GridLine>
                ))}
            </div>
        </>
    );
};

export default Spaces;