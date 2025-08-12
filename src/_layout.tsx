import { ThemeProvider } from "./pages/theme/theme-provider" 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="pt-br" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            defaultTheme="system"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
