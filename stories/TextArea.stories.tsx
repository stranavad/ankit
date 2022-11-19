import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";

import TextArea from "../components/base/TextArea";

export default {
    title: "Base/TextArea",
    component: TextArea,
    argTypes: {
        title: {control: "text"},
        value: {control: "text"}
    },
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    title: "Switch title",
    value: "Current textarea value",
    change: () => undefined,
};

