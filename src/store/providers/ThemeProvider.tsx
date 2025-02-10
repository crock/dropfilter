'use client'

import { ThemeProvider } from 'next-themes'
import IProvider from "./IProvider"

export default function Theme({ children }: IProvider) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} themes={['light', 'dark']}>
      {children}
    </ThemeProvider>
  )
}
