"use client";
import { useState } from "react";

import AnswerButton from "./Button";
import useDesign from "@/util/design";

interface PasswordProtectionProps {
    unlock: (password: string) => void;
}

const PasswordProtection = ({ unlock }: PasswordProtectionProps) => {
    const [password, setPassword] = useState<string>("");

    const buttonDisabled = !password;

    const textColor = useDesign("textColor");
    const borderColor = useDesign("optionColor");

    return (
        <div className="max-w-xl w-full">
            <h2 className="text-slate-900 dark:text-slate-100 font-semibold text-lg mb-5">
                This questionnaire is password
                protected
            </h2>

            <div className="flex flex-col">
                <input value={password} onChange={(e) => setPassword(e.target.value)} id="password"
                       placeholder="Questionnaire's password" name="password"
                       style={{ color: textColor, borderColor }}
                       className="bg-transparent rounded-md border-2 outline-none py-1 px-2"></input>
                <label htmlFor="password" style={{ color: textColor }} className="text-xs mt-2">Enter password
                    to
                    continue</label>
            </div>

            <div className="w-full flex justify-end">
                <AnswerButton text="Submit" onClick={() => unlock(password)} disabled={buttonDisabled} />
            </div>
        </div>
    );
};

export default PasswordProtection;