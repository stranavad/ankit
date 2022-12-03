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

const Index = ({store, memberName: defaultMemberName}: CreateSpaceFormProps) => {
    const [spaceName, setSpaceName] = useState<string>("New space");
    const [memberName, setMemberName] = useState<string>(defaultMemberName);

    return (
        <>
            <div className={styles.form}>
                <h4 className="heading-2 mb-2" style={{color: "var(--light-text)"}}>Create new space</h4>
                <input value={spaceName} onChange={({target}) => setSpaceName(target.value)}
                       className="filled"/>
                <input value={memberName} onChange={({target}) => setMemberName(target.value)}
                       className="filled"/>
                <button className="text" disabled={!spaceName || !memberName} style={{color: "var(--light-text)"}}
                        onClick={() => store({spaceName, memberName})}>create
                </button>
            </div>
        </>
    );
};

export default Index;