import { SimplePickerSpace } from "@/types/space";
import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface SpaceSearchProps {
    spaces: SimplePickerSpace[];
    space: SimplePickerSpace | null;
    select: (space: SimplePickerSpace) => void;
}

const SpaceSearch = ({ spaces, space, select }: SpaceSearchProps) => {
    const [search, setSearch] = useState<string>("");

    const filteredSpaces = spaces.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));

    return (
        <Combobox value={space} onChange={select}>
            <div className="relative mt-1">
                <div
                    className="relative w-full cursor-default  rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                        placeholder="Create in space"
                        className="w-full border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-md p-2 pr-10 text-sm leading-5 text-gray-900"
                        onChange={(e) => setSearch(e.target.value)}
                        displayValue={(space: SimplePickerSpace | null) => space?.name || ""}
                    />
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Combobox.Options
                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md z-10 bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredSpaces.length === 0 ? (
                            <div className="relative cursor-default select-none py-2 px-4 flex justify-center">
                                <div className="border-t-2 border-t-indigo-500 animate-spin w-6 h-6 rounded-full" />
                                <span className="text-indigo-500 ml-4 font-semibold">
                                    Loading . . .
                                </span>
                            </div>
                        ) : (
                            filteredSpaces.map((space) => (
                                <Combobox.Option
                                    key={space.id}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 px-3 ${
                                            active ? "bg-indigo-500 text-white" : "text-gray-900"
                                        }`
                                    }
                                    value={space}
                                >
                                    <div
                                        className="flex items-center">
                                        {space.name}
                                    </div>
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
};

export default SpaceSearch;