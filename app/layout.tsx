import React from "react"
import type { Metadata } from 'next'
import ThemeRegistry from './global.theme.registry'

import Navigation from './ui/Navigation'

import './globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

export const metadata: Metadata = {
  title: '股票小助理',
  description: '協助你分析股票，並提供多種客製化的股票組合',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>
          <Navigation />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}