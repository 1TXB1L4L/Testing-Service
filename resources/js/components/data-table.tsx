import React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    ColumnFiltersState,
    SortingState,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TableHeader,
} from "./ui/table";
import { Rows } from "lucide-react";

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData>[];
    data: TData[];
};

function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        <div className="border rounded p-5">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map(row()(
                    <TableRow key={row.id}
                    data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                    {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                    )}
                    </TableCell>
                    ))}
                    </TableRow>
                    ))) : (
                    <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center">
                                    No Results
                                </TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default DataTable;
