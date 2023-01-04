import {useState, ChangeEvent} from "react";

interface EntityDescriptionProps {
    value: string | null;
    update: (data: string) => void;
}

let updateTimeout: NodeJS.Timeout;

const EntityDescription = ({value, update}: EntityDescriptionProps) => {
    const [description, setDescription] = useState<string>(value || "");


    const updateDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);

        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
            update(e.target.value);
        }, 1500);
    };

    return (
        <div className="mt-3">
            <label htmlFor="description" className="text-sm">Description</label>
            <textarea
                value={description}
                onChange={updateDescription}
                id="description"
                name="description"
                className="block w-full bg-transparent rounded-md max-h-[200px] min-h-[45px] border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Add description (optional)"/>
        </div>
    );
};

export default EntityDescription;