import React from "react";
import torch from "../assets/img/torch4.png"

const ProductCard: React.FC = () => {
  return (
    <div style={styles.productContainer}>
      {Array(15).fill(0).map((_, index) => (
        <div className="product-card" style={styles.card} key={index}>
          <img src={torch} alt="Tênis" style={styles.image}/>
          <div style={styles.details}>
            <h3 style={styles.title}>Tênis Nike Air Max</h3>
            <span style={styles.price}>R$ 499,99</span>
            <button style={styles.button}>Adicionar ao Carrinho</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  productContainer: {
    display: "flex" as "flex",
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
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover" as "cover",
  },
  details: {
    padding: "15px",
    textAlign: "center" as "center",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "15px",
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

export default ProductCard;
