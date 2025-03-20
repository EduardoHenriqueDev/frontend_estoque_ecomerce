import React, { useState } from "react";
import * as Switch from "@radix-ui/react-switch";

const Auth: React.FC = () => {
    const [isRegister, setIsRegister] = useState(false);

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
                    <form>
                        <h2 style={styles.title}>Login</h2>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>E-mail</label>
                            <input type="email" style={styles.input} placeholder="Digite seu e-mail" required />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Senha</label>
                            <input type="password" style={styles.input} placeholder="Digite sua senha" required />
                        </div>

                        <button type="submit" style={styles.buttonLogin}>Entrar</button>
                    </form>
                ) : (
                    <form>
                        <h2 style={styles.title}>Cadastro</h2>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Nome</label>
                            <input type="text" style={styles.input} placeholder="Digite seu nome" required />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>E-mail</label>
                            <input type="email" style={styles.input} placeholder="Digite seu e-mail" required />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Senha</label>
                            <input type="password" style={styles.input} placeholder="Digite sua senha" required />
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
};

export default Auth;
