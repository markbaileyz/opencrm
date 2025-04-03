
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Force light theme only
  return <NextThemesProvider forcedTheme="light" defaultTheme="light" enableSystem={false} {...props}>{children}</NextThemesProvider>
}
