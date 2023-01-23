import {createContext} from "react";

export type TopBarItem = null | {
    title: string;
    path: string;
};

export interface TopBarContextData {
    space: TopBarItem | null;
    questionnaire: TopBarItem | null;
    setSpace: (space: TopBarItem) => void;
    setQuestionnaire: (questionnaire: TopBarItem) => void;
}

const defaultTopBarData: TopBarContextData = {
    space: null,
    questionnaire: null,
    setSpace: () => undefined,
    setQuestionnaire: () => undefined,
}

export const TopBarContext = createContext<TopBarContextData>(defaultTopBarData);