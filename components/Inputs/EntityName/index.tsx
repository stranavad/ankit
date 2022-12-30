interface EntityNameProps {
    value: string;
    update: (data: string) => void;
    disabled?: boolean;
}

const EntityName = ({value, update}: EntityNameProps) => {
    return (
        <input value={value} onChange={(e) => update(e.target.value)}
               className="block w-full text-lg font-semibold py-2 border-transparent border-2 border-b-indigo-200 transition-all outline-none focus-visible:border-b-indigo-500 focus:ring-b-indigo-500"/>
    );
};

export default EntityName;