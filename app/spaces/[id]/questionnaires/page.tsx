"use client";
import {useContext} from "react";
import {SearchContext} from "@/util/context";
import GridItem from "@/components/base/Grid/GridItem";
import {TableHeader} from "@/types/table";
import {createQuestionnaire, useQuestionnaires} from "@/routes/questionnaire";
import Link from "next/link";

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
        title: "Status",
        size: 4,
    },
    {
        title: "Actions",
        size: 2
    }
];

const Questionnaires = ({params: {id: spaceId}}: { params: { id: number } }) => {
    const {search} = useContext(SearchContext);
    const {
        data,
        mutate
    } = useQuestionnaires(spaceId);
    const questionnaires = (search ? data?.filter(({name}) => name.includes(search)) : data) || [];


    const create = () => {
        mutate(async (questionnaires) => {
            const newQuestionnaire = await createQuestionnaire({name: "New questionnaire"}, spaceId);
            return [newQuestionnaire.data, ...questionnaires || []];
        });
    };


    return (
        <>
            <div className="content">
                <div className="grid">
                    <button className="filled"
                            onClick={create}>CREATE
                        QUESTIONNAIRE
                    </button>
                    <div className="header">
                        {tableHeaders.map((header, index) => (
                            <GridItem key={index} size={header.size}>
                                <h5>{header.title}</h5>
                            </GridItem>
                        ))}
                    </div>
                    {
                        questionnaires?.map((questionnaire) =>
                            <div className="line" key={questionnaire.id}>
                                <GridItem size={1}>
                                    <h3>
                                        {questionnaire.id}
                                    </h3>
                                </GridItem>
                                <GridItem size={5}>
                                    <Link href={`/spaces/${spaceId}/questionnaires/${questionnaire.id}`}
                                          className="link">
                                        <h3>
                                            {questionnaire.name}
                                        </h3>
                                    </Link>
                                </GridItem>
                                <GridItem size={4}>
                                    <h3>
                                        {questionnaire.status}
                                    </h3>
                                </GridItem>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Questionnaires;