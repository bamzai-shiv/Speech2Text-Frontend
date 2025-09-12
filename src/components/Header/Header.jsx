import React from 'react';
import './Header.css';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/LOGO.png" alt="Transcript Logo" className="logo" />
        {/* <h1>TranscriptPro</h1> */}
      </div>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        <i className={darkMode ? 'fas fa-moon' : 'fas fa-sun'}></i>
      </button>
    </header>
  );
};

export default Header;
