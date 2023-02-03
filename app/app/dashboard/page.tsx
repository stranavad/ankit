"use client";
import Button from "@/components/Button";
import { createQuestionnaire, CreateQuestionnaireData, deleteQuestionnaire, useDashboardQuestionnaires } from "@/routes/questionnaire";
import { Suspense, lazy } from "react";

const CreateQuestionnaireModal = lazy(() => import('@/components/Modals/CreateQuestionnaire'));
const DashboardList = lazy(() => import('@/components/Lists/DashboardList'));

const UserDashboard = () => {
    const {data, mutate} =  useDashboardQuestionnaires();
    const questionnaires = data || [];

    const removeQuestionnaire = async (id: number) => {
        await deleteQuestionnaire(id);
        mutate();
    };

    const create = async (data: CreateQuestionnaireData, spaceId?: number) => {
        if(!spaceId){
            return;
        }

        await createQuestionnaire(data, spaceId);
        mutate();
    }

    return (
        <div className="content">
            <div className="flex align-center">
                <h2 className="text-2xl font-bold mr-5">Dashboard</h2>
                <Suspense>
                    <CreateQuestionnaireModal store={create} withSpace={true}>
                        {(open) => (
                            <Button className="text-xs py-0.5 px-2" onClick={open}>Create
                            questionnaire</Button>
                        )}
                    </CreateQuestionnaireModal>
                </Suspense>
            </div>
            <Suspense>
                <DashboardList questionnaires={questionnaires} removeQuestionnaire={removeQuestionnaire}/>
            </Suspense>
        </div>
    )
};

export default UserDashboard;