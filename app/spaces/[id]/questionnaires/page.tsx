"use client";
import {useContext, useEffect, useState} from "react";
import {SearchContext} from "@/util/context";
import GridItem from "@/components/base/Grid/GridItem";
import {TableHeader} from "@/types/table";
import {ApplicationQuestionnaire} from "@/types/questionnaire";
import {createQuestionnaire, getQuestionnaires} from "@/api/questionnaire";
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
    const [questionnaires, setQuestionnaires] = useState<ApplicationQuestionnaire[]>([]);

    const {debouncedSearch} = useContext(SearchContext);


    const loadQuestionnaires = () => {
        getQuestionnaires(spaceId, debouncedSearch || undefined).then((response) => {
            setQuestionnaires(response.data);
        });
    };

    useEffect(loadQuestionnaires, [debouncedSearch]);

    useEffect(loadQuestionnaires, [spaceId]);


    return (
        <>
            <div className="content">
                <div className="grid">
                    <button className="filled"
                            onClick={() => createQuestionnaire({name: "New questionnaire"}, spaceId)}>CREATE
                        QUESTIONNAIRE
                    </button>
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
                                <Link href={`/questionnaire/${questionnaire.id}`} className="link">
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
                    )}
                </div>
            </div>
        </>
    );
};

export default Questionnaires;