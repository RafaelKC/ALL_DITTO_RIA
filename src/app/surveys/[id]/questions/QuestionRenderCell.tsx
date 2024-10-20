import React from "react";
import {
    Checkbox,
    getKeyValue,
    Input,
    Select, SelectedItemProps,
    SelectedItems,
    SelectItem,
    TableCell,
    Textarea,
    Tooltip
} from "@nextui-org/react";
import {NcClassification, Question} from "@/entities/Entities";
import {QuestionStatus} from "@/enums/QuestionStatus";
import getBestContrastColor from "@/functions/getBestContrastColor";

export const QuestionRenderCell = (item: Question, columnKey: string, classification: NcClassification[]) => {
    const cellValue = getKeyValue(item, columnKey);

    switch (columnKey) {
        case 'status':
            return (
                <TableCell >
                    <Tooltip content={statusOptions.find(f => f.key == QuestionStatus[item.status])?.label}>
                        <Select
                            items={statusOptions}
                            label=""
                            placeholder=""
                            className="max-w-xs"
                            defaultSelectedKeys={[QuestionStatus[item.status]]}
                        >
                            {(status) => <SelectItem key={status.key}>{status.label}</SelectItem>}
                        </Select>
                    </Tooltip>
                </TableCell>
            );
        case 'recurrence':
            return <TableCell><Checkbox defaultSelected={cellValue}/></TableCell>;
        case 'ncClassificationId':
            const classificationsOptions = getQuestionsOptions(classification);
            return (
                <TableCell>
                    <Tooltip content={item.ncClassification?.name}>
                        <Select
                            items={classificationsOptions}
                            label=""
                            placeholder=""
                            className="max-w-xs"
                            defaultSelectedKeys={[cellValue]}
                            renderValue={(v: SelectedItems<SelectedItemProps<string>>) => <div
                                className='p-1 rounded-md'
                                style={{
                                    color: getBestContrastColor(v[0].data?.data ?? ''),
                                    backgroundColor: v[0].data?.data ?? undefined
                                }}>{v[0].textValue}</div>}
                        >
                            {(status) => <SelectItem
                                style={{
                                    backgroundColor: status.data ?? undefined,
                                    color: getBestContrastColor(status.data ?? '')
                                }}
                                key={status.key?.toString() ?? ''}
                            >
                                {status.textValue}
                            </SelectItem>}
                        </Select>
                    </Tooltip>
                </TableCell>
            );
        case 'correctiveAction':
        case 'responsible':
        case 'artifact':
            return <TableCell><Tooltip content={cellValue}><Input value={cellValue}/></Tooltip></TableCell>;
        case 'description':
            return <TableCell><Tooltip content={cellValue}>
                <Textarea
                    defaultValue={cellValue}
                    className="max-w-xs"
                />
            </Tooltip></TableCell>;
        case 'notes':
            return <TableCell><Tooltip className="w-full" content={cellValue}>
                <Textarea
                    defaultValue={cellValue}
                    className="w-full"
                />
            </Tooltip></TableCell>;
        default:
            return <TableCell><p>{cellValue != null ? cellValue.toString() : ''}</p></TableCell>;
    }
};

const getQuestionsOptions = (classification: NcClassification[]) => {
    return classification.map((item: NcClassification) => {
        return {
            key: item.id,
            textValue: `${item.name} | ${item.daysToResolve}`,
            data: item.color
        } as SelectedItemProps<string>;
    });
}

const statusOptions = [
    {key: QuestionStatus[QuestionStatus.Empty], label: '-'},
    {key: QuestionStatus[QuestionStatus.Ok], label: 'Conforme'},
    {key: QuestionStatus[QuestionStatus.NotOk], label: 'Não conforme'},
    {key: QuestionStatus[QuestionStatus.NotApplicable], label: 'Não aplicável'}
];