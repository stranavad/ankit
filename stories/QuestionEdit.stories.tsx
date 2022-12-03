import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import QuestionEdit from "@/components/QuestionEdit";
import {QuestionType} from "@/types/questionnaire";

export default {
    title: "Question Edit",
    component: QuestionEdit,
    argTypes: {}
} as ComponentMeta<typeof QuestionEdit>;

const Template: ComponentStory<typeof QuestionEdit> = (args) => <QuestionEdit {...args}/>;

export const Primary = Template.bind({});

Primary.args = {
    question: {
        id: 1,
        title: "New question",
        description: "This is questions description (optional)",
        required: true,
        visible: false,
        position: 1,
        type: QuestionType.SELECT,
        options: [
            {
                id: 1,
                value: "Something",
                position: 1,
            },
            {
                id: 2,
                value: "Someting else",
                position: 2,
            },
            {
                id: 3,
                value: "Something else else",
                position: 3,
            }
        ]
    }
};