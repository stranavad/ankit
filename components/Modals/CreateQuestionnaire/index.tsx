import Modal from "@/components/base/Modal";
import Button from "@/components/Button";
import {CreateQuestionnaireData} from "@/routes/questionnaire";
import {usePickerSpaces} from "@/routes/space";
import {SimplePickerSpace} from "@/types/space";
import {checkSpacePermission, Permission} from "@/util/permission";
import {ReactElement, useEffect, useState} from "react";
import SpaceSearch from "./SpaceSearch";
import ModalContent from "@/components/base/Modal/content";
import ModalActions from "@/components/base/Modal/actions";

interface CreateQuestionnaireModalProps {
    store: (data: CreateQuestionnaireData, spaceId?: number) => void;
    children: (open: () => void) => ReactElement;
    withSpace?: boolean;
}

const CreateQuestionnaireModal = ({store, children, withSpace = false}: CreateQuestionnaireModalProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("New Amazing Questionnaire");
    const [selectedSpace, setSelectedSpace] = useState<SimplePickerSpace | null>(null);
    const {data, isLoading} = usePickerSpaces(withSpace && open);
    const spaces = (data || []).filter((space) => checkSpacePermission(Permission.CREATE_QUESTIONNAIRE, space.role));

    const submit = () => {
        if (!name || (!selectedSpace && withSpace)) {
            return;
        }

        setOpen(false);
        store({name}, selectedSpace?.id || undefined);
    };

    useEffect(() => {
        setSelectedSpace(data?.find((space) => space.personal) || null);
    }, [isLoading]);

    const createButtonDisabled = !name || (withSpace && !selectedSpace);


    return (
        <>
            {children(() => setOpen(true))}
            <Modal open={open} setOpen={setOpen}>
                <ModalContent>
                    <h3 className="text-2xl mb-3 font-semibold">
                        Create Questionnaire
                    </h3>
                    <div className="mb-5">
                        <label htmlFor="questionnairename" className="block text-sm font-medium text-gray-700 mb-1">
                            Questionnaire name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            name="questionnairename"
                            id="questionnairename"
                            className="block w-full p-2 focus:border-indigo-500 focus:ring-indigo-500 rounded-md border-gray-300 pr-12 sm:text-sm"
                            placeholder="New Amazing Space"
                        />
                        {data && (
                            <div className="mt-3">
                                <span
                                    className="block text-sm font-medium text-gray-700 mb-1">Questionnaire space</span>
                                <SpaceSearch spaces={spaces} space={selectedSpace} select={setSelectedSpace}/>
                            </div>
                        )}
                    </div>
                </ModalContent>
                <ModalActions>
                    <Button
                        type="success"
                        disabled={createButtonDisabled}
                        className="inline-flex w-full sm:ml-3 sm:w-auto justify-center  mb-2 py-1 px-3"
                        onClick={submit}
                    >
                        Create
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

export default CreateQuestionnaireModal;