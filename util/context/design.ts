import { defaultDesign, Design } from "@/types/design";
import { createContext } from "react";

export const DesignContext = createContext<Design>(defaultDesign);