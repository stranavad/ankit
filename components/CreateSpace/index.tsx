import {useState} from "react";
import {Modal, Input, Spacer} from "@geist-ui/core";
import {CreateSpaceData} from "@/routes/space";

interface CreateSpaceFormProps {
    visible: boolean;
    onClose: (close: boolean) => void;
    memberName: string;
    store: (data: CreateSpaceData) => void;
}

const Index = ({store, memberName: defaultMemberName, visible, onClose}: CreateSpaceFormProps) => {
    const [space, setSpace] = useState<string>("New space");
    const [member, setMember] = useState<string>(defaultMemberName);

    const storeSpace = () => {
        store({spaceName: space, memberName: member});
        setSpace("");
        setMember("");
    };

    return (
        <Modal visible={visible} onClose={() => onClose(false)}>
            <Modal.Title>Create space</Modal.Title>
            <Modal.Content>
                <Input label="Space name" initialValue="My new amazing space" value={space}
                       onChange={(e) => setSpace(e.target.value)}/>
                <Spacer h={1}/>
                <Input label="Username" initialValue={defaultMemberName} value={member}
                       onChange={(e) => setMember(e.target.value)}/>
            </Modal.Content>
            <Modal.Action passive onClick={() => onClose(false)}>Cancel</Modal.Action>
            <Modal.Action onClick={storeSpace}>Create</Modal.Action>
        </Modal>
    );
};

export default Index;