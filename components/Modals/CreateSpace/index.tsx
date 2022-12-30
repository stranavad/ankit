import {useState} from "react";
import Button from "@/components/Button";
import {Dialog} from "@headlessui/react";
import {CreateSpaceData} from "@/routes/space";

interface CreateSpaceFormProps {
    memberName: string;
    store: (data: CreateSpaceData) => void;
    setOpen: (data: boolean) => void;
}


const CreateSpaceModal = ({store, memberName: defaultMemberName, setOpen}: CreateSpaceFormProps) => {
    const [space, setSpace] = useState<string>("New Amazing Space");
    const [member, setMember] = useState<string>(defaultMemberName);

    const createButtonDisabled = !space || !member;

    const formSubmit = () => {
        setOpen(false);
        store({spaceName: space, memberName: member});
    };

    return (
        <>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <Dialog.Title as="h3" className="text-2xl mb-3 font-semibold">
                    Create space
                </Dialog.Title>
                <div className="mb-5">
                    <label htmlFor="spacename" className="block text-sm font-medium text-gray-700 mb-1">
                        Space Name
                    </label>
                    <input
                        value={space}
                        onChange={(e) => setSpace(e.target.value)}
                        type="text"
                        name="spacename"
                        id="spacename"
                        className="block w-full p-2 focus:border-indigo-500 focus:ring-indigo-500 rounded-md border-gray-300 pr-12 sm:text-sm"
                        placeholder="New Amazing Space"
                    />
                </div>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                    </label>
                    <input
                        value={member}
                        onChange={(e) => setMember(e.target.value)}
                        type="text"
                        name="username"
                        id="username"
                        className="block w-full p-2 focus:border-indigo-500 focus:ring-indigo-500 rounded-md border-gray-300 pr-12 sm:text-sm"
                        placeholder="New Amazing Username"
                    />
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <Button
                    type="success"
                    disabled={createButtonDisabled}
                    className="inline-flex w-full sm:ml-3 sm:w-auto justify-center  mb-2 py-1 px-3"
                    onClick={formSubmit}
                >
                    Create
                </Button>
                <Button secondary
                        className="inline-flex w-full sm:ml-3 sm:w-auto justify-center mb-2 py-1 px-3"
                        onClick={() => setOpen(false)}>
                    Cancel
                </Button>
            </div>
        </>
    );
};

export default CreateSpaceModal;