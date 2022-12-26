import {RoleName, RoleType} from "@/types/role";
import {Fragment, useState} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, Cog6ToothIcon} from "@heroicons/react/20/solid";

interface RolePickerProps {
    role: RoleType;
    disabled?: boolean;
    updateRole: (role: RoleType) => void;
}

interface RoleItem {
    id: number;
    name: RoleName;
    value: RoleType;
}

const roles: RoleItem[] = [
    {id: 1, name: RoleName.VIEW, value: RoleType.VIEW},
    {id: 2, name: RoleName.EDIT, value: RoleType.EDIT},
    {id: 3, name: RoleName.ADMIN, value: RoleType.ADMIN},
    {id: 4, name: RoleName.OWNER, value: RoleType.OWNER}
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const RolePicker = ({role, disabled = false, updateRole}: RolePickerProps) => {
    const [selected, setSelected] = useState<RoleItem>(roles.find(({value}) => value === role) || roles[0]);

    const selectRole = (roleItem: RoleItem) => {
        setSelected(roleItem);
        updateRole(roleItem.value);
    };


    return (
        <Listbox value={selected} onChange={selectRole} disabled={disabled}>
            {({open}) => (
                <>
                    <div className="relative mt-1">
                        <Listbox.Button
                            className="relative w-full cursor-default text-left sm:text-sm">
                            <span
                                className={classNames("items-center flex", !disabled ? "cursor-pointer" : "")}>{selected.name}
                                {!disabled && (<Cog6ToothIcon
                                    className="w-3 h-3 ml-2 mt-0.5"/>)}
                            </span>
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
                                {roles.map((role) => (
                                    <>
                                        {role.value !== RoleType.OWNER ? (
                                            <Listbox.Option
                                                key={role.id}
                                                className={({active}) =>
                                                    classNames(
                                                        active ? "text-white bg-indigo-600" : "text-gray-900",
                                                        "relative cursor-default select-none py-2 pl-3 pr-9"
                                                    )
                                                }
                                                value={role}
                                            >
                                                {({selected, active}) => (
                                                    <>
                                                    <span
                                                        className={selected ? "font-semibold" : "font-normal"}
                                                    >
                                                    {role.name}
                                                    </span>

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
                                        ) : <></>}
                                    </>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
};

export default RolePicker;