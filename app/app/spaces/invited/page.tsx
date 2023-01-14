"use client";
import Button from "@/components/Button";
import {acceptSpaceInvitation, useSpaces} from "@/routes/space";

const InvitedSpaces = () => {
    const {data, mutate} = useSpaces();
    const spaces = data?.filter(({accepted}) => !accepted) || [];

    const acceptInvitation = (accept: boolean, spaceId: number) => {
        mutate(async (spaces) => {
            await acceptSpaceInvitation(spaceId, accept);
            return spaces?.map((space) => space.id === spaceId ? ({
                ...space,
                accepted: accept
            }) : space) || [];
        });
    };

    if (!spaces.length) {
        return (
            <div className="content">
                <div>
                    <h2 className="text-2xl font-bold mr-5">Your Invited Spaces</h2>
                </div>
                <span className="block mt-5 text-sm">You do not have any invited spaces</span>
            </div>
        );
    }

    return (
        <div className="content">
            <div>
                <h2 className="text-2xl font-bold mr-5">Your Invited Spaces</h2>
            </div>
            <div className="table border-collapse table-auto w-full text-sm mt-5">
                <div className="table-header-group">
                    <div className="table-row">
                        <div
                            className="table-cell border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400  text-left">Name
                        </div>
                        <div
                            className="hidden sm:table-cell border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">Role
                        </div>
                        <div
                            className="table-cell border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">Actions
                        </div>
                    </div>
                </div>
                <div className="table-row-group bg-white">
                    {spaces.map((space) => (
                        <div className="table-row" key={space.id}>
                            <div
                                className="table-cell border-b border-slate-100 p-4 pl-8 text-slate-500 font-medium">
                                {space.name}
                            </div>
                            <div
                                className="hidden sm:table-cell border-b border-slate-100 p-4 text-slate-500 ">
                                {space.role}
                            </div>
                            <div
                                className="table-cell border-b border-slate-100  p-4 pr-8 text-slate-500">
                                <Button type="success" secondary className="p-1 mr-3"
                                        onClick={() => acceptInvitation(true, space.id)}>Accept</Button>
                                <Button type="warning" secondary className="p-1"
                                        onClick={() => acceptInvitation(false, space.id)}>Reject</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InvitedSpaces;