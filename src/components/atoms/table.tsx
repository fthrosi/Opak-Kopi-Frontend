import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export interface Column<T = any> {
  id: keyof T | string; // ← Support both object keys and custom strings
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  renderCell?: (row: T) => React.ReactNode;
  format?: (value: any, row: T) => React.ReactNode; // ← Support custom rendering
  sortable?: boolean;
}

interface ReusableTableProps<T = any> {
  columns: readonly Column<T>[]; // ← Column config
  data: T[]; // ← Generic data array
  loading?: boolean; // ← Loading state
  emptyMessage?: string; // ← Custom empty message
  rowsPerPageOptions?: number[]; // ← Pagination options
  defaultRowsPerPage?: number; // ← Default page size
  stickyHeader?: boolean; // ← Sticky header option
  maxHeight?: number | string; // ← Table max height
  onRowClick?: (row: T, index: number) => void; // ← Row click handler
  getRowId?: (row: T, index: number) => string | number; // ← Custom row ID
  className?: string; // ← Custom styling
  tableClassName?: string; // ← Table specific styling
}
export default function ReusableTable<T = any>({
  columns,
  data,
  loading = false,
  emptyMessage = "Tidak ada data",
  rowsPerPageOptions = [10, 25, 50],
  defaultRowsPerPage = 10,
  stickyHeader = true,
  maxHeight = 440,
  onRowClick,
  getRowId,
  className = "",
  tableClassName = "",
}: ReusableTableProps<T>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // ← Helper function to get cell value
  const getCellValue = (row: T, columnId: string | keyof T): any => {
    if (typeof columnId === "string" && columnId.includes(".")) {
      // ← Support nested properties like 'user.name'
      return columnId
        .split(".")
        .reduce((obj: any, key: string) => obj?.[key], row);
    }
    return (row as any)[columnId];
  };

  // ← Helper function to get row ID
  const getRowKey = (row: T, index: number): string | number => {
    if (getRowId) {
      return getRowId(row, index);
    }
    // ← Try common ID fields
    const commonIds = ["id", "code", "key"];
    for (const idField of commonIds) {
      if ((row as any)[idField] !== undefined) {
        return (row as any)[idField];
      }
    }
    return index;
  };

  // ← Loading state
  if (loading) {
    return (
      <Paper sx={{ width: "100%", overflow: "hidden" }} className={className}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={200}
        >
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  // ← Empty state
  if (!data || data.length === 0) {
    return (
      <Paper sx={{ width: "100%", overflow: "hidden" }} className={className}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={200}
          color="text.secondary"
        >
          {emptyMessage}
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", height: "100%",display:"flex",flexDirection:"column" }} className={className}>
      <TableContainer sx={{ maxHeight,flex:1 }} >
        <Table
          stickyHeader={stickyHeader}
          aria-label="reusable table"
          className={tableClassName}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#F5EDE1",
                    fontWeight: "bold",
                    color: "#9B5A26"
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const rowKey = getRowKey(row, index);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={rowKey}
                    onClick={() => onRowClick?.(row, index)}
                    sx={{ cursor: onRowClick ? "pointer" : "default" }}
                  >
                    {columns.map((column) => {
                      const value = getCellValue(row, column.id);
                      return (
                        <TableCell key={String(column.id)} align={column.align} style={{
                            color: "#9B5A26"
                        }}>
                          {column.renderCell ? (column.renderCell(row)) : column.format
                            ? column.format(value, row) // ← Custom formatting with row access
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
      sx={{ flexShrink: 0 }}
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Baris per halaman:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} dari ${count !== -1 ? count : `lebih dari ${to}`}`
        }
      />
    </Paper>
  );
}
