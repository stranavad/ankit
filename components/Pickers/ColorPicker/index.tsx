import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { HexColorPicker, HexColorInput } from "react-colorful";

interface ColorPickerProps {
    color: string;
    setColor: (color: string) => void;
    label: string;
}

const ColorPicker = ({ color, setColor, label }: ColorPickerProps) => {

    return (
        <Popover>
            <Popover.Button style={{ width: "200px" }} className="flex flex-col items-start">
                <span className="text-sm text-slate-800 mb-1">{label}</span>
                <div className="flex items-center w-full border-2 border-slate-200 rounded-lg">
                    <div style={{ backgroundColor: color }}
                         className="w-12 py-4 rounded-l-md border-r-2 border-slate-200" />
                    <span
                        className="block w-full px-2 py-1 text-sm rounded-r-md">
                        {color.toUpperCase()}
                    </span>
                </div>
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute z-10">
                    <div className="color-picker shadow-xl bg-slate-100 dark:bg-slate-800 rounded-md w-[200px] p-3">
                        <HexColorInput prefixed={true} color={color.toUpperCase()} onChange={setColor}
                                       className="block w-full bg-transparent text-slate-900 dark:text-slate-100 p-1 border-2 border-indigo-500 rounded-md pr-12 sm:text-sm" />
                        <HexColorPicker color={color} onChange={setColor} />
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
};

export default ColorPicker;