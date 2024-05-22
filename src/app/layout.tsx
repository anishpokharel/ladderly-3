import "./styles/globals.css"
import { BlitzProvider } from "./blitz-client"
import { Inter } from "next/font/google"
import { DarkLightToggleProvider } from "../pages/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: { title: "New Blitz App", template: "%s – Blitz" },
  description: "Generated by blitz new ",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <BlitzProvider>
          <DarkLightToggleProvider>
            <>{children}</>
          </DarkLightToggleProvider>
        </BlitzProvider>
      </body>
    </html>
  )
}