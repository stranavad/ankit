export interface Design {
    font: string | null;
    logoUrl: string | null;
    logoPlacement: LogoPlacement | null;
    backgroundColor: string | null;
    backgroundImage: string | null;
    optionSelectedColor: string | null;
    optionColor: string | null;
    buttonColor: string | null;
    buttonTextColor: string | null;
    textColor: string | null;
}

export enum LogoPlacement {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right'
}

export const defaultDesign: Design = {
    font: 'Inter',
    logoUrl: 'https://denevy.eu/_nuxt/img/Denevy_light.ffd40f6.svg',
    logoPlacement: LogoPlacement.LEFT,
    backgroundColor: '#CCCCCC',
    backgroundImage: null,
    optionSelectedColor: '#7b65a9',
    optionColor: '#00a8e5',
    buttonColor: '#7b65a9',
    buttonTextColor: '#ffffff',
    textColor: '#333333',
}