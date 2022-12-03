import React from 'react';
import {ComponentStory, ComponentMeta} from "@storybook/react";

import AddQuestion from "@/components/AddQuestion";

export default {
    title: "Add Question",
    component: AddQuestion,
    argTypes: {}
} as ComponentMeta<typeof AddQuestion>;

const Template: ComponentStory<typeof AddQuestion> = (args) => <AddQuestion {...args}/>;

export const Primary = Template.bind({});