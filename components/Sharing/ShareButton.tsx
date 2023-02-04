import Button from "@/components/Button";
import {copyQuestionnaireLink} from "@/util/questionnaire";

const ShareButton = ({className = "", questionnaire}: { className?: string, questionnaire: { url: string } }) => {
    return (
        <Button className={`text-sm py-1 px-2 ${className}`} onClick={() => copyQuestionnaireLink(questionnaire)}>
            Share
        </Button>
    );
};

export default ShareButton;