'use client';

import { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const navLinks = [
        { href: '#about', label: 'À propos' },
        { href: '#skills', label: 'Compétences' },
        { href: '#projects', label: 'Projets' },
        { href: '#certificats', label: 'Certificats' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            padding: 'var(--space-md) 0',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(10px)',
            zIndex: 100,
            borderBottom: '1px solid var(--border-light)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>
                    Portfolio<span className="text-gradient">.</span>
                </div>

                {/* Desktop Nav */}
                <nav id="desktop-nav" style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href}>{link.label}</a>
                    ))}
                    <a href="/dashboard" style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>Admin</a>

                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        title={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
                        style={{
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-light)',
                            borderRadius: '9999px',
                            padding: '0.4rem 0.7rem',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            color: 'var(--text-primary)',
                            lineHeight: 1,
                        }}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </nav>

                {/* Right side: theme toggle + hamburger on mobile */}
                <div id="mobile-right" style={{ display: 'none', gap: '0.75rem', alignItems: 'center' }}>
                    <button
                        onClick={toggleTheme}
                        title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
                        style={{
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-light)',
                            borderRadius: '9999px',
                            padding: '0.4rem 0.7rem',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            color: 'var(--text-primary)',
                        }}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>

                    <button
                        id="hamburger-btn"
                        aria-label="Menu"
                        onClick={() => setIsOpen(!isOpen)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                            padding: '4px',
                        }}
                    >
                        <span style={{ display: 'block', width: '24px', height: '2px', background: isOpen ? 'var(--accent-primary)' : 'var(--text-primary)', transition: 'transform 0.3s', transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
                        <span style={{ display: 'block', width: '24px', height: '2px', background: isOpen ? 'var(--accent-primary)' : 'var(--text-primary)', transition: 'opacity 0.3s', opacity: isOpen ? 0 : 1 }}></span>
                        <span style={{ display: 'block', width: '24px', height: '2px', background: isOpen ? 'var(--accent-primary)' : 'var(--text-primary)', transition: 'transform 0.3s', transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Nav */}
            {isOpen && (
                <div style={{
                    background: 'var(--bg-glass)',
                    backdropFilter: 'blur(10px)',
                    borderTop: '1px solid var(--border-light)',
                    padding: 'var(--space-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-md)',
                }}>
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} style={{ fontSize: '1.1rem', padding: '0.5rem 0' }}>
                            {link.label}
                        </a>
                    ))}
                    <a href="/dashboard" onClick={() => setIsOpen(false)} style={{ color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '1.1rem', padding: '0.5rem 0' }}>
                        Admin
                    </a>
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          #desktop-nav { display: none !important; }
          #mobile-right { display: flex !important; }
        }
      `}</style>
        </header>
    );
}
