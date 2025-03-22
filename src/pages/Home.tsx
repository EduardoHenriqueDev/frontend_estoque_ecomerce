import React, { useEffect, useState } from "react";
import { ShoppingCart, Search, X } from "lucide-react";
import axios from "axios";

const marcasDisponiveis = ["Nike", "Jordan", "Adidas", "Puma", "Vans", "Reebok", "Asics", "Mizuno"];

type Tennis = {
  id: number;
  nome: string;
  marca: string;
  numero: number;
  cor: string | null;
  preco: number | null;
  imagem: string | null;
};

const TennisComponent: React.FC = () => {
  const [tennis, setTennis] = useState<Tennis[]>([]);
  const [erro, setErro] = useState<string>("");
  const [selectedTennis, setSelectedTennis] = useState<Tennis | null>(null);
  const [marcaFiltro, setMarcaFiltro] = useState<string>("");
  const [termoBusca, setTermoBusca] = useState<string>("");

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

  const tennisFiltrados = tennis.filter(
    (tennisItem) =>
      (marcaFiltro ? tennisItem.marca === marcaFiltro : true) &&
      (termoBusca ? tennisItem.nome.toLowerCase().includes(termoBusca.toLowerCase()) : true)
  );

  return (
    <div>
      <div style={styles.filterContainer}>
        <select
          style={styles.select}
          value={marcaFiltro}
          onChange={(e) => setMarcaFiltro(e.target.value)}
        >
          <option value="">Todas as Marcas</option>
          {marcasDisponiveis.map((marca) => (
            <option key={marca} value={marca}>
              {marca}
            </option>
          ))}
        </select>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            style={styles.searchBar}
          />
          <Search size={20} style={styles.searchIcon} />
        </div>
      </div>

      <div style={styles.tennisContainer}>
        {erro && <div style={styles.error}>{erro}</div>}

        {tennisFiltrados.length === 0 ? (
          <div>Nenhum tênis encontrado.</div>
        ) : (
          tennisFiltrados.map((tennisItem) => (
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
                <span style={styles.brand}>{tennisItem.marca}</span>
                <div style={styles.priceButtonContainer}>
                  <span style={styles.price}>
                    R${tennisItem.preco ? tennisItem.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "Sob consulta"}
                  </span>
                  <button style={styles.button}>
                    <ShoppingCart size={25} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedTennis && (
        <div style={styles.modalOverlay} onClick={() => setSelectedTennis(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={() => setSelectedTennis(null)}>
              <X size={25} />
            </button>
            <div style={styles.modalContent}>
              {selectedTennis.imagem && (
                <img
                  src={`http://localhost:8080${selectedTennis.imagem}`}
                  alt={selectedTennis.nome}
                  style={styles.modalImage}
                />
              )}
              <div style={styles.modalDetails}>
                <h2 style={styles.modalTitle}>{selectedTennis.nome}</h2>
                <p style={styles.modalBrand}>{selectedTennis.marca}</p>
                <p><strong>Número:</strong> {selectedTennis.numero}</p>
                <p><strong>Cor:</strong> {selectedTennis.cor || "Indisponível"}</p>
                <p style={styles.modalPrice}>R${selectedTennis.preco ? selectedTennis.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "Sob consulta"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  filterContainer: {
    display: "flex",
    justifyContent: "left",
    margin: "20px",
    marginLeft: "120px",
  },
  select: {
    padding: "5px",
    marginBottom: "20px",
    fontSize: "16px",
    borderRadius: "30px",
    fontWeight: "bold",
    border: "2px solid #ff0000",
  },
  searchContainer: {
    display: "flex",
    marginLeft: "20px",
    alignItems: "center",
  },
  searchBar: {
    padding: "5px",
    fontSize: "16px",
    borderRadius: "30px",
    border: "2px solid #ff0000",
    width: "500px",
    height: "20px",
    marginLeft: "300px",
  },
  searchIcon: {
    marginLeft: "10px",
    cursor: "pointer",
  },
  brand: {
    fontSize: "14px",
    color: "#555",
    fontWeight: "bold",
    marginBottom: "5px",
    textTransform: "uppercase" as const,
  },
  tennisContainer: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "20px",
    justifyContent: "center" as const,
    margin: "20px auto",
    marginLeft: "120px",
  },
  card: {
    width: "250px",
    borderRadius: "10px",
    boxShadow: "2px 4px 11px 8px rgba(0, 0, 0, 0.1)",
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
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  priceButtonContainer: {
    display: "flex",
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    width: "100%",
    marginTop: "auto",
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
    width: "500px",
    height: "auto",
    borderRadius: "8px",
    marginRight: "20px",
  },
  modalDetails: {
    textAlign: "left" as const,
  },
  modalTitle: {
    fontSize: "-webkit-xxx-large",
    margin: "0",
  },
  modalBrand: {
    fontSize: "xx-large",
    color: "#555",
    fontWeight: "bold",
  },
  modalPrice: {
    fontSize: "-webkit-xxx-large",
    fontWeight: "bold",
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
