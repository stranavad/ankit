"use client";
import Button from "@/components/Button";
import {
    createQuestionnaire,
    CreateQuestionnaireData,
    deleteQuestionnaire,
    useDashboardQuestionnaires
} from "@/routes/questionnaire";
import {Suspense, lazy} from "react";
import PageHeader from "@/components/Utils/PageHeader";
import Content from "@/components/Utils/Content";

const CreateQuestionnaireModal = lazy(() => import("@/components/Modals/CreateQuestionnaire"));
const DashboardList = lazy(() => import("@/components/Lists/DashboardList"));

const UserDashboard = () => {
    const {data, mutate} = useDashboardQuestionnaires();
    const questionnaires = data || [];

    const removeQuestionnaire = async (id: number) => {
        await deleteQuestionnaire(id);
        mutate();
    };

    const create = async (data: CreateQuestionnaireData, spaceId?: number) => {
        if (!spaceId) {
            return;
        }

        await createQuestionnaire(data, spaceId);
        mutate();
    };

    return (
        <Content>
            <PageHeader title="Dashboard">
                <Suspense>
                    <CreateQuestionnaireModal store={create} withSpace={true}>
                        {(open) => (
                            <Button className="text-xs p-2" onClick={open}>Create
                                questionnaire</Button>
                        )}
                    </CreateQuestionnaireModal>
                </Suspense>
            </PageHeader>

            <Suspense>
                <DashboardList questionnaires={questionnaires} removeQuestionnaire={removeQuestionnaire}/>
            </Suspense>
        </Content>
    );
};

export default UserDashboard;