import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

const Profile: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [tennisList, setTennisList] = useState<any[]>([]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                fetchTennis(parsedUser.id);
            } catch (error) {
                console.error("Erro ao parsear os dados do usuário", error);
            }
        }
    }, []);

    const fetchTennis = async (userId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/api/tennis/usuario/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setTennisList(data);
            } else {
                console.error("Erro ao buscar os tênis", response.status);
            }
        } catch (error) {
            console.error("Erro ao fazer a requisição", error);
        }
    };

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

            <div style={styles.tennisListContainer}>
                <h3 style={styles.tennisListTitle}>Seus Anúncios</h3>
                {tennisList.length === 0 ? (
                    <p style={styles.noTennis}>Você ainda não tem anúncios.</p>
                ) : (
                    <div style={styles.tennisList}>
                        {tennisList.map((tennis: any) => (
                            <div key={tennis.id} style={styles.tennisCard}>
                                <div style={styles.imageContainer}>
                                    {tennis.imagem ? (
                                        <img
                                            src={`http://localhost:8080${tennis.imagem}`}
                                            alt={tennis.nome}
                                            style={styles.tennisImage}
                                        />
                                    ) : (
                                        <div style={styles.placeholderImage}>Imagem indisponível</div>
                                    )}
                                </div>
                                <div style={styles.tennisInfo}>
                                    <h4 style={styles.tennisName}>{tennis.nome}</h4>
                                    <p style={styles.tennisDetails}>{`Número: ${tennis.numero}`}</p>
                                    <p style={styles.tennisDetails}>{`Preço: R$ ${tennis.preco.toFixed(2)}`}</p>
                                    <p style={styles.tennisDetails}>{`Estoque: ${tennis.estoque}`}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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
    },
    tennisListContainer: {
        width: "100%",
        marginTop: "30px",
        textAlign: "center" as const,
    },
    tennisListTitle: {
        fontSize: "24px",
        fontWeight: "600",
        color: "#333",
    },
    noTennis: {
        fontSize: "18px",
        color: "#777",
    },
    tennisList: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "20px",
    },
    tennisCard: {
        width: "250px",
        borderRadius: "10px",
        overflow: "hidden",
        backgroundColor: "#fff",
        padding: "15px",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center" as const,
    },
    imageContainer: {
        width: "100%",
        height: "180px",
        display: "flex",
        alignItems: "center" as const,
        justifyContent: "center" as const,
        overflow: "hidden",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
    },
    tennisImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover" as const,
    },
    placeholderImage: {
        color: "#888",
        fontSize: "14px",
        textAlign: "center" as const,
        padding: "20px",
        backgroundColor: "#ddd",
        borderRadius: "8px",
        width: "100%",
        height: "100%",
    },
    tennisInfo: {
        textAlign: "center" as const,
        marginTop: "10px",
    },
    tennisName: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    tennisDetails: {
        fontSize: "16px",
        color: "#777",
        marginBottom: "5px",
    },
};

export default Profile;
