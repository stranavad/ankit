"use client";
import {acceptSpaceInvitation, useSpaces} from "@/routes/space";
import GridItem from "@/components/base/Grid/GridItem";

const InvitedSpaces = () => {
    const {data, mutate} = useSpaces();

    const invitedSpaces = data?.filter(({accepted}) => !accepted) || [];

    const acceptInvitation = (accept: boolean, spaceId: number) => {
        mutate(async (spaces) => {
            await acceptSpaceInvitation(spaceId, accept);
            return spaces?.map((space) => space.id === spaceId ? ({
                ...space,
                accepted: accept
            }) : space) || [];
        });
    };

    return (
        <div className="content">
            {invitedSpaces.length ? (
                <div className="grid">
                    <h2>Invitations</h2>
                    {invitedSpaces.map((space) => (
                        <div className="line" key={space.id}>
                            <GridItem size={9}>
                                <h3>{space.name}</h3>
                            </GridItem>

                            <GridItem size={2}>
                                <button className="text" onClick={() => acceptInvitation(true, space.id)}
                                        disabled={space.personal}>Accept
                                </button>
                            </GridItem>
                            <GridItem size={1}>
                                <button className="text" onClick={() => acceptInvitation(false, space.id)}
                                        disabled={space.personal}>Decline
                                </button>
                            </GridItem>
                        </div>
                    ))}
                </div>
            ) : (<>
                <h3>There are no invitations</h3>
            </>)}
        </div>
    )
}

export default InvitedSpaces;