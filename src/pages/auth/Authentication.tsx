import React, { useState, useEffect } from "react";
import * as Switch from "@radix-ui/react-switch";
import { useNavigate } from "react-router-dom";

interface AuthProps {
    onLoginSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
    const [isRegister, setIsRegister] = useState(false);

    const [name, setName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const navigate = useNavigate();

    // Verifica se o usuário está logado ao carregar a página
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            // Se o usuário já estiver no localStorage, redireciona para a página principal
            navigate("/");
        }
    }, [navigate]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Enviando Cadastro:", { name, registerEmail, registerPassword });

        const response = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: name,
                email: registerEmail,
                senha: registerPassword,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Cadastro realizado com sucesso!");
            setIsRegister(false);
        } else {
            alert(data.message || "Erro ao cadastrar.");
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Enviando Login:", { loginEmail, loginPassword });

        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: loginEmail,
                senha: loginPassword,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Login realizado com sucesso!");

            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                onLoginSuccess();
                navigate("/");
            } else {
                alert("Erro: Dados do usuário não encontrados.");
            }
        } else {
            alert(data.message || "Erro ao fazer login.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.switchContainer}>
                    <span style={{ ...styles.switchText, color: !isRegister ? "#2a3b5d" : "#999" }}>
                        Login
                    </span>
                    <Switch.Root
                        style={styles.switchRoot}
                        checked={isRegister}
                        onCheckedChange={setIsRegister}
                    >
                        <Switch.Thumb
                            style={{
                                ...styles.switchThumb,
                                left: isRegister ? "21px" : "3px",
                            }}
                        />
                    </Switch.Root>
                    <span style={{ ...styles.switchText, color: isRegister ? "#2a3b5d" : "#999" }}>
                        Cadastro
                    </span>
                </div>

                {!isRegister ? (
                    <form onSubmit={handleLogin}>
                        <h2 style={styles.title}>Login</h2>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>E-mail</label>
                            <input
                                type="email"
                                style={styles.input}
                                placeholder="Digite seu e-mail"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Senha</label>
                            <input
                                type="password"
                                style={styles.input}
                                placeholder="Digite sua senha"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" style={styles.buttonLogin}>Entrar</button>
                    </form>
                ) : (
                    <form onSubmit={handleRegister}>
                        <h2 style={styles.title}>Cadastro</h2>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Nome</label>
                            <input
                                type="text"
                                style={styles.input}
                                placeholder="Digite seu nome"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>E-mail</label>
                            <input
                                type="email"
                                style={styles.input}
                                placeholder="Digite seu e-mail"
                                required
                                value={registerEmail}
                                onChange={(e) => setRegisterEmail(e.target.value)}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Senha</label>
                            <input
                                type="password"
                                style={styles.input}
                                placeholder="Digite sua senha"
                                required
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" style={styles.buttonRegister}>Cadastrar</button>
                    </form>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#F3F4F6",
    },
    card: {
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "2px 4px 11px 9px rgba(0, 0, 0, 0.1)",
        width: "350px",
        textAlign: "center" as const,
    },
    switchContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "20px",
    },
    switchText: {
        fontSize: "14px",
        fontWeight: "500",
        transition: "color 0.3s ease",
    },
    switchRoot: {
        width: "40px",
        height: "20px",
        backgroundColor: "#2a3b5d",
        borderRadius: "999px",
        position: "relative" as const,
        margin: "0 10px",
        cursor: "pointer",
        border: "0",
    },
    switchThumb: {
        width: "16px",
        height: "16px",
        backgroundColor: "#fff",
        borderRadius: "50%",
        position: "absolute" as const,
        top: "50%",
        transform: "translateY(-50%)",
        transition: "left 0.3s ease",
    },
    title: {
        fontSize: "22px",
        fontWeight: "bold",
        color: "#333",
        marginBottom: "15px",
    },
    inputGroup: {
        marginBottom: "15px",
        textAlign: "left" as const,
    },
    label: {
        display: "block",
        fontSize: "14px",
        fontWeight: "500",
        color: "#555",
        marginBottom: "5px",
    },
    input: {
        width: "100%",
        padding: "10px",
        borderRadius: "30px",
        border: "1px solid #ccc",
        fontSize: "14px",
        outline: "none",
        transition: "border-color 0.3s ease",
        boxSizing: "border-box" as "border-box",
    },
    buttonLogin: {
        width: "100%",
        backgroundColor: "#2a3b5d",
        color: "#fff",
        fontWeight: "bold",
        padding: "10px",
        borderRadius: "30px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        border: "0",
    },
    buttonRegister: {
        width: "100%",
        backgroundColor: "#2a3b5d",
        color: "#fff",
        fontWeight: "bold",
        padding: "10px",
        borderRadius: "30px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        border: "0",
    },
    message: {
        color: "#d9534f",
        fontSize: "14px",
        marginBottom: "10px",
    },
};

export default Auth;
