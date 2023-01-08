import { publishQuestionnaire } from "@/routes/publish";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "../Button";


const PublishQuestionnaire = ({questionnaireId, disabled, setPublished}: {questionnaireId: number, disabled: boolean, setPublished: (value: boolean) => void}) => {
    const [name, setName] = useState("Today's backup");

    const publish = () => {
        setPublished(true);
        publishQuestionnaire(questionnaireId, {name});
    }

    const disabledButton = !name || name.length > 30;

    return (
        <Popover className="relative">
            <Popover.Button disabled={disabled} className={`text-white text-sm py-1 px-2 font-semibold rounded-md focus:outline-none focus:ring-2  focus:ring-opacity-75 ${disabled ? "bg-gray-300 text-gray-400 shadow-none cursor-not-allowed" : "bg-green-500 hover:bg-green-700 focus:ring-green-400"}`}>
                Publish
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
                <Popover.Panel className="absolute z-10 right-0">
                    <div className="rounded-md shadow-md p-3 bg-white w-60">
                        <h3 className="text-md font-medium mb-2">Publish Name</h3>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="block text-sm py-1 px-2 w-full outline-none border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500  rounded-md"/>
                        <div className="mt-5 w-full flex justify-end">
                            <Popover.Button as={'div'}>
                                <Button type="success" className="py-0.5 px-1 text-sm" disabled={disabledButton || disabled} onClick={publish}>Publish</Button>
                            </Popover.Button>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
      )
}

export default PublishQuestionnaire;