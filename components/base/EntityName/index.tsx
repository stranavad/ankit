"use client";
import {useEffect, useState} from "react";
import useDebounce from "@/util/debounce";

interface EntityNameProps {
    value: string;
    debounced?: boolean;
    update: (value: string) => void;
}

const EntityName = ({value, debounced = true, update}: EntityNameProps) => {
    const [content, setContent] = useState<string>(value);
    const debouncedValue = useDebounce(content, debounced ? 300 : 0);

    useEffect(() => {
        if (value !== content) {
            update(debouncedValue);
        }
    }, [debouncedValue]);

    return (
        <input type="text" value={content} onChange={e => setContent(e.target.value)} className="entity-name"/>
    );
};

export default EntityName;