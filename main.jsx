// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Index from './pages/Home/index';  // Página inicial
import ListaContatos from './pages/ListaContatos';  // Página de lista de contatos

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/lista-contatos" element={<ListaContatos />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
