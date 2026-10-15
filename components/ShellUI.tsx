'use client';

import { ReactNode, useState } from 'react';
import Nav from './Nav';

export default function ShellUI({
  children,
  role,
  username
}: {
  children: ReactNode;
  role: string;
  username: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.documentElement.classList.toggle('show-sidebar');
    document.body.classList.toggle('show-sidebar');
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.documentElement.classList.remove('show-sidebar');
    document.body.classList.remove('show-sidebar');
  };

  return (
    <div className={`app-layout ${isOpen ? 'show-sidebar sidebar-open' : ''}`}>
      
      {/* Kirim status isOpen dan onClose ke Nav */}
      <Nav role={role} username={username} isOpen={isOpen} onClose={closeMenu} />
      
      <div className="main-area">
        <header className="top-header">
          <button 
            className="menu-button mobile-only" 
            aria-label="Menu"
            onClick={toggleMenu}
          >
            ☰
          </button>
          
          <div></div>
          
          <div className="header-right">
            <span className="notification">♧</span>
            <div className="profile">
              <span className="avatar">{username?.charAt(0).toUpperCase() || 'A'}</span>
              <span>{username}</span>
              <span>⌄</span>
            </div>
          </div>
        </header>
        
        {/* Klik area layar luar untuk menutup menu */}
        <main className="content-area" onClick={() => isOpen && closeMenu()}>
          {children}
        </main>
      </div>
    </div>
  );
}