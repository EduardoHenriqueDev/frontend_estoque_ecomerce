import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{ ...styles.sidebar, width: isOpen ? "170px" : "90px" }}>
      <div style={styles.logoContainer}>
        <img
          src={logo}
          alt="Logo"
          style={{
            width: isOpen ? "120px" : "40px",
            transition: "width 0.3s",
          }}
        />
        <button onClick={() => setIsOpen(!isOpen)} style={styles.toggleButton}>
          {isOpen ? "◀" : "▶"}
        </button>
      </div>

      {/* Links da Sidebar */}
      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.link}>
            🏠 {isOpen && "Home"}
          </Link>
        </li>
        <li>
          <Link to="/produtos" style={styles.link}>
            📦 {isOpen && "Produtos"}
          </Link>
        </li>
        <li>
          <Link to="/sobre" style={styles.link}>
            ℹ️ {isOpen && "Sobre"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    height: "100vh",
    backgroundColor: "#182336",
    color: "white",
    paddingTop: "20px",
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    transition: "width 0.3s",
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  logo: {
    width: "120px",
    transition: "none",
  },
  toggleButton: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  navLinks: {
    listStyle: "none",
    padding: 0,
    width: "100%",
  },
  link: {
    textDecoration: "none",
    color: "white",
    display: "flex",
    alignItems: "center",
    padding: "10px",
  },
};

export default Sidebar;
