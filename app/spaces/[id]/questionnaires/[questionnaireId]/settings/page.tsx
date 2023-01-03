"use client";
import {useEffect, useState} from "react";
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
import Button from "@/components/Button";
import ConfirmationModal from "@/components/Modals/ConfirmationModal";
import {useRouter} from "next/navigation";

const QuestionnaireSettings = ({params: {questionnaireId: id}}: { params: { questionnaireId: string } }) => {
    const questionnaireId = parseInt(id);
    const {data: questionnaire, mutate, isLoading} = useQuestionnaire(questionnaireId);
    const router = useRouter();

    /* PASSWORD FIELD */
    const [passwordProtected, setPasswordProtected] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const passwordSaveDisabled = !password || password.length > 50 || questionnaire?.password === password;


    useEffect(() => {
        // Will run only after first questionnaire is fetched
        if (questionnaire && !isLoading) {
            setPasswordProtected(questionnaire.passwordProtected);
            setPassword(questionnaire.password || "");
        }
    }, [isLoading]);

    const updateFunction = async (data: UpdateQuestionnaireData) => {
        return (await updateQuestionnaire(data, questionnaireId)).data;
    };

    if (!questionnaire) {
        return;
    }
    const updatePasswordProtected = (passwordProtected: boolean) => {
        setPasswordProtected(passwordProtected);

        if (!passwordProtected) {
            mutate(() => updateFunction({passwordProtected}), {
                revalidate: false,
                optimisticData: {...questionnaire, passwordProtected}
            });
            return;
        }

        if (!password || password.length > 50) {
            return;
        }

        mutate(() => updateFunction({passwordProtected, password}),
            {revalidate: false, optimisticData: {...questionnaire, password, passwordProtected}});
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
            <div className="bg-white shadow p-5 rounded-md">
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
                <h2 className="mt-10 text-lg font-medium">Security</h2>
                <div className="mt-1 mb-3 h-px bg-gray-200 w-full"/>
                <div className="my-3">
                    <div className="flex items-center">
                        <span className="mr-5 text-sm">Password Protected</span>
                        <SwitchInput value={passwordProtected}
                                     update={updatePasswordProtected}/>
                    </div>
                    {passwordProtected ? (
                        <div className="flex items-center mt-5">
                            <span className="mr-5 text-sm">Password</span>
                            <input type="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   className="block w-72 p-1 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm mr-3"
                                   placeholder="New password"/>

                            <Button disabled={passwordSaveDisabled} className="px-2 py-[3px] text-sm"
                                    onClick={() => updatePasswordProtected(true)}>Save</Button>
                        </div>
                    ) : (<></>)}
                </div>

                {/* ADVANCED */}
                <h2 className="mt-10 text-lg font-medium">Advanced</h2>
                <div className="mt-1 mb-3 h-px bg-gray-200 w-full"/>
                {/*<div className="flex items-center my-3">*/}
                {/*    <span className="mr-5 text-sm">Transfer to another space</span>*/}
                {/*    <ConfirmationModal title={"Do you really want to transfer this questionnaire to another space?"}*/}
                {/*                       description={"This action is irreversible"}*/}
                {/*                       submit={() => console.log("Deleting questionnaire")}*/}
                {/*                       renderItem={openModal => <Button secondary type="warning"*/}
                {/*                                                        className="py-1 px-2 text-xs"*/}
                {/*                                                        onClick={openModal}>Transfer to another*/}
                {/*                           space</Button>}/>*/}
                {/*</div>*/}
                <div className="flex items-center my-3">
                    <span className="mr-5 text-sm">Delete this questionnaire</span>
                    <ConfirmationModal title={"Do you really want to delete this questionnaire?"}
                                       description={"This action is irreversible and you will loose all your data"}
                                       submit={removeQuestionnaire}
                                       renderItem={openModal => <Button secondary type="error"
                                                                        className="py-1 px-2 text-xs"
                                                                        onClick={openModal}>Delete</Button>}/>
                </div>
            </div>
        </div>
    );
};

export default QuestionnaireSettings;