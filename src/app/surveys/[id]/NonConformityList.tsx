'use client';

import { Loading } from "@/components/Lodding";
import { NonConformity } from "@/entities/Entities"; 
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    
} from "@nextui-org/react";
import React from "react";

type NonConformityListProps = {
    ncs: NonConformity[],
   
}

export const NonConformityList: React.FC<NonConformityListProps> = ({ ncs }) => {
    

    if (ncs.length === 0) {
        return <p className="font-bold text-inherit">No non-conformities found.</p>;
    }

    return (
        <Table aria-label="Non-Conformities">
            <TableHeader>
                
                
                <TableColumn>Artifact</TableColumn>
                <TableColumn>Corrective Action</TableColumn>
                <TableColumn>Description</TableColumn>
                <TableColumn>Notes</TableColumn>
                <TableColumn>Order</TableColumn>
                <TableColumn>Recurrence</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Responsible</TableColumn>
                <TableColumn>Resolved</TableColumn>
            </TableHeader>
            <TableBody>
                {ncs.map((nc) => (
                    <TableRow key={nc.id}>
                        <TableCell>{nc.question.artifact}</TableCell>
                        <TableCell>{nc.question.correctiveAction}</TableCell>
                        <TableCell>{nc.question.description}</TableCell>
                        <TableCell>{nc.question.notes}</TableCell>
                        <TableCell>{nc.question.order}</TableCell>
                        <TableCell>{nc.question.recurrence}</TableCell>
                        <TableCell>{nc.question.status}</TableCell>
                        <TableCell>{nc.question.responsible}</TableCell>
                        <TableCell>{nc.resolved ? 'Yes' : 'No'}</TableCell>
                    
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

