import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Categories from './components/Categories';
import Products from './components/Products';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1>Sistema de Gestión de Inventario</h1>
          <nav>
            <Link to="/">Productos</Link>
            <Link to="/categories">Categorías</Link>
          </nav>
        </nav>
        
        <div className="container">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
