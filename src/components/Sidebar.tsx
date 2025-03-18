import React from "react";
import { Link } from "react-router-dom";
import { Footprints, House, Info, Sun, Moon } from "lucide-react";
import logo from "../assets/img/logo.png";

interface SidebarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <div style={{ ...styles.sidebar, }}
    >
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </div>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.link}>
            <House size={35} color="#fff" />
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/produtos" style={styles.link}>
            <Footprints size={35} color="#fff" />
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/sobre" style={styles.link}>
            <Info size={35} color="#fff" />
          </Link>
        </li>
      </ul>

      {/* Toggle de Modo Escuro/Claro */}
      <button style={styles.toggleButton} onClick={toggleTheme}>
        {isDarkMode ? <Sun size={25} color="#fff" /> : <Moon size={25} color="#fff" />}
      </button>
    </div>
  );
};

const styles = {
  sidebar: {
    height: "100vh",
    width: "100px",
    backgroundColor: "#182336",
    color: "white",
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    paddingTop: "20px",
    borderBottomRightRadius: "20px",
    borderTopRightRadius: "20px",
  },
  logoContainer: {
    marginBottom: "20px",
  },
  logo: {
    width: "70px",
    marginTop: "10px",
  },
  navLinks: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column" as "column",
    gap: "15px",
  },
  navItem: {
    position: "relative" as "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50px",
    height: "50px",
    backgroundColor: "#2a3b5d",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    textDecoration: "none",
  },
  tooltip: {
    position: "absolute" as "absolute",
    left: "70px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "14px",
    whiteSpace: "nowrap" as "nowrap",
  },
  toggleButton: {
    marginTop: "auto",
    marginBottom: "20px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "50%",
    transition: "background 0.3s ease-in-out",
  },
};

export default Sidebar;
