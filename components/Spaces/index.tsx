import {ApplicationSpace} from "@/types/space";
import Grid from "@mui/material/Unstable_Grid2";
import SpaceItem from "@/components/SpaceItem";
import {useEffect, useState, useCallback, ChangeEvent} from "react";
import {getSpaces, deleteSpace, createSpace, GetSpacesParams} from "@/api/space";
import styles from "./index.module.scss";
import debounce from "lodash/debounce";
import AModal from "@/components/Modal";
import {useSession} from "next-auth/react";
import CreateSpaceForm, {CreateData} from "@/components/Spaces/createSpaceForm";
import {TableHeader} from "@/types/table";
import TextInput from "@/components/base/TextInput";


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
    const [search, setSearch] = useState<string>("");

    const {data} = useSession();

    const loadSpaces = (params: GetSpacesParams = {search}) => {
        getSpaces({search: params?.search || undefined}).then((response) => setSpaces(response.data));
    };

    useEffect(() => loadSpaces({search}), []);

    const debouncedLoadSpaces = useCallback(debounce((params: GetSpacesParams = {search}) => loadSpaces(params), 500), []);


    const removeSpace = (spaceId: number) => {
        setSpaces(data => data.filter(({id}) => id !== spaceId));
        deleteSpace(spaceId).then(() => debouncedLoadSpaces());
    };

    const storeSpace = (data: CreateData) => {
        setCreateSpaceModal(false);
        createSpace(data).then((response) => {
            setSpaces(spaces => [response.data, ...spaces]);
            debouncedLoadSpaces();
        });
    };

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        debouncedLoadSpaces({search: e.target.value});
    };


    return (
        <>
            <AModal open={createSpaceModal} onClose={() => setCreateSpaceModal(false)}>
                <CreateSpaceForm memberName={data?.user?.name || ""} store={storeSpace}/>
            </AModal>
            <div className={styles.wrapper}>
                <div className={styles.createSpaceContainer}>
                    <TextInput value={search} onChange={onChangeSearch} placeholder="search"/>
                    <button onClick={() => setCreateSpaceModal(true)}>
                        Create space
                    </button>
                </div>
                <Grid container spacing={2} className={styles.gridHeader}>
                    {tableHeaders.map((header, index) => (
                        <Grid xs={header.size} key={index}>
                            <h5>{header.title}</h5>
                        </Grid>
                    ))}
                </Grid>
                {spaces.map((space) => (
                    <SpaceItem space={space} key={space.id} deleteSpace={removeSpace}/>
                ))}
            </div>
        </>
    );
};

export default Spaces;