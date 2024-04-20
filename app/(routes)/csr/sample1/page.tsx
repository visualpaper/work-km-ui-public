'use client'

import KpsButton from '@/app/_components/parts/KpsButton'
import { FixedTable } from '@/app/_components/ui/FixedTable'
import { isAppError } from '@/app/_lib/errors'
import { User, getUsers } from '@/app/_lib/users/user'
import { Box, CircularProgress, Typography } from '@mui/material'
import { ColumnDef } from '@tanstack/react-table'
import { useContext, useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { RootContext } from '../../context'

// Clinet Component の場合、以下の特性がある。
// * import 可能なコンポーネントは Client Component のみ
//   ※ つまり、配下におけるコンポーネントは Client Component 以外はダメということ。
//   ※ ネストさせれば実現できなくはないが、Layout.tsx 以外ではかなり実現しにくいはず。
//   (参照) https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns
//
//   上記の通り、枝葉に Client Component を寄せることを NextJS では推奨している。
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

  useEffect(() => {
    setShouldFetch(true)
    mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
