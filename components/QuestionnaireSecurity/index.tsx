import { useState } from "react";
import Button from "@/components/Button";
import SwitchInput from "@/components/Inputs/Switch";

interface QuestionnaireSecurityProps {
    passwordProtected: boolean;
    update: (passwordProtected: boolean, password: string) => void;
    disabled?: boolean;
}

const QuestionnaireSecurity = ({passwordProtected: passwordProtectedProp, update, disabled=false}: QuestionnaireSecurityProps) => {
    const [passwordProtected, setPasswordProtected] = useState<boolean>(passwordProtectedProp);
    const [password, setPassword] = useState<string>("");


    const updatePasswordProtected = (value: boolean) => {
        setPasswordProtected(value);

        if(!value){
            update(value, '');
        }

        if(!password || password.length > 50){
            return;
        }

        update(value, password);
    }


    const passwordSaveDisabled = !password || password.length > 50 || disabled;

    return (
        <>
            <h2 className="mt-10 text-lg font-medium">Security</h2>
            <div className="mt-1 mb-3 h-px bg-gray-200 w-full"/>
            <div className="my-3">
                <div className="flex items-center">
                    <span className="mr-5 text-sm">Password Protected</span>
                    <SwitchInput value={passwordProtected}
                                update={updatePasswordProtected} disabled={disabled}/>
                </div>
                {passwordProtected ? (
                    <div className="flex items-center mt-5">
                        <span className="mr-5 text-sm">Password</span>
                        <input type="password"
                            value={password}
                            disabled={disabled}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-72 p-1 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm mr-3"
                            placeholder="New password"/>

                        <Button disabled={passwordSaveDisabled} className="px-2 py-[3px] text-sm"
                                onClick={() => updatePasswordProtected(true)}>Save</Button>
                    </div>
                ) : (<></>)}
            </div>
        </>
    )
}

export default QuestionnaireSecurity;