import React from 'react';
import { Link } from 'react-router-dom';
import './Style.css'; 

function PageComponent({ title, children }) {
  return (
    <div className="container">
      {/* Header Section */}
      <header className="header">
        <h1>{title}</h1>
      </header>

      {/* Navigation Bar */}
      <nav className="nav">
        <Link to="/">Головна</Link>
        <Link to="/about-us">Про нас</Link>
        <Link to="/services">Послуги</Link>
        <Link to="/doctors">Лікарі</Link>
        <Link to="/contact">Контакти</Link>
        <Link to="/appointment" className="special-link">Записатися на прийом</Link>
      </nav>

      {/* Main Content Section */}
      <main className="content">
        {children}
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2024 Наша Клініка. Всі права захищені.</p>
      </footer>
    </div>
  );
}

export default PageComponent;
