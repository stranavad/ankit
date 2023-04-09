export interface Design {
    font: string | null;
    logoUrl: string | null;
    logoPlacement: LogoPlacement | null;
    backgroundColor: string | null;
    backgroundImage: string | null;
    optionSelectedColor: string | null;
    optionSelectedText: string | null;
    optionColor: string | null;
    optionText: string | null;
    buttonColor: string | null;
    buttonText: string | null;
    textColor: string | null;
}

export enum LogoPlacement {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right"
}

type NoNullDesign = {
    [K in keyof Design]: NonNullable<Design[K]>
}

export const defaultDesign: NoNullDesign = {
    font: "Inter",
    logoUrl: "https://denevy.eu/_nuxt/img/Denevy_light.ffd40f6.svg",
    logoPlacement: LogoPlacement.LEFT,
    backgroundColor: "#CCCCCC",
    backgroundImage: "",
    optionSelectedColor: "#3b82f6",
    optionSelectedText: "#f2022e",
    optionColor: "#e2e8f0",
    optionText: "#52f202",
    buttonColor: "#7b65a9",
    buttonText: "#ffffff",
    textColor: "#0f172a"
};