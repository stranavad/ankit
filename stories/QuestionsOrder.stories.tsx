import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import QuestionsOrder from "@/components/Widgets/QuestionsOrder";

export default {
    title: "Questions Order Widget",
    component: QuestionsOrder,
    argTypes: {}
} as ComponentMeta<typeof QuestionsOrder>;

const Template: ComponentStory<typeof QuestionsOrder> = () => <div style={{width: '800px'}}><QuestionsOrder/></div>;

export const Primary = Template.bind({});