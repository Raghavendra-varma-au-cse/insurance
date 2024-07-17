"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert } from "@/components/ui/alert";
import * as XLSX from "xlsx";
import axios from "axios";

export default function Component() {
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [filters, setFilters] = useState({
    status: [],
    category: [],
    date: {
      start: null,
      end: null,
    },
  });

  const handleFileSubmit = async (e: any) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      try {
        const response = await axios.post("/api/upload", {
          excelData: data,
        });
        console.log("Upload successful:", data);
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Error uploading data:", error);
      }
    }
  };

  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  const handleFileDownload = (file: any) => {
    console.log("Downloaded file:", file);
  };

  const handleSort = (fileId: any, fieldId: any, order: any) => {
    console.log(
      "Sorting file:",
      fileId,
      "by field:",
      fieldId,
      "in order:",
      order,
    );
  };
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="#" className="text-lg font-bold" prefetch={false}>
              Finance Dashboard
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className={`px-4 py-2 rounded-md transition-colors ${
                  filters.status === "all"
                    ? "bg-primary-foreground text-primary hover:bg-primary/80"
                    : "hover:bg-primary/20"
                }`}
                onClick={() => handleFilterChange("status", "all")}
                prefetch={false}
              >
                Uploads
              </Link>
              <Link
                href="#"
                className={`px-4 py-2 rounded-md transition-colors ${
                  filters.status === "Pending"
                    ? "bg-primary-foreground text-primary hover:bg-primary/80"
                    : "hover:bg-primary/20"
                }`}
                onClick={() => handleFilterChange("status", "Pending")}
                prefetch={false}
              >
                Analytics
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Input
              type="text"
              placeholder="Search files..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="bg-primary-foreground text-primary px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-opacity-50"
            />
            <Button
              variant="outline"
              className="px-4 py-2 rounded-md text-black"
            >
              Sort by Name
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="px-4 py-2 rounded-md text-black"
                >
                  Sort by Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>Pending</DropdownMenuItem>
                <DropdownMenuItem>Approved</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="px-4 py-2 rounded-md text-black"
                >
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload File
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Download File
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <span onClick={() => setIsDialogOpen(true)}>Upload</span>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Upload The Excel File</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleFileSubmit}>
                  <div>
                    <Input
                      type="file"
                      required
                      onChange={handleFile}
                      className="block w-full"
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600"
                    >
                      UPLOAD
                    </Button>
                  </DialogFooter>
                  {typeError && <Alert variant="danger">{typeError}</Alert>}
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </nav>
      </header>
    </div>
  );
}

function DownloadIcon(props: any) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function UploadIcon(props: any) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
