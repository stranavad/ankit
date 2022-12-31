"use client";
import EntityName from "@/components/Inputs/EntityName";
import {updateSpace, UpdateSpaceData, useSpace} from "@/routes/space";
import EntityDescription from "@/components/Inputs/EntityDescription";
import ConfirmationModal from "@/components/Modals/ConfirmationModal";
import Button from "@/components/Button";

interface Props {
    params: {
        id: string
    };
}

const SpacePage = ({params: {id}}: Props) => {
    const spaceId = parseInt(id);
    const {data: space, mutate} = useSpace(spaceId);


    if (!space) {
        return;
    }

    const updateFunction = async (data: UpdateSpaceData) => {
        return (await updateSpace(data, spaceId)).data;
    };

    const updateName = (name: string) => {
        mutate(() => updateFunction({name}), {
            revalidate: false,
            optimisticData: {...space, name}
        });
    };

    const updateDescription = (description: string) => {
        mutate(() => updateFunction({description}), {
            revalidate: false,
            optimisticData: {...space, description}
        });
    };

    return (
        <div className="content">
            <div className="bg-white shadow p-5 rounded-md">
                <EntityName value={space.name} update={updateName}/>
                <EntityDescription value={space.description} update={updateDescription}/>

                {/* ADVANCED */}
                <h2 className="mt-10 text-lg font-medium">Advanced</h2>
                <div className="mt-1 mb-3 h-px bg-gray-200 w-full"/>
                <div className="flex items-center my-3">
                    <span className="mr-5 text-sm">Leave this space</span>
                    <ConfirmationModal title={"Do you really want to transfer this questionnaire to another space?"}
                                       description={"This action is irreversible"}
                                       submit={() => console.log("Deleting questionnaire")}
                                       renderItem={openModal => <Button secondary type="warning"
                                                                        className="py-1 px-2 text-xs"
                                                                        onClick={openModal}>Leave
                                       </Button>}/>
                </div>
                <div className="flex items-center my-3">
                    <span className="mr-5 text-sm">Delete this space</span>
                    <ConfirmationModal title={"Do you really want to delete this questionnaire?"}
                                       description={"This action is irreversible and you will loose all your data"}
                                       submit={() => console.log("Deleting questionnaire")}
                                       renderItem={openModal => <Button secondary type="error"
                                                                        className="py-1 px-2 text-xs"
                                                                        onClick={openModal}>Delete</Button>}/>
                </div>
            </div>
        </div>
    );
};

export default SpacePage;