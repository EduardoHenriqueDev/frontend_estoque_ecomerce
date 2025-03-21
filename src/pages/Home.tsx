import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import axios from "axios";

type Tennis = {
  id: number;
  nome: string;
  numero: number;
  cor: string | null;
  preco: number | null;
  imagem: string | null;
};

const TennisComponent: React.FC = () => {
  const [tennis, setTennis] = useState<Tennis[]>([]);
  const [erro, setErro] = useState<string>("");
  const [selectedTennis, setSelectedTennis] = useState<Tennis | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/tennis")
      .then((response) => {
        console.log("Dados recebidos:", response.data);

        // Verificar se a resposta é um array válido
        if (Array.isArray(response.data)) {
          setTennis(response.data);
        } else {
          setErro("Erro: Dados inválidos retornados pela API.");
        }
      })
      .catch((error) => {
        setErro(
          "Houve um erro ao buscar os tênis. Tente novamente mais tarde."
        );
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
          <div
            className="tennis-card"
            style={styles.card}
            key={tennisItem.id} 
            onClick={() => setSelectedTennis(tennisItem)}
          >
            <div style={styles.imageContainer}>
              {tennisItem.imagem ? (
                <img
                  src={`http://localhost:8080${tennisItem.imagem}`}
                  alt={tennisItem.nome}
                  style={styles.image}
                />
              ) : (
                <div style={styles.placeholderImage}>Imagem indisponível</div>
              )}
            </div>
            <div style={styles.details}>
              <h3 style={styles.title}>{tennisItem.nome}</h3>
              <div style={styles.priceButtonContainer}>
                <span style={styles.price}>
                  R${" "}
                  {tennisItem.preco
                    ? tennisItem.preco.toFixed(2)
                    : "Sob consulta"}
                </span>
                <button style={styles.button}>
                  <ShoppingCart size={25} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {selectedTennis && (
        <div style={styles.modalOverlay} onClick={() => setSelectedTennis(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedTennis(null)} style={styles.closeButton}>×</button>
            <div style={styles.modalContent}>
              {selectedTennis.imagem ? (
                <img
                  src={`http://localhost:8080${selectedTennis.imagem}`}
                  alt={selectedTennis.nome}
                  style={styles.modalImage}
                />
              ) : (
                <div style={styles.placeholderImage}>Imagem indisponível</div>
              )}
              <div style={styles.modalDetails}>
                <h2>{selectedTennis.nome}</h2>
                <ul>
                  <li><strong>Cor:</strong> {selectedTennis.cor || "Indisponível"}</li>
                  <li><strong>Número:</strong> {selectedTennis.numero}</li>
                  <li><strong>Preço:</strong> R${selectedTennis.preco ? selectedTennis.preco.toFixed(2) : "Sob consulta"}</li>
                </ul>
                <button style={styles.button}>
                  <ShoppingCart size={25} />
                </button>
              </div>
            </div>
          </div>
        </div>
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
    marginLeft: "100px",
  },
  card: {
    width: "250px",
    borderRadius: "10px",
    boxShadow: "2px 4px 11px 9px rgba(0, 0, 0, 0.1)",
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
  details: {
    textAlign: "center" as const,
    marginTop: "10px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  priceButtonContainer: {
    display: "flex",
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    width: "100%",
    marginTop: "10px",
    padding: "0 10px",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  button: {
    padding: "10px",
    backgroundColor: "#fff",
    color: "#007bff",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginLeft: "90px",
  },
  error: {
    color: "red",
    fontSize: "16px",
    marginBottom: "20px",
  },
  modalOverlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center" as const,
    position: "relative" as const,
  },
  modalContent: {
    display: "flex",
    alignItems: "center" as const,
  },
  modalImage: {
    width: "200px",
    height: "auto",
    borderRadius: "8px",
    marginRight: "20px",
  },
  modalDetails: {
    textAlign: "left" as const,
  },
  closeButton: {
    position: "absolute" as const,
    top: "10px",
    right: "10px",
    border: "none",
    background: "none",
    fontSize: "30px",
    cursor: "pointer",
  },
};

export default TennisComponent;
