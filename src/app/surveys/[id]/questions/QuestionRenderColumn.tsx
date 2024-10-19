import React from "react";
import {TableColumn} from "@nextui-org/react";

export const QuestionRenderColumn = React.useCallback((columnKey: string, columnName: string) => {
    switch (columnKey) {
        case 'description':
        case 'ncClassification':
        case 'correctiveAction':
            return <TableColumn width={200} key={columnKey}>{columnName}</TableColumn>;
        case 'notes':
            return <TableColumn width={400} key={columnKey}>{columnName}</TableColumn>;
        default:
            return <TableColumn width={50} key={columnKey}>{columnName}</TableColumn>;
    }
}, []);