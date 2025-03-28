import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Moon, Sun, Info, Pencil } from "lucide-react";
import logo from "../assets/img/logo.png";

const Config: React.FC = () => {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("isDarkMode");
        if (storedTheme) {
            setIsDarkMode(storedTheme === "true");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);

        localStorage.setItem("isDarkMode", newTheme.toString());

        document.body.style.backgroundColor = newTheme ? "#2e2e2e" : "#ffffff";
        document.body.style.color = newTheme ? "#fff" : "#000";
    };

    useEffect(() => {
        document.body.style.backgroundColor = isDarkMode ? "#2e2e2e" : "#ffffff";
        document.body.style.color = isDarkMode ? "#fff" : "#000";
    }, [isDarkMode]);

    return (
        <div style={{ ...styles.container, backgroundColor: isDarkMode ? "#2e2e2e" : "#fff" }}>

            <img src={logo} alt="Logo" style={styles.logo} />

            <div style={styles.header}>
                <button onClick={() => navigate("/Perfil")} style={styles.backButton}>
                    <ChevronLeft size={40} color={isDarkMode ? "#fff" : "#333"} />
                </button>
                <h1 style={{ ...styles.title, color: isDarkMode ? "#fff" : "#333" }}>Configurações</h1>
            </div>

            <div style={{ ...styles.card, backgroundColor: isDarkMode ? "#2e2e2e" : "#fff" }}>
                <p style={{ ...styles.subtitle, color: isDarkMode ? "#ccc" : "#666" }}>Gerencie suas preferências</p>

                <button style={styles.button} onClick={() => alert("Sobre Nós")}>
                    <Info size={20} />
                    Sobre Nós</button>
                <button style={styles.button} onClick={() => alert("Editar Perfil")}>
                    <Pencil size={20} />
                    Editar Perfil</button>

                <button style={styles.toggleButton} onClick={toggleTheme}>
                    {isDarkMode ? <Sun size={20} color="#FFD700" /> : <Moon size={20} color="#fff" />}
                    <span>{isDarkMode ? "Modo Claro" : "Modo Escuro"}</span>
                </button>
            </div>
        </div>
    );
};

const styles = {
    logo: {
        height: "200px",
        width: "200px",
        marginTop: "20px",
    },
    container: {
        display: "flex",
        flexDirection: "column" as "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        position: "relative" as "relative",
    },
    backButton: {
        background: "none",
        border: "none",
        cursor: "pointer",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        textAlign: "left" as const,
    },
    header: {
        display: "flex",
        alignItems: "center",
        padding: "20px",
        justifyContent: "flex-start",
        gap: "10px",
    },
    card: {
        width: "500px",
        padding: "30px",
        borderRadius: "15px",
        textAlign: "center" as "center",
    },
    subtitle: {
        fontSize: "16px",
        marginBottom: "20px",
        marginTop: "0",
    },
    button: {
        width: "100%",
        padding: "10px",
        border: "none",
        marginBottom: "10px",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        backgroundColor: "#1c1c1c",
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
        backgroundColor: "#1c1c1c",
        color: "#fff",
        transition: "background 0.3s",
    }
};

export default Config;
