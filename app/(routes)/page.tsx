import { Box } from '@mui/material'
import Link from 'next/link'

export default async function Home() {
  return (
    <Box sx={{ padding: 10 }}>
      <Link href="/csr/sample1">CSR - Sample 1</Link>
      <br />
      <Link href="/ssr/sample1">SSR - Sample 1</Link>
    </Box>
  )
}
