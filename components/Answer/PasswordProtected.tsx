import { useState } from "react";

interface PasswordProtectionProps {
    unlock: (password: string) => void;
}

const PasswordProtection = ({unlock}: PasswordProtectionProps) => {
    const [password, setPassword] = useState<string>("");

    const buttonDisabled = !password;

    return (
        <form className="bg-white dark:bg-slate-700 rounded-xl p-5">
            <h2 className="text-slate-900 dark:text-slate-100 font-semibold text-lg mb-5">This questionnaire is password protected</h2>

            <div className="flex flex-col">
                <input value={password} onChange={(e) => setPassword(e.target.value) } id="password" placeholder="Questionnaire's password" name="password" type="password" className="bg-transparent text-slate-800 dark:text-slate-100 rounded-md border border-slate-200 outline-none py-1"/>
                <label htmlFor="password" className="text-xs text-slate-800 dark:text-slate-100 mt-2">Enter password to continue</label>
            </div>

            <div className="w-full flex justify-end">
                <button type="submit" onClick={(e) => {e.preventDefault(); unlock(password)}} disabled={buttonDisabled} className={`${buttonDisabled ? 'cursor-not-allowed bg-gray-800 text-slate-400' : 'text-slate-100 bg-gray-900 hover:bg-gray-800 hover:text-slate-400'}  text-sm py-2 px-3 rounded-md font-medium transition-colors duration-100`}>Continue</button>
            </div>
        </form>
    )
}

export default PasswordProtection;