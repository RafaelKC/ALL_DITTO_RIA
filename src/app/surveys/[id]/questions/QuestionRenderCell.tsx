import React from "react";
import {Checkbox, getKeyValue, Select, SelectItem, TableCell, TableColumn} from "@nextui-org/react";
import {NcClassification, Question} from "@/entities/Entities";
import {QuestionStatus} from "@/enums/QuestionStatus";

export const QuestionRenderColumn = React.useCallback((item: Question, columnKey: string, classification: NcClassification[]) => {
    const cellValue = getKeyValue(item, columnKey);

    switch (columnKey) {
        case 'status':
            return (
                <Select
                    items={statusOptions}
                    label=""
                    placeholder=""
                    className="max-w-xs"
                >
                    {(status) => <SelectItem key={status.key}>{status.label}</SelectItem>}
                </Select>
            );
        case 'recurrence':
            return   <Checkbox defaultSelected={cellValue}/>;
        case 'ncClassification':
        default:
            return <TableCell><p>{cellValue}</p></TableCell>;
    }
}, []);

const getQuestionsOptions = (classification: NcClassification[]) => {
    return classification.map((item: NcClassification) => {
        return { key: item.id, label: `${item.name} | ${item.daysToResolve}`, color: item.color };
    });
}

const statusOptions = [
    { key: QuestionStatus.Empty, label: '-' },
    { key: QuestionStatus.Ok, label: 'Conforme' },
    { key: QuestionStatus.NotOk, label: 'Não conforme' },
    { key: QuestionStatus.NotApplicable, label: 'Não aplicável' }
];