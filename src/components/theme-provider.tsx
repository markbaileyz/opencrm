
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Force light theme by removing enableSystem and setting defaultTheme to light
  return <NextThemesProvider defaultTheme="light" {...props}>{children}</NextThemesProvider>
}
