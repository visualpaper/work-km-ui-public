import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import type { Metadata } from 'next'
import { RootProvider } from './context'
import theme from './theme'

const BASE_PATH = process.env.NEXT_PUBLIC_BATH_PATH

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
      <head>
        <link rel="icon" href={`${BASE_PATH}/favicon.ico`} />
      </head>
      <body>
        <AppRouterCacheProvider>
          {/* Session 情報をどこで、どうやって詰めるかは SC と CC とで結構違うはずなので今は適当 */}
          <RootProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </RootProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
