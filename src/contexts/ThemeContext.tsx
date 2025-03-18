import React, { createContext, useContext, useState, ReactNode } from "react";

// Definição do contexto
interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

// Criar o contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook para acessar o contexto facilmente
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
    }
    return context;
};

// Provedor do contexto de tema
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <div style={{ backgroundColor: isDarkMode ? "#121212" : "#f4f4f4", minHeight: "100vh" }}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};
