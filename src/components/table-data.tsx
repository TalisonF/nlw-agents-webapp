'use client';

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { CheckCircle, File, FileCheck, FileX, Loader2 } from 'lucide-react';
import { useState } from 'react';
import Markdown from 'react-markdown';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export type Document = {
  id: string;
  status: 'processing_queued' | 'processed' | 'process_fail';
  resumeIA?: string;
  filename: string;
};

export const columns: ColumnDef<Document>[] = [
  {
    accessorKey: 'filename',
    header: 'Filename',
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className="flex flex-col items-center gap-2">
          {status === 'processed' && (
            <FileCheck className=" text-green-400" size={30} />
          )}
          {status === 'processing_queued' && (
            <Loader2 className="animate-spin text-orange-300" size={30} />
          )}
          {status === 'process_fail' && (
            <FileX className="text-red-500" size={30} />
          )}
          <div className="text-wrap text-center">
            {row.getValue('filename')}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'resumeIA',
    header: 'Descrição',
    cell: ({ row }) => {
      const resumeIA = (row.getValue('resumeIA') as string) || '';
      return (
        <div className="text-wrap">
          <Markdown>{resumeIA}</Markdown>
        </div>
      );
    },
  },
];

export function DataTable({ data }: { data: Document[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="mt-8">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-state={row.getIsSelected() && 'selected'}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
