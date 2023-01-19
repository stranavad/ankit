import {Fragment, useState} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/20/solid";
import {Status, statuses} from "@/types/questionnaire";

interface StatusPickerProps {
    status: Status;
    disabled?: boolean;
    updateStatus: (status: Status) => void;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const StatusPicker = ({status, disabled=false, updateStatus}: StatusPickerProps) => {

    const getColor = (selected: Status) => {
        return `status-${selected}`;
    };

    return (
        <Listbox value={status} onChange={updateStatus} disabled={disabled}>
            {({open}) => (
                <>
                    <div className="relative">
                        <Listbox.Button
                            className={`relative w-full text-left sm:text-sm ${disabled ? 'cursor-not-allowed': 'cursor-pointer'}`}>
                            <div
                                className={classNames("capitalize inline-block py-1 px-2 rounded-xl text-xs text-white", getColor(status))}>
                                {status.toLowerCase()}
                            </div>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className="absolute z-10 mt-1 max-h-56 w-100 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {statuses.map((status, statusIndex) => (
                                    <Listbox.Option
                                        className={({active}) =>
                                            classNames(
                                                active ? "text-white bg-indigo-600" : "text-gray-900",
                                                "relative cursor-default select-none py-2 pl-3 pr-9"
                                            )
                                        }
                                        key={statusIndex}
                                        value={status}
                                    >
                                        {({selected, active}) => (
                                            <>
                                                <div
                                                    className={classNames("capitalize inline-block py-1 px-2 rounded-xl text-xs text-white cursor-pointer", getColor(status))}>
                                                    {status.toLowerCase()}
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? "text-white" : "text-indigo-600",
                                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                                     </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
};

export default StatusPicker;