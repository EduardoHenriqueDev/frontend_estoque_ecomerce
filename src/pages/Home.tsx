import React, { useEffect, useState } from "react";
import { ShoppingCart, Search, X, ShoppingBag } from "lucide-react";
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

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Tennis[]>([]);
  const [tennis, setTennis] = useState<Tennis[]>([]);
  const [erro, setErro] = useState<string>("");
  const [selectedTennis, setSelectedTennis] = useState<Tennis | null>(null);
  const [marcaFiltro, setMarcaFiltro] = useState<string>("");
  const [termoBusca, setTermoBusca] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const addToCart = (tennisItem: Tennis) => {
    const updatedCart = [...cartItems, tennisItem];
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    alert("Redirecionando para o checkout...");
  };

  useEffect(() => {

    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    axios
      .get("http://localhost:8080/api/tennis")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTennis(response.data);
        } else {
          setErro("Erro: Dados inválidos retornados pela API.");
        }
      })
      .catch(() => {
        setErro("Houve um erro ao buscar os tênis. Tente novamente mais tarde.");
      });

    const savedTheme = localStorage.getItem("isDarkMode");
    if (savedTheme) {
      const darkMode = JSON.parse(savedTheme);
      setIsDarkMode(darkMode);
      document.body.style.backgroundColor = darkMode ? "#2e2e2e" : "#ffffff";
      document.body.style.color = darkMode ? "#fff" : "#000";
    }
  }, []);

  const tennisFiltrados = tennis.filter(
    (tennisItem) =>
      (marcaFiltro ? tennisItem.marca === marcaFiltro : true) &&
      (termoBusca ? tennisItem.nome.toLowerCase().includes(termoBusca.toLowerCase()) : true)
  );

  return (
    <div>
      <div style={styles.header}>
        <select
          style={{
            ...styles.select,
            backgroundColor: isDarkMode ? "#333" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
          }}
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
            style={{ ...styles.searchBar, backgroundColor: isDarkMode ? "#333" : "#fff" }}
          />
          <Search size={20} style={styles.searchIcon} />
        </div>

        <ShoppingBag
          size={30}
          style={{ ...styles.shoppingBagIcon, color: isDarkMode ? "#fff" : "#000" }}
          onClick={toggleDrawer}
        />
        {cartItems.length > 0 && (
          <div style={styles.cartItemCount}>
            {cartItems.length}
          </div>
        )}
      </div>

      <div style={styles.tennisContainer}>
        {erro && <div style={styles.error}>{erro}</div>}

        {tennisFiltrados.length === 0 ? (
          <div>Nenhum tênis encontrado.</div>
        ) : (
          tennisFiltrados.map((tennisItem) => (
            <div
              className="tennis-card"
              style={{
                ...styles.card,
                backgroundColor: isDarkMode ? "#333" : "#fff",
                color: isDarkMode ? "#fff" : "#000",
              }}
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
                <span style={{ ...styles.brand, color: isDarkMode ? "#ccc" : "#555" }}>{tennisItem.marca}</span>
                <div style={styles.priceButtonContainer}>
                  <span style={styles.price}>
                    R$
                    {tennisItem.preco
                      ? tennisItem.preco.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                      : "Sob consulta"}
                  </span>
                  <button
                    style={styles.button}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(tennisItem);
                    }}
                  >
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
          <div
            style={{
              ...styles.modal,
              backgroundColor: isDarkMode ? "#333" : "#fff",
              color: isDarkMode ? "#fff" : "#000",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{ ...styles.closeButton, color: isDarkMode ? "#fff" : "#000" }}
              onClick={() => setSelectedTennis(null)}
            >
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
                <p style={{ ...styles.modalBrand, color: isDarkMode ? "#ccc" : "#555" }}>
                  {selectedTennis.marca}
                </p>
                <p>
                  <strong>Número:</strong> {selectedTennis.numero}
                </p>
                <p>
                  <strong>Cor:</strong> {selectedTennis.cor || "Indisponível"}
                </p>
                <p style={styles.modalPrice}>
                  R$
                  {selectedTennis.preco
                    ? selectedTennis.preco.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                    : "Sob consulta"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ ...styles.drawer, right: isDrawerOpen ? "0" : "-400px" }}>
        <button style={styles.closeButton} onClick={toggleDrawer}>
          <X
            size={30}
            style={{ ...styles.shoppingBagIcon, color: isDarkMode ? "#fff" : "#000" }}
            onClick={toggleDrawer}
          />
        </button>
        <h2 style={styles.drawerTitle}>Carrinho</h2>

        {cartItems.length === 0 ? (
          <p style={styles.emptyCart}>Seu carrinho está vazio.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} style={styles.cartItem}>
              <img
                src={`http://localhost:8080${item.imagem}`}
                alt={item.nome}
                style={styles.cartImage}
              />
              <div style={styles.cartDetails}>
                <p style={styles.cartName}>{item.nome}</p>
                <p style={styles.cartPrice}>
                  R$ {item.preco ? item.preco.toFixed(2) : "Sob consulta"}
                </p>
                <button onClick={() => removeFromCart(item.id)} style={styles.removeButton}>
                  REMOVER
                </button>
              </div>
            </div>
          ))
        )}

        <div style={styles.cartFooter}>
          <p style={styles.totalPrice}>
            Total: R$ {cartItems.reduce((acc, item) => acc + (item.preco || 0), 0).toFixed(2)}
          </p>
          <button style={styles.continueButton} onClick={handleCheckout}>
            Continuar
          </button>
        </div>
      </div>

    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 20px",
    borderRadius: "8px",
    gap: "20px",
  },
  select: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "30px",
    fontWeight: "bold",
    flexShrink: 0,
    border: "2px solid #ff0000",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    maxWidth: "400px",
  },
  searchBar: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "30px",
    border: "2px solid #ff0000",
    width: "100%",
  },
  searchIcon: {
    marginLeft: "-30px",
    cursor: "pointer",
  },
  shoppingBagIcon: {
    cursor: "pointer",
    flexShrink: 0,
    position: "relative" as const,
  },
  cartItemCount: {
    position: "absolute" as const,
    top: "10px",
    right: "10px",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "#ff0000",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  brand: {
    fontSize: "14px",
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
  },
  card: {
    width: "250px",
    borderRadius: "10px",
    boxShadow: "2px 4px 11px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
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
    backgroundColor: "transparent",
    color: "#ff0000",
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
  drawer: {
    position: "fixed" as const,
    top: 0,
    right: "-400px",
    width: "300px",
    height: "100vh",
    boxShadow: "-5px 0 10px rgba(0,0,0,0.2)",
    background: "linear-gradient(135deg, #1C1C1C, #000000)",
    padding: "20px",
    transition: "right 0.3s ease-in-out",
    overflowY: "auto" as const,
    zIndex: 1000,
  },
  drawerTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  emptyCart: {
    textAlign: "center" as const,
    fontSize: "16px",
    color: "#555",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
  },
  cartImage: {
    width: "60px",
    height: "60px",
    borderRadius: "8px",
    marginRight: "10px",
    objectFit: "cover" as const,
  },
  cartDetails: {
    flex: 1,
  },
  cartName: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  cartPrice: {
    fontSize: "14px",
    color: "#ff0000",
  },
  removeButton: {
    background: "none",
    border: "none",
    color: "#ffffff",
    cursor: "pointer",
    padding: "5px",
    marginLeft: "10px",
  },
  cartFooter: {
    bottom: "0",
    left: "0",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "30px",
    paddingLeft: "10px",
  },
  totalPrice: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#ff0000",
  },
  continueButton: {
    backgroundColor: "transparent",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
  },
};

export default TennisComponent;
