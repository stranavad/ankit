import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";
import Button from "@/components/Button";
import {ReactElement, useState} from "react";
import {Dialog} from "@headlessui/react";
import Modal from "@/components/base/Modal";
import ModalActions from "@/components/base/Modal/actions";
import ModalContent from "@/components/base/Modal/content";

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
                <ModalContent>
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
                </ModalContent>
                <ModalActions>
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
                </ModalActions>
            </Modal>
        </>
    );
};

export default ConfirmationModal;