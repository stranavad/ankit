import useDebounce from "@/util/debounce";
import {useEffect, useState} from "react";

interface QuestionTitleProps {
    title: string;
    update: (title: string) => void;
}

const QuestionTitle = ({title, update}: QuestionTitleProps) => {
    const [value, setValue] = useState<string>(title);
    const debouncedValue = useDebounce(value, 1000);

    useEffect(() => {
        if (value !== title) {
            update(value);
        }
    }, [debouncedValue]);

    return <input type="text" className="text question-title" value={value}
                  onChange={(e) => setValue(e.target.value)}/>;
};

export default QuestionTitle;