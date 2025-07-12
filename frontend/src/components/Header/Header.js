import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CSS/Header.css';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // This would come from your auth context
  const user = { name: 'Tina' }; 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="site-header">
      <div className="header-container">

        <div className="header-left">
          <Link to="/" className="header-logo">
            StackIt
          </Link>
        </div>

        <div className="header-middle">
          <div className="header-search-container">
            <SearchIcon />
            <input type="text" placeholder="Search..." />
          </div>
          <nav className="header-nav-desktop">
            <Link to="/">Home</Link>
            <Link to="/questions">Questions</Link>
            <Link to="/tags">Tags</Link>
            <Link to="/users">Users</Link>
          </nav>
        </div>

        <div className="header-right">
          <button className="header-icon-btn">
            <BellIcon />
          </button>
          {user ? (
            <div className="header-avatar">
              {user.name.charAt(0)}
            </div>
          ) : (
            <Link to="/login" className="header-login-btn">
              Log In
            </Link>
          )}
          <button className="hamburger-menu" onClick={toggleMenu}>
              <MenuIcon />
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
          <nav className="header-nav-mobile">
            <Link to="/" onClick={toggleMenu}>Home</Link>
            <Link to="/questions" onClick={toggleMenu}>Questions</Link>
            <Link to="/tags" onClick={toggleMenu}>Tags</Link>
            <Link to="/users" onClick={toggleMenu}>Users</Link>
            <div className="mobile-search-container">
              <SearchIcon />
              <input type="text" placeholder="Search..." />
            </div>
          </nav>
      )}
    </header>
  );
}
