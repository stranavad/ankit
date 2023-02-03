"use client";
import {useState, lazy, Suspense, useContext} from "react";
import {
    createQuestionnaire,
    CreateQuestionnaireData,
    deleteQuestionnaire,
    updateQuestionnaire,
    useQuestionnaires
} from "@/routes/questionnaire";
import Button from "@/components/Button";
import { checkSpacePermission, Permission } from "@/util/permission";
import { MemberContext } from "@/util/memberContext";
import { Status } from "@/types/questionnaire";

const QuestionnairesList = lazy(() => import("@/components/Lists/QuestionnairesList"))
const CreateQuestionnaireModal = lazy(() => import("@/components/Modals/CreateQuestionnaire"))

const Questionnaires = ({params: {id: spaceId}}: { params: { id: number } }) => {
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

    const updateQuestionnaireStatus = (status: Status, id: number) => {
        mutate(async(questionnaires) => {
            const updatedQuestionnaire = (await updateQuestionnaire({status}, id)).data;

            return questionnaires?.map((questionnaire) => questionnaire.id === id ? updatedQuestionnaire : questionnaire);
        }, {revalidate: false,
        optimisticData: questionnaires.map((questionnaire) => questionnaire.id === id ? {...questionnaire, status} : questionnaire)})
    }

    const {member} = useContext(MemberContext);
    const createQuestionnaireDisabled = !checkSpacePermission(Permission.CREATE_QUESTIONNAIRE, member.role);

    return (
        <>
            <div className="content">
                <div className="flex align-center">
                    <h2 className="text-2xl font-bold mr-5">Questionnaires</h2>
                    {!createQuestionnaireDisabled && (
                        <Suspense>
                            <CreateQuestionnaireModal store={create} withSpace={false}>
                                {(open) => (
                                    <Button className="text-xs py-0.5 px-2" onClick={open}>Create
                                    questionnaire</Button>
                                )}
                            </CreateQuestionnaireModal>
                        </Suspense>
                    )}
                </div>
                <Suspense>
                    <QuestionnairesList questionnaires={questionnaires} removeQuestionnaire={removeQuestionnaire} updateStatus={updateQuestionnaireStatus}/>
                </Suspense>
            </div>
        </>
    );
};

export default Questionnaires;