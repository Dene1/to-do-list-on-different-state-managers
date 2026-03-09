import { createContext, useMemo, useState } from "react"

export const ThemeContext = createContext("dark")

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const changeTheme = () => setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark")

  const value = useMemo(() => ({ theme, changeTheme }), [theme]);

  return <ThemeContext value={ value }>{ children }</ThemeContext>;
}

export default ThemeProvider;