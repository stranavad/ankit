import {useState} from "react";
import Button from "@/components/Button";
import {Dialog} from "@headlessui/react";
import {CreateQuestionnaireData} from "@/routes/questionnaire";

interface CreateQuestionnaireModalProps {
    store: (data: CreateQuestionnaireData) => void;
    setOpen: (data: boolean) => void;
}


const CreateQuestionnaireModal = ({store, setOpen}: CreateQuestionnaireModalProps) => {
    const [questionnaire, setQuestionnaire] = useState<string>("New Amazing Questionnaire");

    const createButtonDisabled = !questionnaire;

    const formSubmit = () => {
        setOpen(false);
        store({name: questionnaire});
    };

    return (
        <>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <Dialog.Title as="h3" className="text-2xl mb-3 font-semibold">
                    Create Questionnaire
                </Dialog.Title>
                <div className="mb-5">
                    <label htmlFor="questionnairename" className="block text-sm font-medium text-gray-700 mb-1">
                        Questionnaire name
                    </label>
                    <input
                        value={questionnaire}
                        onChange={(e) => setQuestionnaire(e.target.value)}
                        type="text"
                        name="questionnairename"
                        id="questionnairename"
                        className="block w-full p-2 focus:border-indigo-500 focus:ring-indigo-500 rounded-md border-gray-300 pr-12 sm:text-sm"
                        placeholder="New Amazing Space"
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

export default CreateQuestionnaireModal;