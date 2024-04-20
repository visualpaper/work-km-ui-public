'use client'

import { FixedTable } from '@/app/_components/ui/FixedTable'
import { User, getUsers } from '@/app/_lib/users/user'
import { Box, CircularProgress, Typography } from '@mui/material'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import useSWR from 'swr'

export default function CsrSample1() {
  const { data, error, isLoading } = useSWR('getUsers', getUsers)
  const columns = useMemo<ColumnDef<User | any>[]>(
    () => [
      {
        header: 'Id',
        size: 10,
        accessorKey: 'id',
      },
      {
        header: 'Name',
        accessorKey: 'name',
      },
    ],
    [],
  )

  return (
    <Box sx={{ padding: 10 }}>
      <Typography variant="h1"> CSR Sample 1</Typography>
      {isLoading && <CircularProgress />}
      {data && <FixedTable<User | any> data={data} columns={columns} />}
    </Box>
  )
}
