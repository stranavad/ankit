import { defaultDesign, Design } from "@/types/design";
import { DesignContext } from "@/util/context/design";
import { useContext } from "react";

export default function useDesign(key: keyof Design, designSource?: Design): string {
    if (designSource) {
        return designSource[key] ?? defaultDesign[key];
    }

    const design = useContext(DesignContext);
    return design[key] ?? defaultDesign[key];
}