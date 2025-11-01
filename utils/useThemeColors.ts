
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
    background: isDark ? '#171823' : '#FAFAFA',
    text: isDark ? '#C8CBE7' : '#494C6B',
    card: isDark ? '#494C6B' : '#f9f9f9',
    border: isDark ? '#393A4B' :  '#FFFFFF',
    icon: isDark ? '#393A4B' : '#E3E4F1',
    inputBackground: isDark ? '#1a1a1a' : '#f0f0f0',
   
  }
}










