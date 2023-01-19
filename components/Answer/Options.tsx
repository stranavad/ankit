import {CheckCircleIcon} from '@heroicons/react/24/outline';
import { Answer, AnswerEvent, AnswerOption } from '@/types/answer';
import { QuestionType } from '@/types/questionnaire';

interface OptionsProps {
  options: AnswerOption[];
  answer: Answer;
  type: QuestionType.MULTI_SELECT | QuestionType.SELECT;
  setAnswer: (e: AnswerEvent) => void;
}

const Options = ({options, answer, type, setAnswer}: OptionsProps) => {

  const setOption = (id: number) => {
    let optionsToAnswer = answer.options;

    if(type === QuestionType.MULTI_SELECT){
        if(answer.options.includes(id)){
            optionsToAnswer.splice(optionsToAnswer.indexOf(id), 1);
        } else {
            optionsToAnswer = [...answer.options, id];
        }
    } else {
        optionsToAnswer = [id];
    }

    setAnswer({options: optionsToAnswer})
  }

  return (
    <div className="w-full">
      <div className="w-full">
        {options.map((option) => (
            <div key={option.optionId} onClick={() => setOption(option.optionId)} className={`text-slate-800 dark:text-slate-200 cursor-pointer ${answer.options.includes(option.optionId) ? 'bg-slate-200 dark:bg-slate-800': 'bg-transparent'} px-4 py-3 hover:bg-slate-200 dark:hover:bg-slate-800 border-2 border-slate-200 dark:border-slate-800 rounded-md my-3 flex justify-between transition-colors duration-100`}>
                {option.value}
                <div className="h-4 w-4 px-5">
                  {answer.options.includes(option.optionId) && (
                    <CheckCircleIcon className="text-slate-800 dark:text-slate-200 h-7 w-7"/>
                  )}
                </div>
            </div>
        ))}
        
      </div>
    </div>
  )
}

export default Options;
