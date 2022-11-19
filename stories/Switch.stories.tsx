import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";

import Switch from "../components/base/Switch";

export default {
    title: "Base/Switch",
    component: Switch,
    argTypes: {
        title: {control: "text"},
        value: {control: "boolean"}
    },
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    title: "Switch title",
    value: true,
    update: () => undefined,
};

