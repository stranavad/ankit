import {Switch} from "@headlessui/react";

interface SwitchInputProps {
    value: boolean;
    update: (data: boolean) => void;
    disabled?: boolean;
}

const SwitchInput = ({value, update, disabled=false}: SwitchInputProps) => {
    return (
        <Switch
            checked={value}
            disabled={disabled}
            onChange={update}
            className={`${value ? "bg-indigo-500" : "bg-indigo-200"}
          relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={`${value ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
    );
};

export default SwitchInput;