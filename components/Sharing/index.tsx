import { checkQuestionnaireUrl } from "@/routes/questionnaire";
import { ApplicationQuestionnaire } from "@/types/questionnaire";
import useDebounce from "@/util/debounce";
import { copyQuestionnaireLink } from "@/util/questionnaire";
import { CheckIcon, DocumentDuplicateIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import IconButton from "../Button/IconButton";

interface SharingCentreProps {
    questionnaire: ApplicationQuestionnaire;
    updateUrl: (url: string) => void;
}

const containLetters = "abcdefghijklmnopqrstuvwxyz0123456789-";

const checkValidUrl = (url: string): boolean => {
    let valid = true;
    url.split("").map((symbol) => {
        if (!containLetters.includes(symbol)) {
            valid = false;
        }
    });
    return valid;
};

const SharingCentre = ({ questionnaire, updateUrl }: SharingCentreProps) => {
    const [url, setUrl] = useState<string>(questionnaire.url || "");
    const [validUrl, setValidUrl] = useState<boolean>(true);
    const debouncedUrl = useDebounce(url, 100);

    useEffect(() => {
        if (url !== questionnaire.url && url && !(url.length < 5 || url.length > 36)) {
            checkQuestionnaireUrl(url).then((response) => setValidUrl(!response.data));
        }
    }, [debouncedUrl]);

    const refresh = () => {
        setValidUrl(true);
        setUrl(questionnaire.url || "");
    };

    const letterValidUrl = checkValidUrl(url);
    const disabledSaveButton = !validUrl || url.length < 5 || url.length > 36 || !letterValidUrl;
    const showEditButtons = url !== questionnaire.url;
    const alertMessage = !letterValidUrl ? "You have to use only alphabet, numbers and slash" : (!validUrl && !(url.length < 5 || url.length > 36)) ? "This address is already used" : disabledSaveButton ? "Address has to be between 5 and 36 characters long" : null;

    return (
        <>
            <h2 className="mt-10 text-lg font-medium">Sharing centre</h2>
            <div className="mt-1 mb-3 h-px bg-gray-200 w-full" />
            <div className="mt-1 flex items-center justify-between">
                <div className="flex w-full max-w-lg md:max-w-xl">
                    <span
                        className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-xs md:text-sm text-gray-500">
                        https://pollify.com/answer/
                    </span>
                    <input
                        type="text"
                        className={`block w-full flex-1 ${!disabledSaveButton ? "focus:border-indigo-500 focus:ring-indigo-500 border-gray-300" : "border-red-300 focus:border-red-500 focus:ring-red-500"} rounded-none rounded-r-md text-xs md:text-sm`}
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <IconButton className="pl-2" icon={DocumentDuplicateIcon} color="primary" size="medium"
                                onClick={() => copyQuestionnaireLink(questionnaire)} />
                </div>
                {showEditButtons && (
                    <div>
                        <IconButton icon={CheckIcon} color="success" size="medium" onClick={() => updateUrl(url)}
                                    className="mr-2" disabled={disabledSaveButton} />
                        <IconButton icon={XMarkIcon} color="error" size="medium" onClick={refresh} />
                    </div>
                )}
            </div>
            <span className="text-xs block w-full text-center text-red-500">{alertMessage}</span>
        </>
    );
};

export default SharingCentre;