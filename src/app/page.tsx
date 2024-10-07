"use client";

import {PagedResultDto} from "@/PagedResultDto";
import {Survey} from "@/entities/Entities";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

async function getData(): Promise<PagedResultDto<Survey>> {
  const res = await fetch('http://localhost:3000/api/surveys?template=0');
  if (!res.ok) {
    throw new Error('Falha ao buscar dados');
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  const columns = [
    {
      key: "name",
      label: "Nome",
    },
    {
      key: "date",
      label: "Data",
    },
    {
      key: "responsible",
      label: "Responsável",
    },
    {
      key: "objectName",
      label: "Objeto",
    },
  ];

  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>Tony Reichert</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Zoey Lang</TableCell>
                <TableCell>Technical Lead</TableCell>
                <TableCell>Paused</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>Jane Fisher</TableCell>
                <TableCell>Senior Developer</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>William Howard</TableCell>
                <TableCell>Community Manager</TableCell>
                <TableCell>Vacation</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </main>
      </div>
  );
}
