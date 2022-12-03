import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";

export default {
    title: "Base/Button",
} as ComponentMeta<any>;

const Template: ComponentStory<any> = (args) => <button {...args}>Button text</button>;

export const Filled = Template.bind({});
Filled.args = {
    className: "filled"
};

export const Text = Template.bind({});
Text.args = {
    className: "text"
};

export const Outline = Template.bind({});
Outline.args = {
    className: "outline"
};