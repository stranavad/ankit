import {ApplicationSpace} from "@/types/space";
import Link from "next/link";
import {ArrowLeftOnRectangleIcon, TrashIcon} from "@heroicons/react/24/solid";
import ConfirmationModal from "@/components/Modals/ConfirmationModal";
import {checkSpacePermission, Permission} from "@/util/permission";
import {RoleType} from "@/types/role";

interface SpacesListProps {
    spaces: ApplicationSpace[];
    removeSpace: (id: number) => void;
    leaveSpace: (id: number) => void;
}

const SpacesList = ({spaces, removeSpace, leaveSpace}: SpacesListProps) => {
    const deleteButtonDisabled = (space: ApplicationSpace) => {
        return !checkSpacePermission(Permission.DELETE_SPACE, space.role) || space.personal;
    };

    const leaveButtonDisabled = (space: ApplicationSpace) => {
        return space.role === RoleType.OWNER;
    };

    return (
        <div className="table border-collapse table-auto w-full text-sm mt-5">
            <div className="table-header-group">
                <div className="table-row">
                    <div
                        className="table-cell border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400  text-left">Name
                    </div>
                    <div
                        className="hidden md:table-cell border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">Username
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
                            <Link href={`/spaces/${space.id}`}
                                  className="block w-full cursor-pointer">{space.name}</Link>
                        </div>
                        <div
                            className="hidden md:table-cell border-b border-slate-100 p-4 text-slate-500 ">
                            {space.username}
                        </div>
                        <div
                            className="hidden sm:table-cell border-b border-slate-100 p-4 text-slate-500 ">
                            {space.role}
                        </div>
                        <div
                            className="table-cell border-b border-slate-100  p-4 pr-8 text-slate-500">
                            <ConfirmationModal title="Do you really want to delete this space?"
                                               description="This action is irreversible and you will loose all your data"
                                               submitButtonText="Delete"
                                               submit={() => removeSpace(space.id)}
                                               renderItem={openModal => <button className="mr-3"
                                                                                disabled={deleteButtonDisabled(space)}
                                                                                onClick={openModal}>
                                                   <TrashIcon
                                                       className={`h-5 w-5 ${deleteButtonDisabled(space) ? "text-gray-500 cursor-not-allowed" : "text-red-500"}`}/>
                                               </button>}/>
                            <ConfirmationModal title="Do you really want to leave this space?"
                                               description="This action is irreversible. You will have to contact the administrator of this space to get gain access "
                                               submitButtonText="Leave"
                                               submit={() => leaveSpace(space.id)}
                                               renderItem={openModal => <button onClick={openModal}
                                                                                disabled={leaveButtonDisabled(space)}>
                                                   <ArrowLeftOnRectangleIcon
                                                       className={`h-5 w-5 ${leaveButtonDisabled(space) ? "text-gray-500 cursor-not-allowed" : "text-red-500"}`}/>
                                               </button>}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpacesList;