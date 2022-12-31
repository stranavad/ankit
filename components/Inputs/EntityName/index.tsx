import {useState, ChangeEvent} from "react";

interface EntityNameProps {
    value: string;
    update: (data: string) => void;
    disabled?: boolean;
}

let updateTimeout: NodeJS.Timeout;

const EntityName = ({value, update}: EntityNameProps) => {
    const [name, setName] = useState<string>(value);


    const updateName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
            update(e.target.value);
        }, 500);
    };

    return (
        <input value={name} onChange={updateName}
               className="block w-full text-lg font-semibold py-2 border-transparent border-2 border-b-indigo-200 transition-all outline-none focus-visible:border-b-indigo-500 focus:ring-b-indigo-500"/>
    );
};

export default EntityName;