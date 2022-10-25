import { useContext, useState } from 'react'
import { ThemeContext as StyledThemeContext } from 'styled-components'
//import { useThemeManager } from 'state/user/hooks'

const useTheme = () => {
 // const [isDark, toggleTheme] = useThemeManager()
  const theme = useContext(StyledThemeContext)
  const [isMobile, setIsMobile] = useState(typeof window!=='undefined' && window.innerWidth <= 960)

  typeof window!=='undefined' && window.addEventListener('resize', () => {
    setIsMobile(window.innerWidth <= 960)
  })

  // isDark,toggleTheme
  return { theme, isMobile }
}

export default useTheme