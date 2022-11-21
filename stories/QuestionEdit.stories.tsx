import React from 'react';
import {ComponentStory, ComponentMeta} from "@storybook/react";

import QuestionEdit from "@/components/QuestionEdit";

export default {
    title: "Question Edit",
    component: QuestionEdit,
    argTypes: {}
} as ComponentMeta<typeof QuestionEdit>;

const Template: ComponentStory<typeof QuestionEdit> = (args) => <QuestionEdit {...args}/>;

export const Primary = Template.bind({});