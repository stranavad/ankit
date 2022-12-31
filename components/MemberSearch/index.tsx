import {ApplicationUser} from "@/types/user";
import {Fragment, useContext, useState, ChangeEvent} from "react";
import {Combobox, Transition} from "@headlessui/react";
import Image from "next/image";
import {SpaceContext} from "@/util/spaceContext";
import {searchUsers} from "@/routes/user";

interface MemberSearchProps {
    addUser: (user: ApplicationUser) => void;
}

let searchTimeout: NodeJS.Timeout;

const MemberSearch = ({addUser}: MemberSearchProps) => {
    const {space: {id: spaceId}} = useContext(SpaceContext);

    const [searchValue, setSearchValue] = useState<string>("");
    const [users, setUsers] = useState<ApplicationUser[]>([]);

    const getUsers = async (search: string) => {
        const users = (await searchUsers({search, notIn: [spaceId]})).data;
        setUsers(users);
    };

    const setSelected = (user: ApplicationUser) => {
        setUsers((users) => users.filter(({id}) => id !== user.id));
        addUser(user);
    };

    const search = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);

        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(async () => {
            await getUsers(e.target.value);
        }, 200);
    };

    return (
        <Combobox value={null} onChange={setSelected}>
            <div className="relative mt-1">
                <div
                    className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                        placeholder="Add new member"
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        value={searchValue}
                        onChange={search}
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
                        {users.length === 0 ? (
                            <div className="relative cursor-default select-none py-2 px-4 flex justify-center">
                                <div className="border-t-2 border-t-indigo-500 animate-spin w-6 h-6 rounded-full"/>
                                <span className="text-indigo-500 ml-4 font-semibold">
                                    Loading . . .
                                </span>
                            </div>
                        ) : (
                            users.map((user) => (
                                <Combobox.Option
                                    key={user.id}
                                    className={({active}) =>
                                        `relative cursor-default select-none py-2 px-3 ${
                                            active ? "bg-indigo-500 text-white" : "text-gray-900"
                                        }`
                                    }
                                    value={user}
                                >
                                    <div
                                        className="flex items-center">
                                        <div className="w-[30px] h-[30px] mr-3">
                                            {user.image ? (
                                                <Image src={user.image} width="30" height="30" alt="user image"
                                                       className="rounded-full"/>
                                            ) : (
                                                <div className="bg-gray-200 w-[30px] h-[30px] rounded-full"/>
                                            )}
                                        </div>
                                        {user.name}
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

export default MemberSearch;