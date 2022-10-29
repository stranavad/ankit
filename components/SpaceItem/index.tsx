import {ApplicationSpace} from "@/types/space";
import styles from "./index.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import {Button} from "@mui/material";
import Link from "next/link";

export interface SpaceItemProps {
    space: ApplicationSpace;
    deleteSpace: (id: number) => void;
}

const SpaceItem = ({space, deleteSpace}: SpaceItemProps) => {
    return (
        <Grid container spacing={2} className={styles.grid}>
            <Grid xs={5}>
                <Link href={`/spaces/${space.id}`}>
                    <h3>{space.name}</h3>
                </Link>
            </Grid>
            <Grid xs={3} className={styles.gridItem}>
                <h5>{space.role}</h5>
            </Grid>
            <Grid xs={3} className={styles.gridItem}>
                <h3>{space.username}</h3>
            </Grid>
            <Grid xs={1} className={styles.gridItem}>
                <Button onClick={() => deleteSpace(space.id)} disabled={space.personal}>Delete</Button>
            </Grid>
        </Grid>
    );
};

export default SpaceItem;