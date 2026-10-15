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
    // Memaksa penambahan class agar CSS bawaan template merespons
    document.documentElement.classList.toggle('show-sidebar');
    document.body.classList.toggle('show-sidebar');
  };

  return (
    <div className={`app-layout ${isOpen ? 'show-sidebar sidebar-open' : ''}`}>
      <Nav role={role} username={username} />
      
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
        
        {/* Jika menu terbuka dan area luar diklik, menu akan tertutup otomatis */}
        <main className="content-area" onClick={() => isOpen && toggleMenu()}>
          {children}
        </main>
      </div>
    </div>
  );
}