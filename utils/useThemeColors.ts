
export type ThemeMode = 'light' | 'dark'

type ThemeColors = {
  background: string
  text: string
  card: string
  border: string
  icon: string
  inputBackground: string

}

// Now you pass themeMode manually, no longer calling useColorScheme inside here
export const getThemeColors = (themeMode: ThemeMode): ThemeColors => {
  const isDark = themeMode === 'dark'

  return {
    background: isDark ? '#000' : '#F5F5F5',
    text: isDark ? '#fff' : '#000',
    card: isDark ? '#1e1e1e' : '#f9f9f9',
    border: isDark ? '#333' : '#ddd',
    icon: isDark ? '#fff' : '#000',
    inputBackground: isDark ? '#1a1a1a' : '#f0f0f0',
   
  }
}
