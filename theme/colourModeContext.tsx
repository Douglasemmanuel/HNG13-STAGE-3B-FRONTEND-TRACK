


import React, { createContext, useContext, useState, ReactNode , useEffect } from 'react'
import { getThemeColors, ThemeMode } from '../utils/useThemeColors'
import AsyncStorage from '@react-native-async-storage/async-storage';
type ColorModeContextType = {
  themeMode: ThemeMode
  colors: ReturnType<typeof getThemeColors>
  toggleTheme: () => void
}
const STORAGE_KEY = 'APP_THEME_MODE'

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined)

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')
  const [isLoaded, setIsLoaded] = useState(false)

  // Load theme from AsyncStorage on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(STORAGE_KEY)
        if (storedTheme === 'light' || storedTheme === 'dark') {
          setThemeMode(storedTheme)
        }
      } catch (error) {
        console.warn('Failed to load theme from storage:', error)
      } finally {
        setIsLoaded(true)
      }
    }

    loadTheme()
  }, [])

  const toggleTheme = async () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light'
    try {
      await AsyncStorage.setItem(STORAGE_KEY, newTheme)
      setThemeMode(newTheme)
    } catch (error) {
      console.error('Failed to save theme:', error)
    }
  }

 

  const colors = getThemeColors(themeMode)

  return (
    <ColorModeContext.Provider value={{ themeMode, colors, toggleTheme }}>
      {children}
    </ColorModeContext.Provider>
  )
}

export const useColorMode = (): ColorModeContextType => {
  const context = useContext(ColorModeContext)
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider')
  }
  return context
}
