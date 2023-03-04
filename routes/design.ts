import { Design } from "@/types/design";
import request from "@/util/request";
import { useRequest } from ".";

/* GET DESIGN */
export const useQuestionnaireDesign = (questionnaireId: number) => useRequest<Design | null>(`/questionnaire/design/${questionnaireId}`);

/* UPDATE DESIGN */
export type UpdateDesign = {
    [P in keyof Design]?: Design[P];
};

export const updateQuestionnaireDesign = (id: number, data: UpdateDesign): Promise<Design> => {
    return request({
        url: `/questionnaire/design/${id}`,
        method: 'put',
        data,
    })
}


/* RESET DESIGN */
export const resetQuestionnaireDesign = (id: number) => {
    const data: Design = {
        font: null,
        logoUrl: null,
        logoPlacement: null,
        backgroundColor: null,
        backgroundImage: null,
        optionSelectedColor: null,
        optionColor: null,
        buttonColor: null,
        buttonTextColor: null,
        textColor: null,
    };

    return updateQuestionnaireDesign(id, data);
}