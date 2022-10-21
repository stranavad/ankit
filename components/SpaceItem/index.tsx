import {ApplicationSpace} from "@/types/space";
import styles from "./index.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import {Button, Tooltip} from "@mui/material";
import InputUnstyled from "@mui/base/InputUnstyled";
import {useEffect, useState} from "react";

export interface SpaceItemProps {
    space: ApplicationSpace;
    deleteSpace: (id: number) => void;
}

const SpaceItem = ({space, deleteSpace}: SpaceItemProps) => {
    const [spaceName, setSpaceName] = useState<string>(space.name);

    useEffect(() => setSpaceName(space.name), [space]);

    return (
        <Grid container spacing={2} className={styles.grid}>
            <Grid xs={5}>
                <InputUnstyled value={spaceName} onChange={(e) => setSpaceName(e.target.value)}
                    className="unstyled-text-field"/>
            </Grid>
            <Grid xs={3} className={styles.gridItem}>
                <h5>{space.role}</h5>
            </Grid>
            <Grid xs={3} className={styles.gridItem}>
                <h5>{space.username}</h5>
            </Grid>
            <Grid xs={1} className={styles.gridItem}>
                <Button onClick={() => deleteSpace(space.id)} disabled={space.personal}>Delete</Button>
            </Grid>
        </Grid>
    );
};

export default SpaceItem;