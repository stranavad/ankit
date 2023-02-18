import { useState } from "react";
import AnswerButton from "./Button";

interface PasswordProtectionProps {
    unlock: (password: string) => void;
}

const PasswordProtection = ({unlock}: PasswordProtectionProps) => {
    const [password, setPassword] = useState<string>("");

    const buttonDisabled = !password;

    return (
        <div className="max-w-xl w-full">
            <h2 className="text-slate-900 dark:text-slate-100 font-semibold text-lg mb-5">This questionnaire is password protected</h2>

            <div className="flex flex-col">
                <input value={password} onChange={(e) => setPassword(e.target.value) } id="password" placeholder="Questionnaire's password" name="password" type="password" className="bg-transparent text-slate-800 dark:text-slate-100 rounded-md border border-slate-200 outline-none py-1"/>
                <label htmlFor="password" className="text-xs text-slate-800 dark:text-slate-100 mt-2">Enter password to continue</label>
            </div>

            <div className="w-full flex justify-end">
                <AnswerButton text="Submit" onClick={() => unlock(password)} disabled={buttonDisabled}/>
            </div>
        </div>
    )
}

export default PasswordProtection;