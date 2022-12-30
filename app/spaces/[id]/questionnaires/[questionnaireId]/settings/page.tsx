"use client";
import {useEffect, useState} from "react";
import {updateQuestionnaire, useQuestionnaire} from "@/routes/questionnaire";
import {DetailQuestionnaire, Status, Structure} from "@/types/questionnaire";
import QuestionnaireName from "@/components/Inputs/EntityName";
import EntityDescription from "@/components/Inputs/EntityDescription";
import SwitchInput from "@/components/Inputs/Switch";
import StatusPicker from "@/components/Pickers/StatusPicker";
import Button from "@/components/Button";

enum QuestionnaireProperty {
    NAME = "name",
    DESCRIPTION = "description",
    STATUS = "status",
    PASSWORD_PROTECTED = "passwordProtected",
    STRUCTURE = "structure"
}

type QuestionnaireUpdateProperty =
    | [QuestionnaireProperty.STATUS, Status]
    | [QuestionnaireProperty.NAME, string]
    | [QuestionnaireProperty.DESCRIPTION, string]
    | [QuestionnaireProperty.PASSWORD_PROTECTED, boolean]
    | [QuestionnaireProperty.STRUCTURE, Structure]


const QuestionnaireSettings = ({params: {questionnaireId: id}}: { params: { questionnaireId: string } }) => {
    /* PASSWORD FIELD */
    const [password, setPassword] = useState<string>("");
    const passwordSaveDisabled = !password || password.length > 50;

    const questionnaireId = parseInt(id);
    const [questionnaire, setQuestionnaire] = useState<DetailQuestionnaire | null>(null);
    const {data, mutate} = useQuestionnaire(questionnaireId);

    useEffect(() => {
        setQuestionnaire(data);
    }, [data]);

    useEffect(() => {
        setPassword(data?.password || "");
    }, [data?.password]);


    if (!questionnaire) {
        return null;
    }
    const updateProperty = (...data: QuestionnaireUpdateProperty) => {
        setQuestionnaire(q => (q ? {...q, [data[0]]: data[1]} : null));
        mutate(async () => {
            const updatedQuestionnaire = await updateQuestionnaire({[data[0]]: data[1]}, questionnaireId);
            return updatedQuestionnaire.data;
        }, {revalidate: false});
    };

    const updatePasswordProtected = (passwordProtected: boolean) => {
        if (!passwordProtected) {
            updateProperty(QuestionnaireProperty.PASSWORD_PROTECTED, false);
            return;
        }

        if (!password || password.length > 50) {
            setQuestionnaire(q =>
                q ? {...q, passwordProtected} : null
            );
            return;
        }

        mutate(async () => {
            const updatedQuestionnaire = await updateQuestionnaire({
                passwordProtected: true,
                password
            }, questionnaireId);
            return updatedQuestionnaire.data;
        }, {revalidate: false});
    };

    return (
        <div className="content">
            <div className="bg-white shadow p-5 rounded-md">
                <QuestionnaireName value={questionnaire.name}
                                   update={name => updateProperty(QuestionnaireProperty.NAME, name)}/>
                <EntityDescription/>

                {/* SETTINGS*/}
                <h2 className="mt-8 text-lg font-medium">Settings</h2>
                <div className="mt-1 mb-3 h-px bg-gray-200 w-full"/>
                <div className="flex items-center py-1 my-2">
                    <span className="mr-5 text-sm">Status</span>
                    <StatusPicker status={questionnaire.status}/>
                </div>
                <div className="flex items-center my-2">
                    <span className="mr-5 text-sm">Individual Questions</span>
                    <SwitchInput value={questionnaire.structure === Structure.INDIVIDUAL}
                                 update={bool => updateProperty(QuestionnaireProperty.STRUCTURE, bool ? Structure.INDIVIDUAL : Structure.LIST)}/>
                </div>

                {/* SECURITY */}
                <h2 className="mt-8 text-lg font-medium">Security</h2>
                <div className="mt-1 mb-3 h-px bg-gray-200 w-full"/>
                <div className="my-3">
                    <div className="flex items-center">
                        <span className="mr-5 text-sm">Password Protected</span>
                        <SwitchInput value={questionnaire.passwordProtected}
                                     update={updatePasswordProtected}/>
                    </div>
                    {questionnaire.passwordProtected ? (
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
            </div>
        </div>
    );
};

export default QuestionnaireSettings;