import React, { useEffect, useState } from "react";
import axios from "axios";

type Tennis = {
  id: number;
  nome: string;
  numero: number;
  cor: string | null;
  preco: number | null;
  estoque: number | null;
  imagem: string | null;
};

const TennisComponent: React.FC = () => {
  const [tennis, setTennis] = useState<Tennis[]>([]);
  const [erro, setErro] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/tennis")
      .then((response) => {
        console.log("Dados recebidos:", response.data);

        if (Array.isArray(response.data)) {
          setTennis(response.data);
        } else {
          setErro("Erro: Dados inválidos retornados pela API.");
        }
      })
      .catch((error) => {
        setErro("Houve um erro ao buscar os tênis. Tente novamente mais tarde.");
        console.error("Erro ao buscar tênis:", error);
      });
  }, []);

  return (
    <div style={styles.tennisContainer}>
      {erro && <div style={styles.error}>{erro}</div>}

      {tennis.length === 0 ? (
        <div>Carregando tênis...</div>
      ) : (
        tennis.map((tennisItem) => (
          <div className="tennis-card" style={styles.card} key={tennisItem.id}>
            <div style={styles.imageContainer}>
              {tennisItem.imagem && (
                <img
                  src={`http://localhost:8080${tennisItem.imagem}`}
                  alt={tennisItem.nome}
                  style={styles.image}
                />
              )}
            </div>
            <div style={styles.details}>
              <h3 style={styles.title}>{tennisItem.nome}</h3>
              <p style={styles.text}>
                <strong>Número:</strong> {tennisItem.numero}
              </p>
              <p style={styles.text}>
                <strong>Cor:</strong> {tennisItem.cor || "Indefinida"}
              </p>
              <p style={styles.text}>
                <strong>Estoque:</strong> {tennisItem.estoque !== null ? tennisItem.estoque : "Indisponível"}
              </p>
              <span style={styles.price}>
                R$ {tennisItem.preco ? tennisItem.preco.toFixed(2) : "Sob consulta"}
              </span>
              <button style={styles.button}>Adicionar ao Carrinho</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  tennisContainer: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "20px",
    justifyContent: "center" as const,
    margin: "20px auto",
  },
  card: {
    width: "250px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
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
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  details: {
    textAlign: "center" as const,
    marginTop: "10px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  text: {
    fontSize: "14px",
    marginBottom: "5px",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "15px",
    display: "block",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  error: {
    color: "red",
    fontSize: "16px",
    marginBottom: "20px",
  },
};
export default TennisComponent;

