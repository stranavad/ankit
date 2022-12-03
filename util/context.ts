import {createContext} from "react";


export * from "./memberContext";
export * from "./spaceContext";
export * from "./questionnaireContext";

export interface SearchContextData {
    search: string;
    debouncedSearch: string;
    clear: () => void;
}

export const SearchContext = createContext<SearchContextData>({
    search: "",
    debouncedSearch: "",
    clear: () => undefined
});