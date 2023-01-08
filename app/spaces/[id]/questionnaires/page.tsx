"use client";
import {useState, lazy, Suspense} from "react";
import {
    createQuestionnaire,
    CreateQuestionnaireData,
    deleteQuestionnaire,
    useQuestionnaires
} from "@/routes/questionnaire";
import Button from "@/components/Button";

const QuestionnairesList = lazy(() => import("@/components/Lists/QuestionnairesList"))
const Modal = lazy(() => import("@/components/base/Modal"))
const CreateQuestionnaireModal = lazy(() => import("@/components/CreateQuestionnaire"))

const Questionnaires = ({params: {id: spaceId}}: { params: { id: number } }) => {
    const [createQuestionnaireModal, setCreateQuestionnaireModal] = useState<boolean>(false);

    const {
        data,
        mutate
    } = useQuestionnaires(spaceId);
    const questionnaires = data || [];


    const create = (data: CreateQuestionnaireData) => {
        mutate(async (questionnaires) => {
            const newQuestionnaire = await createQuestionnaire(data, spaceId);
            return [newQuestionnaire.data, ...questionnaires || []];
        });
    };

    const removeQuestionnaire = async (id: number) => {
        await deleteQuestionnaire(id);
        mutate();
    };


    return (
        <>
        <Suspense>
            <Modal open={createQuestionnaireModal} setOpen={setCreateQuestionnaireModal}>
                <CreateQuestionnaireModal store={create} setOpen={setCreateQuestionnaireModal}/>
            </Modal>
        </Suspense>
            <div className="content">
                <div className="flex align-center">
                    <h2 className="text-2xl font-bold mr-5">Questionnaires</h2>
                    <Button className="text-xs py-0.5 px-2" onClick={() => setCreateQuestionnaireModal(true)}>Create
                        questionnaire</Button>
                </div>
                <Suspense>
                    <QuestionnairesList questionnaires={questionnaires} removeQuestionnaire={removeQuestionnaire}/>
                </Suspense>
            </div>
        </>
    );
};

export default Questionnaires;