import React, { useEffect, useState } from "react";

const Profile: React.FC = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Erro ao parsear os dados do usuário", error);
            }
        }
    }, []);

    if (!user) {
        return <div style={styles.loading}>Carregando...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.profileInfo}>
                <div style={styles.avatarContainer}>
                    <div style={styles.avatar}>
                        <span style={styles.avatarText}>{user.nome[0]}</span>
                    </div>
                </div>
                <div style={styles.infoContainer}>
                    <h2 style={styles.name}>{user.nome}</h2>
                    <p style={styles.email}>{user.email}</p>
                </div>
            </div>

        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column" as "column",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f9",
        padding: "20px",
        marginTop: "0",
        marginLeft: "100px",
    },
    profileInfo: {
        display: "flex",
        justifyContent: "flex-start" as "flex-start",
        alignItems: "center",
        width: "100%",
    },
    infoContainer: {
        flex: 1,
        paddingLeft: "20px",
        display: "flex",
        flexDirection: "column" as "column",
        justifyContent: "center",
    },
    avatarContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "20px",
    },
    avatar: {
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        backgroundColor: "#2a3b5d",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "48px",
        fontWeight: "bold",
    },
    avatarText: {
        fontSize: "48px",
    },
    name: {
        fontSize: "28px",
        fontWeight: "600",
        color: "#333",
        marginBottom: "10px",
    },
    email: {
        fontSize: "18px",
        color: "#777",
        marginBottom: "20px",
    },
    loading: {
        textAlign: "center" as const,
        fontSize: "18px",
        color: "#999",
    }
};

export default Profile;
