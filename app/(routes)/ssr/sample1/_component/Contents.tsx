'use client'

import KpsButton from '@/app/_components/parts/KpsButton'
import { FixedTable } from '@/app/_components/ui/FixedTable'
import { User } from '@/app/_lib/users/user'
import { Box, Typography } from '@mui/material'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { startTransition, useContext, useEffect, useMemo } from 'react'
import { RootContext } from '../../../context'

export const Contents: React.FC<{
  users?: User[]
  errorMessage?: string
}> = ({ users, errorMessage }) => {
  const router = useRouter()
  const { setErrorMessage, clearErrorMessage } = useContext(RootContext)
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

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(errorMessage)
    } else {
      clearErrorMessage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage])

  const handleClick = () => {
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <Box sx={{ padding: 10 }}>
      <Typography variant="h1">SSR Sample</Typography>
      <KpsButton sx={{ width: '10vw' }} onClick={handleClick}>
        <Typography variant="button">Read</Typography>
      </KpsButton>
      {users && <FixedTable<User | any> data={users} columns={columns} />}
    </Box>
  )
}
