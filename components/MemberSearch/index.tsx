import {ChangeEvent, useContext, useRef, useState} from "react";
import {ApplicationUser} from "@/types/user";
import {searchUsers} from "@/api/user";
import styles from "./index.module.scss";
import Image from "next/image";
import TextInput from "@/components/base/TextInput";
import {checkSpacePermission, Permission} from "@/util/permission";
import Popper from "@/components/base/Popper";
import classNames from "classnames";
import {SpaceContext} from "@/util/context";
import GridItem from "@/components/base/Grid/GridItem";

const MemberSearch = ({addUser}: { addUser: (user: ApplicationUser) => void }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [users, setUsers] = useState<ApplicationUser[]>([]);
    const [search, setSearch] = useState<string>("");
    const anchorRef = useRef<HTMLInputElement | null>(null);

    const {space, member} = useContext(SpaceContext);

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOpen(true);
        setSearch(e.target.value);
        loadUsers();
    };

    const onUserClick = (user: ApplicationUser) => {
        addUser(user);
        setUsers(data => data.filter((item) => item !== user));
    };

    const loadUsers = () => {
        searchUsers({search, notIn: [space.id]}).then((response) => {
            setUsers(response.data);
            console.log(response.data);
        });
    };


    if (!checkSpacePermission(Permission.ADD_MEMBER, member.role)) {
        return null;
    }

    return (
        <>
            <Popper
                open={open} handleClose={() => setOpen(false)} anchor={anchorRef.current}>
                <div
                    className={classNames("popper-container", "grid", styles.menuList)}
                >
                    {users.map((user) => (
                        <div className="line-basic" key={user.id}>
                            <GridItem size={2}>
                                <Image src={user.image as string} width="40" height="40"
                                       className="user-image" alt="user image"/>
                            </GridItem>
                            <GridItem size={8}>
                                <h4>{user.name}</h4>
                            </GridItem>
                            <GridItem size={2}>
                                <button className="text" onClick={() => onUserClick(user)}>add</button>
                            </GridItem>
                        </div>
                    ))}
                    {!users.length && (
                        <h5>No users found</h5>
                    )}
                </div>
            </Popper>
            <div ref={anchorRef}>
                <TextInput value={search} onChange={onSearchChange}/>
            </div>
        </>
    );
};

export default MemberSearch;