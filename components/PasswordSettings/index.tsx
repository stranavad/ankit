import styles from "./index.module.scss";
import Switch from "@/components/base/Switch";
import {useState} from "react";

interface PasswordSettingsProps {
    passwordProtected: boolean;
    password: string | null;
    update: ({passwordProtected, password}: { passwordProtected: boolean, password: string | null }) => void;
}

const PasswordSettings = ({
    passwordProtected: passwordProtectedProp,
    password: passwordProp,
    update
}: PasswordSettingsProps) => {
    const [passwordProtected, setPasswordProtected] = useState<boolean>(passwordProtectedProp);
    const [password, setPassword] = useState<string>(passwordProp || "");

    const onChangeProtected = (event: boolean) => {
        setPasswordProtected(event);
        if (!event) {
            update({passwordProtected: event, password: null});
        }
    };

    const onSave = () => {
        if (password.length > 0) {
            update({passwordProtected: true, password});
        }
    };

    return (
        <>
            <Switch value={passwordProtected} update={onChangeProtected} title="Password"/>
            {passwordProtected && (
                <div className={styles.inputWrapper}>
                    <input className="filled" value={password} onChange={e => setPassword(e.target.value)}
                           placeholder="Enter password"/>
                    <button className="text" onClick={onSave}>Save</button>
                </div>
            )}
        </>
    );
};

export default PasswordSettings;