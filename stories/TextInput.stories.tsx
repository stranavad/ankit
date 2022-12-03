import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";

export default {
    title: "Base/TextInput",
} as ComponentMeta<any>;

const Template: ComponentStory<any> = (args) => <input type="text" {...args}/>;

export const Filled = Template.bind({});
Filled.args = {
    className: "filled",
    placeholder: "Add Email"
};

export const EntityName = Template.bind({});
EntityName.args = {
    className: "entity-name",
    placeholder: "Add Email"
};

export const Outline = Template.bind({});
Outline.args = {
    className: "outline",
    placeholder: "Add Email"
};