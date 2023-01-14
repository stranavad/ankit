"use client";
import {lazy, Suspense} from "react";
import {
    deleteQuestionnaire,
    updateQuestionnaire,
    UpdateQuestionnaireData,
    useQuestionnaire
} from "@/routes/questionnaire";
import {Structure} from "@/types/questionnaire";
import QuestionnaireName from "@/components/Inputs/EntityName";
import EntityDescription from "@/components/Inputs/EntityDescription";
import SwitchInput from "@/components/Inputs/Switch";
import StatusPicker from "@/components/Pickers/StatusPicker";
import {useRouter} from "next/navigation";
import Button from "@/components/Button";
import QuestionnaireSecurity from "@/components/QuestionnaireSecurity";

const ConfirmationModal = lazy(() => import("@/components/Modals/ConfirmationModal"))
const PublishedQuestionnairesList = lazy(() => import("@/components/Lists/PublishedQuestionnairesList"))

const QuestionnaireSettings = ({params: {questionnaireId: id}}: { params: { questionnaireId: string } }) => {
    const questionnaireId = parseInt(id);
    const {data: questionnaire, mutate} = useQuestionnaire(questionnaireId);
    const router = useRouter();

    const updateFunction = async (data: UpdateQuestionnaireData) => {
        return (await updateQuestionnaire(data, questionnaireId)).data;
    };

    if (!questionnaire) {
        return;
    }
    const updatePasswordProtected = (passwordProtected: boolean, password: string) => {
        if (!passwordProtected) {
            mutate(() => updateFunction({passwordProtected}), {
                revalidate: false,
                optimisticData: {...questionnaire, passwordProtected}
            });
            return;
        }

        mutate(() => updateFunction({passwordProtected, password}),
            {revalidate: false, optimisticData: {...questionnaire, passwordProtected}});
    };


    const updateDescription = (description: string) => {
        mutate(() => updateFunction({description}), {
            revalidate: false,
            optimisticData: {...questionnaire, description}
        });
    };

    const updateName = (name: string) => {
        mutate(() => updateFunction({name}), {revalidate: false, optimisticData: ({...questionnaire, name})});
    };

    const updateStructure = (bool: boolean) => {
        const structure = bool ? Structure.INDIVIDUAL : Structure.LIST;
        mutate(() => updateFunction({structure}), {
            revalidate: false,
            optimisticData: {...questionnaire, structure}
        });
    };

    const removeQuestionnaire = async () => {
        const spaceId = questionnaire.spaceId;
        await deleteQuestionnaire(questionnaireId);
        router.push(`/spaces/${spaceId}`);
    };

    return (
        <div className="content">
            <div className="bg-white p-5 rounded-md">
                <QuestionnaireName value={questionnaire.name}
                                   update={updateName}/>
                <div className="flex items-center py-1 my-2">
                    <span className="mr-5 text-sm">Status</span>
                    <StatusPicker status={questionnaire.status}/>
                </div>
                <EntityDescription value={questionnaire.description || ""} update={updateDescription}/>

                {/* SETTINGS*/}
                <h2 className="mt-10 text-lg font-medium">Settings</h2>
                <div className="mt-1 mb-3 h-px bg-gray-200 w-full"/>
                <div className="flex items-center my-2">
                    <span className="mr-5 text-sm">Individual Questions</span>
                    <SwitchInput value={questionnaire.structure === Structure.INDIVIDUAL}
                                 update={updateStructure}/>
                </div>

                {/* SECURITY */}
                <QuestionnaireSecurity passwordProtected={questionnaire.passwordProtected} update={updatePasswordProtected}/>

                {/* ADVANCED */}
                <h2 className="mt-10 text-lg font-medium">Advanced</h2>
                <div className="mt-1 mb-3 h-px bg-gray-200 w-full"/>

                <div className="flex items-center my-3">
                    <span className="mr-5 text-sm">Delete this questionnaire</span>
                    <Suspense>
                        <ConfirmationModal title={"Do you really want to delete this questionnaire?"}
                                        description={"This action is irreversible and you will loose all your data"}
                                        submit={removeQuestionnaire}
                                        renderItem={openModal => <Button secondary type="error"
                                                                            className="py-1 px-2 text-xs"
                                                                            onClick={openModal}>Delete</Button>}/>
                    </Suspense>
                </div>

                {/* SETTINGS*/}
                <Suspense>
                    <PublishedQuestionnairesList questionnaireId={questionnaireId}/>
                </Suspense>
            </div>
        </div>
    );
};

export default QuestionnaireSettings;