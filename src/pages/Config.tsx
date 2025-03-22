import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Sun } from "lucide-react";

const Config: React.FC = () => {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    // Recupera a preferência do modo escuro do localStorage
    useEffect(() => {
        const storedTheme = localStorage.getItem("isDarkMode");
        if (storedTheme) {
            setIsDarkMode(storedTheme === "true");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);

        // Salva a nova preferência no localStorage
        localStorage.setItem("isDarkMode", newTheme.toString());

        // Aplica as mudanças de tema
        document.body.style.backgroundColor = newTheme ? "#2e2e2e" : "#ffffff";
        document.body.style.color = newTheme ? "#fff" : "#000";
    };

    useEffect(() => {
        // Aplica o tema ao carregar a página
        document.body.style.backgroundColor = isDarkMode ? "#2e2e2e" : "#ffffff";
        document.body.style.color = isDarkMode ? "#fff" : "#000";
    }, [isDarkMode]);

    return (
        <div style={{ ...styles.container, backgroundColor: isDarkMode ? "#2e2e2e" : "#fff" }}>
            <button onClick={() => navigate("/Perfil")} style={styles.backButton}>
                <ArrowLeft size={24} color={isDarkMode ? "#fff" : "#333"} />
            </button>

            <h1 style={{ ...styles.title, color: isDarkMode ? "#fff" : "#333" }}>Configurações</h1>

            <div style={{ ...styles.card, backgroundColor: isDarkMode ? "#333" : "#fff" }}>
                <p style={{ ...styles.subtitle, color: isDarkMode ? "#ccc" : "#666" }}>Gerencie suas preferências</p>

                <button style={styles.button} onClick={() => alert("Sobre Nós")}>Sobre Nós</button>
                <button style={styles.button} onClick={() => alert("Editar Perfil")}>Editar Perfil</button>

                <button style={styles.toggleButton} onClick={toggleTheme}>
                    {isDarkMode ? <Sun size={20} color="#FFD700" /> : <Moon size={20} color="#fff" />}
                    <span>{isDarkMode ? "Modo Claro" : "Modo Escuro"}</span>
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column" as "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        position: "relative" as "relative",
    },
    backButton: {
        position: "absolute" as "absolute",
        top: "200px",
        left: "200px",
        background: "none",
        border: "none",
        cursor: "pointer",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        textAlign: "center" as "center",
    },
    card: {
        width: "500px",
        padding: "30px",
        borderRadius: "15px",
        textAlign: "center" as "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
    subtitle: {
        fontSize: "16px",
        marginBottom: "20px",
        marginTop: "0",
    },
    button: {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "#1C1C1C",
        color: "#fff",
        transition: "background 0.3s",
    },
    toggleButton: {
        width: "100%",
        padding: "10px",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        backgroundColor: "#444",
        color: "#fff",
        transition: "background 0.3s",
    }
};

export default Config;
