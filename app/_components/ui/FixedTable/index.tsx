import {
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from '@mui/material'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

export interface MasterTableProps<T> {
  data: T[]
  columns: ColumnDef<T, any>[]
  currentPage?: number
  setCurrentPage?: (page: number) => void
  totalPageCount?: number
}

// https://v4.mui.com/ja/customization/palette/
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.text.secondary,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export function FixedTable<T>(props: MasterTableProps<T>) {
  const { data, columns, currentPage, setCurrentPage, totalPageCount } = props
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const viewPagination = (currentPage?: number, totalPageCount?: number) => {
    if (currentPage && totalPageCount) {
      return totalPageCount > 1
    }
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>, // eslint-disable-line unused-imports/no-unused-vars
    value: number,
  ) => {
    if (setCurrentPage) {
      setCurrentPage(value)
    }
  }

  return (
    <Stack spacing={2} alignItems="center">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <StyledTableCell
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <StyledTableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <StyledTableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {viewPagination(currentPage, totalPageCount) && (
        <Pagination
          data-testid="testPagination"
          count={totalPageCount}
          page={currentPage}
          onChange={handlePageChange}
        />
      )}
    </Stack>
  )
}
