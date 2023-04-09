"use client";
import { lazy, Suspense } from "react";
import {
    acceptSpaceInvitation,
    createSpace,
    CreateSpaceData,
    deleteSpace,
    leaveSpace,
    useSpaces
} from "@/routes/space";
import { useSession } from "next-auth/react";
import Button from "@/components/Button";
import PageHeader from "@/components/Utils/PageHeader";
import PageWrapper from "@/components/Utils/PageWrapper";

const InvitedSpaces = lazy(() => import("@/components/Lists/SpacesList/invited"));
const SpacesList = lazy(() => import("@/components/Lists/SpacesList"));
const CreateSpaceForm = lazy(() => import("@/components/Modals/CreateSpace"));


const Spaces = () => {
    const { data, mutate } = useSpaces();
    const spaces = data?.filter(({ accepted }) => accepted) || [];
    const invitedSpaces = data?.filter(({ accepted }) => !accepted) || [];

    const { data: sessionData } = useSession();
    const user = sessionData?.user;

    const removeSpace = (spaceId: number) => {
        mutate(async (spaces) => {
            await deleteSpace(spaceId);
            return spaces?.filter(({ id }) => id !== spaceId) || [];
        });
    };

    const leave = (spaceId: number) => {
        mutate(async (spaces) => {
            await leaveSpace(spaceId);
            return spaces?.filter(({ id }) => id !== spaceId) || [];
        });
    };

    const storeSpace = (data: CreateSpaceData) => {
        mutate(async (spaces) => {
            const newSpace = await createSpace(data);
            return [newSpace.data, ...spaces || []];
        });
    };

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
        <PageWrapper>
            <PageHeader title="Your spaces">
                <Suspense>
                    <CreateSpaceForm memberName={user?.name || ""} store={storeSpace}>
                        {open => (
                            <Button className="text-xs p-2" onClick={open}>Create
                                space</Button>
                        )}
                    </CreateSpaceForm>
                </Suspense>
            </PageHeader>
            <Suspense>
                <SpacesList spaces={spaces} removeSpace={removeSpace} leaveSpace={leave} />
            </Suspense>
            <Suspense>
                <InvitedSpaces spaces={invitedSpaces} acceptInvitation={acceptInvitation} />
            </Suspense>
        </PageWrapper>
    );
};

export default Spaces;