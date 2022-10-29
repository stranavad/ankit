import {ChangeEvent, useContext, useRef, useState} from "react";
import {ApplicationUser} from "@/types/user";
import {searchUsers} from "@/api/user";
import {SpaceContext} from "@/components/CurrentSpaceProvider";
import {ClickAwayListener, PopperUnstyled} from "@mui/base";
import styles from "./index.module.scss";
import Image from "next/image";
import TextInput from "@/components/base/TextInput";
import {checkSpacePermission, Permission} from "@/util/permission";
import Popper from "@/components/base/Popper";
import classNames from "classnames";

const MemberSearch = ({addUser}: { addUser: (user: ApplicationUser) => void }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [users, setUsers] = useState<ApplicationUser[]>([]);
    const [search, setSearch] = useState<string>("");
    const anchorRef = useRef<HTMLInputElement | null>(null);

    const {space} = useContext(SpaceContext);

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

    const handleClose = () => setOpen(false);

    if (!checkSpacePermission(Permission.ADD_MEMBER)) {
        return null;
    }

    return (
        <>
            <Popper
                open={open} handleClose={() => setOpen(false)} anchor={anchorRef.current}>
                <div
                    className={classNames("popper-container", styles.menuList)}
                >
                    {users.map((user) => (
                        <div className={styles.menuItem} key={user.id}>
                            {/* TODO add default image */}
                            <div className={styles.userInfo}>
                                <Image src={user.image as string} width="40px" height="40px"
                                    className={styles.userImage}/>
                                <span className={styles.userName}>{user.name}</span>
                            </div>
                            <button className={styles.userAdd} onClick={() => onUserClick(user)}>add</button>
                        </div>
                    ))}
                </div>
            </Popper>
            <div ref={anchorRef}>
                <TextInput value={search} onChange={onSearchChange}/>
            </div>
        </>
    );
};

export default MemberSearch;