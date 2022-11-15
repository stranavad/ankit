"use client";
import {ApplicationMember} from "@/types/member";
import {useContext, useEffect, useState} from "react";
import MemberItem from "@/components/MemberItem";
import {getSpaceMembers} from "@/api/space";
import MemberSearch from "@/components/MemberSearch";
import {SpaceContext} from "@/util/context";
import GridItem from "@/components/base/Grid/GridItem";
import {TableHeader} from "@/types/table";
import {ApplicationQuestionnaire} from "@/types/questionnaire";
import {getQuestionnaires} from "@/api/questionnaire";
import Image from "next/image";
import RolePicker from "@/components/RolePicker";
import {checkSpacePermission, Permission} from "@/util/permission";

const tableHeaders: TableHeader[] = [
    {
        title: "ID",
        size: 1,
    },
    {
        title: "Name",
        size: 5
    },
    {
        title: "Role",
        size: 4,
    },
    {
        title: "Actions",
        size: 2
    }
];

const Questionnaires = () => {
    const [questionnaires, setQuestionnaires] = useState<ApplicationQuestionnaire[]>([]);
    const {space, member} = useContext(SpaceContext);

    useEffect(() => {
        getQuestionnaires(member.id).then((response) => {
            setQuestionnaires(response.data);
        });
    }, [space.id]);


    return (
        <>
            <div className="content">
                <div className="grid">
                    <div className="header">
                        {tableHeaders.map((header, index) => (
                            <GridItem key={index} size={header.size}>
                                <h5>{header.title}</h5>
                            </GridItem>
                        ))}
                    </div>
                    {questionnaires.map((questionnaire) =>
                        <div className="line" key={questionnaire.id}>
                            <GridItem size={1}>
                                <h3>
                                    {questionnaire.id}
                                </h3>
                            </GridItem>
                            <GridItem size={5}>
                                <h3>
                                    {questionnaire.name}
                                </h3>
                            </GridItem>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Questionnaires;