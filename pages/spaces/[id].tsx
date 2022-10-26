import type {NextPage} from "next";
import {useRouter} from "next/router";
import {ChangeEvent, useEffect, useState} from "react";
import {addMemberToSpace, getSpaceById} from "@/api/space";
import {DetailSpace} from "@/types/space";
import {AxiosError} from "axios";
import {Button, TextField} from "@mui/material";
import {ApplicationUser} from "@/types/user";
import {searchUsers} from "@/api/user";
import Image from "next/image";

const SpacePage: NextPage = () => {
    const [space, setSpace] = useState<DetailSpace | null>(null);
    const [userSearch, setUserSearch] = useState<string>("");
    const [users, setUsers] = useState<ApplicationUser[]>([]);

    const router = useRouter();
    const spaceId = Number(router.query.id);

    useEffect(() => {
        if (!isNaN(spaceId)) {
            getSpaceById(spaceId)
                .then((response) => setSpace(response.data))
                .catch(async (e: AxiosError) => {
                    if (e.response?.status === 400) {
                        await router.push("/spaces");
                    }
                });
        }
    }, [spaceId]);


    const onUserSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserSearch(e.target.value);
        const data = {
            search: e.target.value,
            in: [],
            notIn: [spaceId]
        };
        searchUsers(data).then((response) => setUsers(response.data));
    };

    const addMember = (id: number, name: string) => {
        addMemberToSpace({userId: id, username: name}, spaceId).then((response) => console.log(response));
    };

    if (space) {
        return (
            <>
                <h1>{space.name}</h1>
                <h2>{space.description}</h2>
                <TextField value={userSearch} onChange={onUserSearchChange}/>
                {users.map((user) => (
                    <div key={user.id}>
                        <h3 key={user.id}>{user.name}</h3>
                        {user.image && <Image src={user.image} width="50" height="50" alt="user image"/>}
                        <Button onClick={() => addMember(user.id, user.name)}>Add</Button>
                    </div>
                ))}
            </>
        );
    }
    return (
        <>
            <h1>Hold up</h1>
        </>
    );
};

export default SpacePage;