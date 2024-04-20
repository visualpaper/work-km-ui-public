'use client'

import KpsButton from '@/app/_components/parts/KpsButton'
import { FixedTable } from '@/app/_components/ui/FixedTable'
import { User, getUsers } from '@/app/_lib/users/user'
import { Box, CircularProgress, Typography } from '@mui/material'
import { ColumnDef } from '@tanstack/react-table'
import { useContext, useMemo, useState } from 'react'
import useSWR from 'swr'
import { RootContext } from '../../context'
import { isAppError } from '@/app/_lib/errors'

export default function CsrSample1() {
  const { setErrorMessage, clearErrorMessage } = useContext(RootContext)
  const [shouldFetch, setShouldFetch] = useState<boolean>(false)
  const [data, setData] = useState<User[]>([])
  const { mutate } = useSWR(shouldFetch ? 'getUsers' : null, getUsers, {
    onSuccess: (data: User[]) => {
      setData(data)
      setShouldFetch(false)
      clearErrorMessage()
    },
    onError: (error: any) => {
      if (isAppError(error)) {
        setErrorMessage(error!.getDisplayMessage())
      }
      setShouldFetch(false)
    },
  })
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

  const handleClick = () => {
    setShouldFetch(true)
    mutate()
  }

  return (
    <Box sx={{ padding: 10 }}>
      <Typography variant="h1">CSR Sample 1</Typography>
      <KpsButton sx={{ width: '10vw' }} onClick={handleClick}>
        <Typography variant="button">
          {shouldFetch && <CircularProgress size="1rem" />}
          {!shouldFetch && 'Read'}
        </Typography>
      </KpsButton>

      {data && <FixedTable<User | any> data={data} columns={columns} />}
    </Box>
  )
}
