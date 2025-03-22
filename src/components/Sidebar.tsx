import React from "react";
import { Link } from "react-router-dom";
import { Footprints, SquarePen, Info, LogOut, UserRound } from "lucide-react";
import logo from "../assets/img/logo.png";
import * as Tooltip from "@radix-ui/react-tooltip";

interface SidebarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isDarkMode, toggleTheme, handleLogout }) => {
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
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <li style={styles.navItem}>
                <Link to="/Perfil" style={styles.link}>
                  <UserRound size={35} color="#fff" />
                </Link>
              </li>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content style={styles.tooltipContent} side="right">
                Perfil
                <Tooltip.Arrow className="fill-black" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </ul>

      <div style={styles.logoutContainer}>
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button onClick={handleLogout} style={styles.logoutButton}>
                <LogOut size={35} color="#ff0000" />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content style={styles.tooltipContent} side="right">
                Logout
                <Tooltip.Arrow className="fill-black" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    height: "100vh",
    width: "100px",
    background: "linear-gradient(135deg, #1C1C1C, #000000)",
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
    background: "linear-gradient(145deg, #000000, #1C1C1C)",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.3), -3px -3px 6px rgba(255, 255, 255, 0.1)",
  },
  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    textDecoration: "none",
  },
  tooltipContent: {
    backgroundColor: "white",
    color: "black",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "14px",
    fontWeight: "bold",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.2)"
  },
  logoutContainer: {
    marginTop: "auto",
    paddingBottom: "20px",
    marginBottom: "20px",
  },
  logoutButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50px",
    height: "50px",
    borderRadius: "30px",
    transition: "all 0.3s ease-in-out",
  },
};

export default Sidebar;
