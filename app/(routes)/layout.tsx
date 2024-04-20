import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'

export const metadata: Metadata = {
  title: 'KM UI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
