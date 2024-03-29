"use client";
import { lazy, useContext } from "react";
import {
    deleteQuestionnaire,
    updateQuestionnaire,
    UpdateQuestionnaireData,
    useQuestionnaire
} from "@/routes/questionnaire";
import { Status, Structure } from "@/types/questionnaire";
import EntityName from "@/components/Inputs/EntityName";
import EntityDescription from "@/components/Inputs/EntityDescription";
import SwitchInput from "@/components/Inputs/Switch";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { checkSpacePermission, Permission } from "@/util/permission";
import { MemberContext } from "@/util/memberContext";
import { getSpaceLink } from "@/util/url";
import PageHeader from "@/components/Utils/PageHeader";
import PageCard from "@/components/Utils/PageCard";
import ShareButton from "@/components/Sharing/ShareButton";
import Content from "@/components/Utils/Content";

const StatusPicker = lazy(() => import("@/components/Pickers/StatusPicker"));
const SharingCentre = lazy(() => import("@/components/Sharing"));
const QuestionnaireSecurity = lazy(() => import("@/components/QuestionnaireSecurity"));
const ConfirmationModal = lazy(() => import("@/components/Modals/ConfirmationModal"));
const PublishedQuestionnairesList = lazy(() => import("@/components/Lists/PublishedQuestionnairesList"));

const QuestionnaireSettings = ({ params: { questionnaireId: id } }: { params: { questionnaireId: string } }) => {
    const questionnaireId = parseInt(id);
    const { data: questionnaire, mutate } = useQuestionnaire(questionnaireId);
    const { member } = useContext(MemberContext);
    const router = useRouter();

    const updateFunction = async (data: UpdateQuestionnaireData) => {
        return (await updateQuestionnaire(data, questionnaireId)).data;
    };

    if (!questionnaire) {
        return;
    }
    const updatePasswordProtected = (passwordProtected: boolean, password: string) => {
        if (!passwordProtected) {
            mutate(() => updateFunction({ passwordProtected }), {
                revalidate: false,
                optimisticData: { ...questionnaire, passwordProtected }
            });
            return;
        }

        mutate(() => updateFunction({ passwordProtected, password }),
            { revalidate: false, optimisticData: { ...questionnaire, passwordProtected } });
    };


    const updateDescription = (description: string) => {
        mutate(() => updateFunction({ description }), {
            revalidate: false,
            optimisticData: { ...questionnaire, description }
        });
    };

    const updateStatus = (status: Status) => {
        mutate(() => updateFunction({ status }), {
            revalidate: false,
            optimisticData: { ...questionnaire, status }
        });
    };

    const updateName = (name: string) => {
        mutate(() => updateFunction({ name }), { revalidate: false, optimisticData: ({ ...questionnaire, name }) });
    };

    const updateStructure = (bool: boolean) => {
        const structure = bool ? Structure.INDIVIDUAL : Structure.LIST;
        mutate(() => updateFunction({ structure }), {
            revalidate: false,
            optimisticData: { ...questionnaire, structure }
        });
    };

    const updateManualPublish = (manualPublish: boolean) => {
        mutate(() => updateFunction({ manualPublish }), {
            revalidate: false,
            optimisticData: { ...questionnaire, manualPublish }
        });
    };

    const removeQuestionnaire = async () => {
        const spaceId = questionnaire.spaceId;
        await deleteQuestionnaire(questionnaireId);
        router.push(getSpaceLink(spaceId));
    };

    const updateUrl = (url: string) => {
        mutate(() => updateFunction({ url }), { revalidate: false, optimisticData: ({ ...questionnaire, url }) });
    };

    const updateNameDisabled = !checkSpacePermission(Permission.UPDATE_QUESTIONNAIRE_NAME, member.role);
    const updateDisabled = !checkSpacePermission(Permission.UPDATE_QUESTIONNAIRE, member.role);
    const deleteDisabled = !checkSpacePermission(Permission.DELETE_QUESTIONNAIRE, member.role);

    return (
        <Content>
            <PageHeader title="Settings">
                <ShareButton questionnaire={questionnaire} />
            </PageHeader>
            <PageCard className="mb-10">
                <EntityName value={questionnaire.name}
                            update={updateName} disabled={updateNameDisabled} />
                <div className="flex items-center py-1 my-2">
                    <span className="mr-5 text-sm">Status</span>
                    <StatusPicker status={questionnaire.status} disabled={updateDisabled} updateStatus={updateStatus} />
                </div>
                <EntityDescription disabled={updateNameDisabled} value={questionnaire.description || ""}
                                   update={updateDescription} />

                {/* SETTINGS*/}
                <SharingCentre questionnaire={questionnaire} updateUrl={updateUrl} />

                <h2 className="mt-10 text-lg font-medium">Settings</h2>
                <div className="mt-1 mb-3 h-px bg-gray-200 w-full" />
                <div className="flex items-center my-2">
                    <span className="mr-5 text-sm">Individual Questions</span>
                    <SwitchInput value={questionnaire.structure === Structure.INDIVIDUAL}
                                 update={updateStructure} disabled={updateDisabled} />
                </div>

                {/* SECURITY */}
                <QuestionnaireSecurity disabled={updateDisabled} passwordProtected={questionnaire.passwordProtected}
                                       update={updatePasswordProtected} />

                {/* ADVANCED */}
                <h2 className="mt-10 text-lg font-medium">Advanced</h2>
                <div className="mt-1 mb-3 h-px bg-gray-200 w-full" />

                <div className="flex items-center my-3">
                    <span className="mr-5 text-sm">Manual staging control</span>
                    <SwitchInput value={questionnaire.manualPublish}
                                 update={updateManualPublish} disabled={updateDisabled} />
                </div>

                <div className="flex items-center my-3">
                    <span className="mr-5 text-sm">Delete this questionnaire</span>
                    <ConfirmationModal
                        title={"Do you really want to delete this questionnaire?"}
                        description={"This action is irreversible and you will loose all your data"}
                        submit={removeQuestionnaire}
                    >
                        {open => (
                            <Button secondary type="error"
                                    disabled={deleteDisabled}
                                    className="py-1 px-2 text-xs"
                                    onClick={open}>Delete</Button>
                        )}
                    </ConfirmationModal>
                </div>

                {/* SETTINGS*/}
                {questionnaire.manualPublish && (
                    <PublishedQuestionnairesList questionnaireId={questionnaireId} />
                )}
            </PageCard>
        </Content>
    );
};

export default QuestionnaireSettings;