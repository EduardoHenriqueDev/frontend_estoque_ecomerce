import React, { useEffect, useState } from "react";
import axios from "axios";

type Produto = {
  id: number;
  nome: string;
  numero: number;
  cor: string | null;
  preco: number | null;
  estoque: number | null;
  imagem: string | null;  
};

const Produtos = () => {
  
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [erro, setErro] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/tennis")
      .then((response) => {
        console.log("Dados recebidos:", response.data);  
        
        if (Array.isArray(response.data)) {
          setProdutos(response.data);  
        } else {
          setErro("Erro: Dados inválidos retornados pela API.");
        }
      })
      .catch((error) => {
        setErro("Houve um erro ao buscar os produtos. Tente novamente mais tarde."); 
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  return (
    <div style={styles.productContainer}>
      {erro && <div style={styles.error}>{erro}</div>}

      {produtos.length === 0 ? (
        <div>Carregando produtos...</div>
      ) : (
        produtos.map((produto) => (
          <div className="product-card" style={styles.card} key={produto.id}>
            <div style={styles.details}>
              {produto.imagem && (
                <img
                  src={`http://localhost:8080/uploads/${produto.imagem}`} 
                  alt={produto.nome}
                  style={{
                    width: "100%", 
                    height: "150px", // Mantém a altura consistente
                    objectFit: "contain", // Faz a imagem caber sem cortes
                    display: "block", 
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
              )}
              <h3 style={styles.title}>{produto.nome}</h3>
              <p style={styles.text}>
                <strong>Número:</strong> {produto.numero}
              </p>
              <p style={styles.text}>
                <strong>Cor:</strong> {produto.cor || "Indefinida"}
              </p>
              <p style={styles.text}>
                <strong>Estoque:</strong> {produto.estoque !== null ? produto.estoque : "Indisponível"}
              </p>
              <span style={styles.price}>
                R$ {produto.preco !== null && produto.preco !== undefined ? produto.preco.toFixed(2) : "Sob consulta"}
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
  productContainer: {
    display: "flex",
    flexWrap: "wrap" as "wrap",
    gap: "20px",
    justifyContent: "center" as "center",
    margin: "20px auto",
    marginLeft: "70px",
  },
  card: {
    width: "250px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    backgroundColor: "#fff",
    padding: "15px",
  },
  details: {
    textAlign: "center" as "center",
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

export default Produtos;
