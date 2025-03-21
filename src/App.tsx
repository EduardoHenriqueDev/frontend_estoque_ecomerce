import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Anuncio from "./pages/Anuncio";
import Sobre from "./pages/Sobre";
import Auth from "./pages/auth/Authentication";
import Perfil from "./pages/Perfil";

const App: React.FC = () => {
  const navigate = useNavigate(); // Mantenha o useNavigate aqui dentro do componente
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsAuthenticated(true);
    }

    document.body.style.backgroundColor = isDarkMode ? "#ffffff" : "#2e2e2e";
    document.body.style.color = isDarkMode ? "#000" : "#fff";

    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card) => {
      const cardElement = card as HTMLElement;
      cardElement.style.backgroundColor = isDarkMode ? "#fff" : "#333";
    });
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/Auth"); // Redireciona para a página de login
  };

  return (
    <div style={{ display: "flex" }}>
      {isAuthenticated && <Sidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} handleLogout={handleLogout} />}

      <div style={{ flex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Auth onLoginSuccess={() => setIsAuthenticated(true)} />}
          />
          <Route path="/Anuncio" element={<Anuncio />} />
          <Route path="/Sobre" element={<Sobre />} />
          <Route path="/Auth" element={<Auth onLoginSuccess={() => setIsAuthenticated(true)} />} />
          <Route path="/Perfil" element={<Perfil />} />
        </Routes>
      </div>
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
