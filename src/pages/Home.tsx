import React, { useEffect, useState } from "react";
import axios from "axios";

const Produtos = () => {
  const [produtos, setProdutos] = useState<
    { id: number; nome: string; numero: number; cor: string | null; preco: number | null; estoque: number | null }[]
  >([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/produtos")
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error("Houve um erro ao buscar os produtos:", error);
      });
  }, []);

  return (
    <div style={styles.productContainer}>
      {produtos.map((produto) => (
        <div className="product-card" style={styles.card} key={produto.id}>
          <div style={styles.details}>
            <h3 style={styles.title}>{produto.nome}</h3>
            <p style={styles.text}><strong>Número:</strong> {produto.numero}</p>
            <p style={styles.text}><strong>Cor:</strong> {produto.cor || "Indefinida"}</p>
            <p style={styles.text}><strong>Estoque:</strong> {produto.estoque !== null ? produto.estoque : "Indisponível"}</p>
            <span style={styles.price}>R$ {produto.preco !== null ? produto.preco.toFixed(2) : "Sob consulta"}</span>
            <button style={styles.button}>Adicionar ao Carrinho</button>
          </div>
        </div>
      ))}
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
};

export default Produtos;
