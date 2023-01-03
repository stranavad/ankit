"use client";
import {useContext, useState} from "react";
import {SearchContext} from "@/util/context";
import {
    createQuestionnaire,
    CreateQuestionnaireData,
    deleteQuestionnaire,
    useQuestionnaires
} from "@/routes/questionnaire";
import Button from "@/components/Button";
import Modal from "@/components/base/Modal";
import CreateQuestionnaireModal from "@/components/CreateQuestionnaire";
import QuestionnairesList from "@/components/Lists/QuestionnairesList";

const Questionnaires = ({params: {id: spaceId}}: { params: { id: number } }) => {
    const {search} = useContext(SearchContext);
    const [createQuestionnaireModal, setCreateQuestionnaireModal] = useState<boolean>(false);

    const {
        data,
        mutate
    } = useQuestionnaires(spaceId);
    const questionnaires = (search ? data?.filter(({name}) => name.includes(search)) : data) || [];


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
            <Modal open={createQuestionnaireModal} setOpen={setCreateQuestionnaireModal}>
                <CreateQuestionnaireModal store={create} setOpen={setCreateQuestionnaireModal}/>
            </Modal>
            <div className="content">
                <div className="flex align-center">
                    <h2 className="text-2xl font-bold mr-5">Questionnaires</h2>
                    <Button className="text-xs py-0.5 px-2" onClick={() => setCreateQuestionnaireModal(true)}>Create
                        questionnaire</Button>
                </div>
                <QuestionnairesList questionnaires={questionnaires} removeQuestionnaire={removeQuestionnaire}/>
            </div>
        </>
    );
};

export default Questionnaires;