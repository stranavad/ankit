import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import Button from "@/components/Button";

export default {
    title: "Base/Button",
} as ComponentMeta<any>;

const Template: ComponentStory<any> = () => <div
    style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
    <Button primary
    >Primary default</Button>
    <div style={{height: "10px"}}/>
    <Button primary disabled
    >Primary default disabled</Button>
    <div style={{height: "10px"}}/>
    <Button primary
            type="success">Primary success</Button>
    <div style={{height: "10px"}}/>
    <Button primary
            type="error">Primary error</Button>
    <div style={{height: "10px"}}/>
    <Button
        secondary>Secondary default</Button>
</div>;

export const ButtonPrimary = Template.bind({});
