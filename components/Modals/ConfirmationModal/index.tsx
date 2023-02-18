"use client";
import Modal from "@/components/base/Modal";
import ModalActions from "@/components/base/Modal/actions";
import ModalContent from "@/components/base/Modal/content";
import Button from "@/components/Button";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ReactElement, useState } from "react";

interface ConfirmationModalProps {
    title: string;
    description: string;
    submit: () => void;
    submitButtonText?: string;
    children: (open: () => void) => ReactElement;
}

const ConfirmationModal = ({children, title, description, submit: submitProp, submitButtonText = "Confirm"}: ConfirmationModalProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const submit = () => {
        setOpen(false);
        submitProp();
    }

    return (
        <>
            {children(() => setOpen(true))}
            <Modal open={open} setOpen={setOpen}>
                <ModalContent>
                    <div className="sm:flex sm:items-start">
                        <div
                            className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true"/>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
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
    )
}

export default ConfirmationModal;