import {Button, TextField, Typography} from "@mui/material";
import {useState} from "react";
import styles from "./index.module.scss";

interface CreateSpaceFormProps {
    memberName: string;
    store: (data: CreateData) => void;
}

export interface CreateData {
    spaceName: string;
    memberName: string;
}

const CreateSpaceForm = ({store, memberName: defaultMemberName}: CreateSpaceFormProps) => {
    const [spaceName, setSpaceName] = useState<string>("New space");
    const [memberName, setMemberName] = useState<string>(defaultMemberName);

    return (
        <>
            <div className={styles.form}>
                <h2 className="heading-2 mb-2">Create new space</h2>
                <TextField value={spaceName} onChange={({target}) => setSpaceName(target.value)}
                    className="form-input"/>
                <TextField value={memberName} onChange={({target}) => setMemberName(target.value)}
                    className="form-input"/>
                <Button variant="contained" disabled={!spaceName || !memberName}
                    onClick={() => store({spaceName, memberName})}>CREATE</Button>
            </div>
        </>
    );
};

export default CreateSpaceForm;