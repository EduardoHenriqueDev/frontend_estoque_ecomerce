import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  return (
    <Router>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<h1>Produtos</h1>} />
          <Route path="/sobre" element={<h1>Sobre</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
