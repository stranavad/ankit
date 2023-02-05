import IconButton from "@/components/Button/IconButton";
import PublishQuestionnaire from "@/components/PublishQuestionnaire";
import {
    getPublishedQuestionnaire,
    updatePublishedQuestionnaire,
    usePublishedQuestionnaires
} from "@/routes/publish";
import {FolderArrowDownIcon} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import Name from "./name";

const PublishedQuestionnairesList = ({questionnaireId}: { questionnaireId: number }) => {
    const {data, mutate} = usePublishedQuestionnaires(questionnaireId);

    if (!data) {
        return null;
    }

    const updateName = (id: number, name: string) => {
        updatePublishedQuestionnaire(questionnaireId, id, {name});
        mutate(async (questionnaires) => {
            const updated = (await updatePublishedQuestionnaire(questionnaireId, id, {name})).data;
            return questionnaires?.map(questionnaire => questionnaire.id === id ? updated : questionnaire);
        }, {revalidate: false});
    };

    const downloadPublishedQuestionnaire = async (id: number) => {
        const data = (await getPublishedQuestionnaire(questionnaireId, id)).data;
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        const dlAnchorElem = document.createElement("a");
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "release.json");
        dlAnchorElem.click();
    };

    return (
        <>
            <div className="w-full flex justify-between mt-10">
                <h2 className="text-lg font-medium">Published Versions</h2>
                <PublishQuestionnaire questionnaireId={questionnaireId} callback={mutate}/>
            </div>
            <div className="table border-collapse table-auto w-full text-sm mt-5">
                <div className="table-header-group">
                    <div className="table-row">
                        <div
                            className="table-cell border-b font-medium p-4 pl-2 pt-0 pb-3 text-slate-400  text-left">Name
                        </div>
                        <div
                            className="hidden md:table-cell border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">Publisher
                        </div>
                        <div
                            className="table-cell border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">Date
                            Published
                        </div>
                        <div
                            className="table-cell border-b font-medium p-4 pr-2 pt-0 pb-3 text-slate-400 text-left">Actions
                        </div>
                    </div>
                </div>
                <div className="table-row-group bg-white">
                    {data.map((questionnaire) => (
                        <div className="table-row" key={questionnaire.id}>
                            <Name updateName={updateName} questionnaire={questionnaire}/>
                            <div
                                className="hidden md:table-cell border-b border-slate-100 p-4 text-slate-500 align-middle">
                                {questionnaire.publisher.name}
                            </div>
                            <div
                                className="table-cell border-b border-slate-100  p-4 text-slate-500">
                                <>{dayjs(questionnaire.publishedAt).format("DD/MM/YY H:mm")}</>
                            </div>
                            <div
                                className="table-cell border-b border-slate-100  p-4 pr-2 text-slate-500">
                                <IconButton icon={FolderArrowDownIcon} size="medium" color="primary"
                                            onClick={() => downloadPublishedQuestionnaire(questionnaire.id)}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PublishedQuestionnairesList;