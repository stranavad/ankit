import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";
import Button from "@/components/Button";
import {ReactElement, useState} from "react";
import {Dialog} from "@headlessui/react";
import Modal from "@/components/base/Modal";

interface ConfirmationModalProps {
    title: string;
    description: string;
    submit: () => void;
    renderItem: (cb: () => void) => ReactElement;
    submitButtonText?: string;
}

const ConfirmationModal = ({
    title,
    description,
    submit: submitProp,
    renderItem,
    submitButtonText = "Proceed",
}: ConfirmationModalProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const submit = () => {
        setOpen(false);
        submitProp();
    };

    return (
        <>
            {renderItem(() => setOpen(true))}
            <Modal open={open} setOpen={setOpen}>
                <div className="bg-white px-2 pt-3 pb-2 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div
                            className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true"/>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <Dialog.Title as="h3"
                                          className="text-lg font-medium leading-6 text-gray-900">{title}</Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    {description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button
                        type="error"
                        className="inline-flex w-full sm:ml-3 sm:w-auto justify-center  mb-2 py-1 px-3"
                        onClick={submit}
                    >
                        {submitButtonText}
                    </Button>
                    <Button secondary
                            className="inline-flex w-full sm:ml-3 sm:w-auto justify-center mb-2 py-1 px-3"
                            onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default ConfirmationModal;