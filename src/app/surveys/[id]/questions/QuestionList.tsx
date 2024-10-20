import {NcClassification, Question} from "@/entities/Entities";
import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {questionsListsColumns} from "@/app/surveys/[id]/questions/QuestionsListsColumns";
import {QuestionRenderColumn} from "@/app/surveys/[id]/questions/QuestionRenderColumn";
import {QuestionRenderCell} from "@/app/surveys/[id]/questions/QuestionRenderCell";
import {Loading} from "@/components/Lodding";
import {getNcClassificationsList} from "@/functions/classifcations";

type QuestionListProps = {
    questions: Question[];
}

export const QuestionList: React.FC<QuestionListProps> = ({ questions }: QuestionListProps) => {
    const [question, setQuestion] = useState<Question[]>(questions);
    const [classifications, setClassifications] = useState<NcClassification[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        getNcClassificationsList().then((e) => {
            setClassifications(e.items);
            setLoaded(true)
        });
    }, []);

    return (
        <Loading loaded={loaded}>
            {
                questions.length  <= 0 ? <h1>No data here</h1> :  (<>
                    <Table aria-label="Questions">
                        <TableHeader columns={questionsListsColumns}>
                            {(column) => QuestionRenderColumn(column.key, column.label)}
                        </TableHeader>
                        <TableBody items={question}>
                            {(item) => (
                                <TableRow key={item.id}>
                                    {(columnKey) =>  QuestionRenderCell(item, columnKey.toString(), classifications) }
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </>)
            }
        </Loading>
    );
}