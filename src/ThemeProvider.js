import { createContext, useState, useContext } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

const ThemeContext = createContext();

// Default Theme
const defaultTheme = {
  primaryColor: "#ff6b6b",
  secondaryColor: "#ffde59",
  backgroundColor: "#fff",
  textColor: "#333",
  fontFamily: "Poppins, sans-serif",
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  const updateTheme = (newTheme) => {
    setTheme((prev) => ({ ...prev, ...newTheme }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);