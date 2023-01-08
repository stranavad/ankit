import Button from "@/components/Button";
import IconButton from "@/components/Button/IconButton";
import { PublishedQuestionnaire } from "@/types/publish"
import { MemberContext } from "@/util/memberContext";
import { checkSpacePermission, Permission } from "@/util/permission";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";

const Name = ({questionnaire, updateName}: {questionnaire: PublishedQuestionnaire, updateName: (id: number, name: string) => void}) => {
    const [name, setName] = useState<string>(questionnaire.name);
    const {member} = useContext(MemberContext);

    const save = () => updateName(questionnaire.id, name);

    const close = () => setName(questionnaire.name);

    const saveDisabled = !name || name.length > 30;

    return (
        <div
        className="table-cell border-b border-slate-100 p-4 pl-2 text-slate-500">
        <div className="w-full flex justify-between">
            <input disabled={!checkSpacePermission(Permission.UPDATE_PUBLISHED_QUESTIONNAIRE_NAME, member.role)} value={name} onChange={(e) =>setName(e.target.value)} className="outline-none border-transparent border-b-2 py-1 focus-visible:border-b-indigo-500 w-full mr-3"/>
            {name !== questionnaire.name && (
                <div className="flex">
                    <IconButton icon={CheckIcon} className="mr-1" size="medium" color="success" disabled={saveDisabled} onClick={save}/>
                    <IconButton icon={XMarkIcon} size="medium" color="error" onClick={close}/>
                </div>
            )}
        </div>
    </div>
    )
}

export default Name;