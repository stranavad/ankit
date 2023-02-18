import { AnswerError } from "@/types/answer";

const Error = ({status, error}: AnswerError) => {

    return (
        <div>
            <h3>{error}</h3>
        </div>
    )
};

export default Error;