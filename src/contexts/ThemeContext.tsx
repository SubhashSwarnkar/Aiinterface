import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  isTransitioning: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('ai-interface-theme') as Theme) || 'system'
    }
    return 'system'
  })
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ai-interface-theme', theme)
    }
  }, [theme])

  const handleThemeChange = (newTheme: Theme) => {
    if (newTheme === theme) return
    
    setIsTransitioning(true)
    
    // Magical ripple effect with theme change
    setTimeout(() => {
      setTheme(newTheme)
      // Complete the magical transition
      setTimeout(() => {
        setIsTransitioning(false)
      }, 800)
    }, 400)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
