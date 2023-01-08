import {Fragment, JSXElementConstructor} from "react";
import {QuestionType} from "@/types/questionnaire";
import {Menu, Transition} from "@headlessui/react";
import {PencilSquareIcon, PlusIcon, CheckCircleIcon, ListBulletIcon} from "@heroicons/react/24/outline";

const AddQuestion = ({add}: { add: (type: QuestionType) => void }) => {

    const onSelect = (type: QuestionType) => {
        add(type);
    };

    const types: { title: string, action: () => void, icon: JSXElementConstructor<any> }[] = [
        {
            title: "Select",
            action: () => onSelect(QuestionType.SELECT),
            icon: CheckCircleIcon
        },
        {
            title: "Multi Select",
            action: () => onSelect(QuestionType.MULTI_SELECT),
            icon: ListBulletIcon
        },
        {
            title: "Text",
            action: () => onSelect(QuestionType.TEXT),
            icon: PencilSquareIcon
        }
    ];

    return (
        <div className="w-full flex justify-center my-4">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button
                        className="inline-flex text-sm p-1 rounded-full hover:text-white hover:bg-indigo-500 bg-white transition-colors duration-100">
                        <PlusIcon className="h-6 w-6"/>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="absolute overflow-auto left-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="">
                            {types.map((type, index) => (
                                <Menu.Item key={index}>
                                    {({active}) => (
                                        <button
                                            className={`${
                                                active ? "bg-indigo-600 text-white" : "text-gray-900"
                                            } flex w-full items-center px-2 py-2 text-sm`}
                                            onClick={type.action}
                                        >
                                            <type.icon className="h-5 w-5 mr-3"/>
                                            {type.title}
                                        </button>
                                    )}
                                </Menu.Item>

                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default AddQuestion;