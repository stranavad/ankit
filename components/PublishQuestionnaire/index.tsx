import { checkQuestionnairePublish, publishQuestionnaire } from "@/routes/publish";
import { Popover, Transition } from "@headlessui/react";
import dayjs from "dayjs";
import { Fragment, useState } from "react";
import Button from "../Button";


const PublishQuestionnaire = ({questionnaireId, callback}: {questionnaireId: number, callback?: () => void}) => {
    const [name, setName] = useState("Today's backup");
    const [canPublish, setCanPublish] = useState<boolean>(false);
    const [lastPublish, setLastPublish] = useState<Date | null>(null)

    const publish = () => {
        setCanPublish(false);
        publishQuestionnaire(questionnaireId, {name}).then(() => {
            if(callback){
                callback();
            }
        });
    }

    const fetchStatus = () => {
        checkQuestionnairePublish(questionnaireId).then((response) => {
            setCanPublish(response.data.canPublish);
            setLastPublish(response.data.lastPublished);
        });
    }

    const disabledButton = !name || name.length > 30 || !canPublish;

    return (
        <Popover className="relative">
            <Popover.Button onClick={fetchStatus} className="text-white text-sm py-1 px-2 font-semibold rounded-md focus:outline-none focus:ring-2  focus:ring-opacity-75 bg-green-500 hover:bg-green-700 focus:ring-green-400">
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
                        <div className="mt-5 w-full flex items-center justify-between">
                            {canPublish ? (
                                <span className="text-xs font-">Last: {dayjs(lastPublish).format('DD/MM/YY H:mm')}</span>
                            ): (
                                <span className="text-xs text-red-500 font-semibold">Can't publish</span>
                            )}
                            <Popover.Button as={'div'}>
                                <Button type="success" className="py-0.5 px-1 text-sm" disabled={disabledButton} onClick={publish}>Publish</Button>
                            </Popover.Button>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

export default PublishQuestionnaire;