interface CheckboxProps {
    checked: boolean;
    name?: string;
    update: (checked: boolean) => void;
    className?: string;
}

const Checkbox = ({checked, update, className, name}: CheckboxProps) => {
    return (
        <input type="checkbox" checked={checked} onChange={e => update(e.target.checked)} id={name || ""}
               name={name || ""}
               className={`h-4 w-4 rounded bg-transparent border-gray-300 text-indigo-500 focus:ring-indigo-500 ${className}`}/>
    );
};

export default Checkbox;