"use client";
import { useState } from "react";
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function Uploads() {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "Q4 Expenses",
      status: "Pending",
      fields: [
        { id: 1, name: "Date", value: "2023-12-01" },
        { id: 2, name: "Category", value: "Travel" },
        { id: 3, name: "Amount", value: 1250.0 },
        { id: 4, name: "Description", value: "Flight to San Francisco" },
      ],
    },
    {
      id: 2,
      name: "Annual Budget",
      status: "Approved",
      fields: [
        { id: 1, name: "Year", value: 2024 },
        { id: 2, name: "Department", value: "Marketing" },
        { id: 3, name: "Total", value: 500000.0 },
        { id: 4, name: "Notes", value: "Includes new hires" },
      ],
    },
    {
      id: 3,
      name: "Q3 Sales",
      status: "Pending",
      fields: [
        { id: 1, name: "Quarter", value: "Q3" },
        { id: 2, name: "Product", value: "Widget" },
        { id: 3, name: "Revenue", value: 125000.0 },
        { id: 4, name: "Profit", value: 25000.0 },
      ],
    },
  ]);
  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="grid gap-6">
        <div className="grid gap-4">
          {files.map((file) => (
            <Card key={file.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileIcon className="h-6 w-6" />
                    <h2 className="text-lg font-bold">{file.name}</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        file.status === "Pending"
                          ? "warning"
                          : file.status === "Approved"
                            ? "success"
                            : "danger"
                      }
                    >
                      {file.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSort(file.id, null, "asc")}
                    >
                      <ListOrderedIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleAddColumn(file.id)}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleAddRow(file.id)}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {file.fields.map((field) => (
                        <TableHead
                          key={field.id}
                          className="cursor-pointer"
                          onClick={() => handleSort(file.id, field.id, "asc")}
                        >
                          {field.name}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      {file.fields.map((field) => (
                        <TableCell key={field.id}>
                          {typeof field.value === "number"
                            ? `$${field.value.toFixed(2)}`
                            : field.value}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      {file.fields.map((field) => (
                        <TableCell key={field.id}>
                          {typeof field.value === "number"
                            ? `$${(field.value * 2).toFixed(2)}`
                            : `${field.value} (updated)`}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      {file.fields.map((field) => (
                        <TableCell key={field.id}>
                          {typeof field.value === "number"
                            ? `$${(field.value * 0.5).toFixed(2)}`
                            : `${field.value} (updated again)`}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

function FileIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function FilterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function ListOrderedIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
