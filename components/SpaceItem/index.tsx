import {ApplicationSpace} from "@/types/space";
import styles from "./index.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import {Button} from "@mui/material";
import InputUnstyled from "@mui/base/InputUnstyled";
import {ChangeEvent, useCallback, useState} from "react";
import debounce from "lodash/debounce";
import {updateSpace, updateSpaceMember} from "@/api/space";
import {RoleType} from "@/types/role";

export interface SpaceItemProps {
    space: ApplicationSpace;
    deleteSpace: (id: number) => void;
}

const SpaceItem = ({space, deleteSpace}: SpaceItemProps) => {
    const [spaceName, setSpaceName] = useState<string>(space.name);
    const [username, setUsername] = useState<string>(space.username);

    // SPACE NAME
    const updateSpaceData = useCallback(debounce((name) => {
        updateSpace({name}, space.id).then((response) => {
            space = response.data;
        });
    }, 500), []);

    const updateSpaceName = (e: ChangeEvent<HTMLInputElement>) => {
        setSpaceName(e.target.value);
        e.target.value && updateSpaceData(e.target.value);
    };

    // USERNAME
    const updateSpaceMemberData = useCallback(debounce((name) => {
        updateSpaceMember({name}, space.id).then((response) => {
            space = response.data;
        });
    }, 500), []);

    const updateUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        e.target.value && updateSpaceMemberData(e.target.value);
    };


    return (
        <Grid container spacing={2} className={styles.grid}>
            <Grid xs={5}>
                <InputUnstyled value={spaceName} onChange={updateSpaceName}
                    className="unstyled-text-field large"
                    disabled={![RoleType.ADMIN, RoleType.OWNER].includes(space.role)}/>
            </Grid>
            <Grid xs={3} className={styles.gridItem}>
                <h5>{space.role}</h5>
            </Grid>
            <Grid xs={3} className={styles.gridItem}>
                <InputUnstyled value={username} onChange={updateUsername} className="unstyled-text-field"/>
            </Grid>
            <Grid xs={1} className={styles.gridItem}>
                <Button onClick={() => deleteSpace(space.id)} disabled={space.personal}>Delete</Button>
            </Grid>
        </Grid>
    );
};

export default SpaceItem;