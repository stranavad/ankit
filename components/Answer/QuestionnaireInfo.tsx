import { AnswerQuestionnaire } from '@/types/answer';
import dayjs from 'dayjs';

interface QuestionniareInfoProps {
    questionnaire: AnswerQuestionnaire
}

const QuestionnaireInfo = ({questionnaire}: QuestionniareInfoProps) => {
    return (
        <div className="bg-white dark:bg-slate-700 w-full rounded-xl p-5 mb-10">
            <h1 className="text-slate-900 dark:text-slate-100 font-semibold text-2xl">
                {questionnaire.name}
            </h1>
            <p className="mt-2 text-slate-800 dark:text-slate-200 text-sm leading-6">
                {questionnaire.description}
            </p>
            <span className="block w-full text-end mt-5 text-xs text-slate-700  dark:text-slate-300">Last published: {dayjs(questionnaire.publishedAt).format('DD/MM/YY H:mm')}</span>
        </div>
    )
}

export default QuestionnaireInfo;