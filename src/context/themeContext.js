import React, { createContext, useState } from 'react'


const ThemeContext = createContext( );
const ThemeProvider = ({children}) => {
    const [lightTheme, setLightTheme] = useState(true); 
    const setTheme = (theme) =>setLightTheme(theme);
  return (
    <ThemeContext.Provider value={{lightTheme, setTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}

export {ThemeContext, ThemeProvider}