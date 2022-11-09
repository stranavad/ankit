"use client";
import {ApplicationSpace} from "@/types/space";
import {useEffect, useState, useContext} from "react";
import {getSpaces, deleteSpace, createSpace, acceptSpaceInvitation} from "@/api/space";
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
    const [spaces, setSpaces] = useState<ApplicationSpace[]>([]);
    const [invitedSpaces, setInvitedSpaces] = useState<ApplicationSpace[]>([]);
    const [createSpaceModal, setCreateSpaceModal] = useState<boolean>(false);

    const {data} = useSession();
    const {debouncedSearch} = useContext(SearchContext);

    const loadSpaces = () => {
        getSpaces({search: debouncedSearch || undefined, accepted: true}).then((response) => setSpaces(response.data));
    };

    const loadInvitedSpaces = () => {
        getSpaces({accepted: false}).then((response) => setInvitedSpaces(response.data));
    };


    useEffect(() => {
        loadSpaces();
        loadInvitedSpaces();
    }, []);
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

    const acceptInvitation = (accept: boolean, spaceId: number) => {
        acceptSpaceInvitation(spaceId, accept).then(() => {
            loadInvitedSpaces();
            loadSpaces();
        });
    };

    return (
        <>
            <Modal open={createSpaceModal} onClose={() => setCreateSpaceModal(false)}>
                <CreateSpaceForm memberName={data?.user?.name || ""} store={storeSpace}/>
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
                {invitedSpaces.length ? (
                    <div className="grid">
                        <h2>Invitations</h2>
                        {invitedSpaces.map((space) => (
                            <div className="line" key={space.id}>
                                <GridItem size={9}>
                                    <h3>{space.name}</h3>
                                </GridItem>

                                <GridItem size={2}>
                                    <button className="text" onClick={() => acceptInvitation(true, space.id)}
                                            disabled={space.personal}>Accept
                                    </button>
                                </GridItem>
                                <GridItem size={1}>
                                    <button className="text" onClick={() => acceptInvitation(false, space.id)}
                                            disabled={space.personal}>Decline
                                    </button>
                                </GridItem>
                            </div>
                        ))}
                    </div>
                ) : <></>}
            </div>
        </>
    );
};

export default Spaces;