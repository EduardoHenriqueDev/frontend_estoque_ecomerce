import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Anuncio from "./pages/Anuncio";
import Sobre from "./pages/Sobre";
import Auth from "./pages/auth/Authentication";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
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

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Anuncio" element={<Anuncio />} />
            <Route path="/Sobre" element={<Sobre />} />
            <Route path="/Auth" element={<Auth />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
