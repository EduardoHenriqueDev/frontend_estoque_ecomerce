import React from "react";
import { Link } from "react-router-dom";
import { Footprints, SquarePen, Info, Sun, Moon } from "lucide-react";
import logo from "../assets/img/logo.png";
import * as Tooltip from "@radix-ui/react-tooltip";

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
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <li style={styles.navItem}>
                <Link to="/" style={styles.link}>
                  <Footprints size={35} color="#fff" />
                </Link>
              </li>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content style={styles.tooltipContent} side="right">
                Produtos
                <Tooltip.Arrow className="fill-black" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <li style={styles.navItem}>
                <Link to="/Anuncio" style={styles.link}>
                  <SquarePen size={35} color="#fff" />
                </Link>
              </li>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content style={styles.tooltipContent} side="right">
                Anunciar
                <Tooltip.Arrow className="fill-black" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <li style={styles.navItem}>
                <Link to="/Sobre" style={styles.link}>
                  <Info size={35} color="#fff" />
                </Link>
              </li>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content style={styles.tooltipContent} side="right">
                Sobre
                <Tooltip.Arrow className="fill-black" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
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
    background: "linear-gradient(135deg, #1e2a47, #151d33)",
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
    background: "linear-gradient(145deg, #223355, #1a253f)",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.3), -3px -3px 6px rgba(255, 255, 255, 0.1)",
  },
  navItemHover: {
    background: "#2a3b5d",
    boxShadow: "0 0 12px rgba(0, 150, 255, 0.6)",
  },
  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    textDecoration: "none",
  },
  toggleButton: {
    marginTop: "auto",
    marginBottom: "20px",
    background: "linear-gradient(145deg, #223355, #1a253f)",
    border: "none",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "50%",
    boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.3), -3px -3px 6px rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s ease-in-out",
  },
  toggleButtonHover: {
    boxShadow: "0 0 12px rgba(255, 200, 0, 0.8)",
  },
  tooltipContent: {
    backgroundColor: "black",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "14px",
  },
};

export default Sidebar;
