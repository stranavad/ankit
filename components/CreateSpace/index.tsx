import {useState} from "react";
import styles from "./index.module.scss";
import TextInput from "@/components/base/TextInput";
import Button from "@/components/base/Button";

interface CreateSpaceFormProps {
    memberName: string;
    store: (data: CreateData) => void;
}

export interface CreateData {
    spaceName: string;
    memberName: string;
}

const Index = ({store, memberName: defaultMemberName}: CreateSpaceFormProps) => {
    const [spaceName, setSpaceName] = useState<string>("New space");
    const [memberName, setMemberName] = useState<string>(defaultMemberName);

    return (
        <>
            <div className={styles.form}>
                <h4 className="heading-2 mb-2" style={{color: "var(--light-text)"}}>Create new space</h4>
                <TextInput value={spaceName} onChange={({target}) => setSpaceName(target.value)}
                           className={styles.input}/>
                <TextInput value={memberName} onChange={({target}) => setMemberName(target.value)}
                           className={styles.input}/>
                <Button variant="text" disabled={!spaceName || !memberName}
                        onClick={() => store({spaceName, memberName})} textColor="var(--light-text)">create</Button>
            </div>
        </>
    );
};

export default Index;