import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'
import { UserProvider } from './context'

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
          {/* Session 情報をどこで、どうやって詰めるかは SC と CC とで結構違うはずなので今は適当 */}
          <UserProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </UserProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
