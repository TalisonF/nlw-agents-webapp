import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { AudioLines, Type } from 'lucide-react';
import Markdown from 'react-markdown';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export type DataChunk = {
  id: string;
  text: string;
  typeOfInput: 'audio' | 'text';
  createdAt: string;
};

export const columns: ColumnDef<DataChunk>[] = [
  {
    accessorKey: 'typeOfInput',
    header: 'Tipo',
    cell: ({ row }) => {
      const type = row.original.typeOfInput;
      return (
        <div className="flex flex-col items-center gap-2">
          {type === 'audio' && (
            <AudioLines className="text-green-400" size={30} />
          )}
          {type === 'text' && <Type className="text-green-400" size={30} />}
        </div>
      );
    },
  },
  {
    accessorKey: 'text',
    header: 'Texto',
    cell: ({ row }) => (
      <div className="text-wrap">
        <span>{row.getValue('text')}</span>
      </div>
    ),
  },
];

export function ChunkTable({ data }: { data: DataChunk[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
