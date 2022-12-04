"use client";
import {useState, useEffect} from "react";
import {updateQuestionnaire, useQuestionnaire} from "@/routes/questionnaire";
import {DetailQuestionnaire, Status, Structure} from "@/types/questionnaire";
import TextArea from "@/components/base/TextArea";
import EntityName from "@/components/base/EntityName";
import StatusMenu from "@/components/StatusMenu";
import PasswordSettings from "@/components/PasswordSettings";
import StructureMenu from "@/components/StructureMenu";

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
    const questionnaireId = parseInt(id);
    const [questionnaire, setQuestionnaire] = useState<DetailQuestionnaire | null>(null);
    const {data, mutate} = useQuestionnaire(questionnaireId);

    useEffect(() => setQuestionnaire(data), [data]);


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

    return (
        <div className="content">
            <EntityName value={questionnaire.name} update={name => updateProperty(QuestionnaireProperty.NAME, name)}/>
            <StatusMenu status={questionnaire.status}
                        update={status => updateProperty(QuestionnaireProperty.STATUS, status)}/>
            <StructureMenu structure={questionnaire.structure}
                           update={structure => updateProperty(QuestionnaireProperty.STRUCTURE, structure)}/>
            <PasswordSettings passwordProtected={questionnaire.passwordProtected} password={questionnaire.password}
                              update={data => updateQuestionnaire(data, questionnaire.id)}/>
            <TextArea value={questionnaire.description || ""} title="Description" placeholder="Add description"
                      change={description => updateProperty(QuestionnaireProperty.DESCRIPTION, description)}/>
        </div>
    );
};

export default QuestionnaireSettings;