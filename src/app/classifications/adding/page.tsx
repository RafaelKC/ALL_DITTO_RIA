"use client";

import React, {useEffect, useState} from "react";
import {Button, Input} from "@nextui-org/react";
import {NcClassification} from "@/entities/Entities";
import {useRouter} from "next/navigation";

export default function ClassificationAdding() {
    const [name, setName] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [order, setOrder] = useState<number>(0);
    const [days, setDays] = useState<number>(0);
    const router = useRouter();

    const [valid, setValid] = useState<boolean>(false);


    useEffect(() => {
        setValid(name != null && color != null  && order !== null && order !== undefined && days !== null && days !== undefined);
    }, [name, color, order]);

    const addClassification = () => {
        const classification = {
            name,
            color,
            order,
            daysToResolve: days
        } as NcClassification;

        fetch('http://localhost:3000/api/nc-classifications', { method: 'POST',body: JSON.stringify(classification) })
            .then(() => router.push('/classifications'));
    };
    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-start">
                <h1>Create a new NC Classification</h1>

                <form className="grid grid-cols-2 gap-4">
                    <Input label="Name" placeholder="Enter name" value={name}  onChange={(e) => setName(e.target.value)} />
                    <Input label="Color" type="color" placeholder="Enter color" value={color}  onChange={(e) => setColor(e.target.value)} />
                    <Input label="Order" type="number" placeholder="Enter order" value={order.toString()}  onChange={(e) => setOrder(Number(e.target.value))} />
                    <Input label="Days to resolve" type="number" placeholder="Enter days" value={days.toString()}  onChange={(e) => setDays(Number(e.target.value))} />
                </form>

                <Button
                    size="sm"
                    className="bg-foreground text-background"
                    isDisabled={!valid}
                    onClick={() => addClassification()}
                >Add</Button>
            </main>
        </div>
    )
        ;
}


