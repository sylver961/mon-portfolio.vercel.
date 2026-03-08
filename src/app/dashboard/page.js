'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchMessages() {
        try {
            const res = await fetch('/api/messages');
            const data = await res.json();
            if (data.messages) {
                setMessages(data.messages);
            }
        } catch (error) {
            console.error("Failed to fetch messages", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    async function handleDelete(id) {
        if (!confirm('Voulez-vous vraiment supprimer ce message ?')) return;

        try {
            const res = await fetch('/api/messages', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            if (res.ok) {
                // Reload the messages list
                fetchMessages();
            }
        } catch (error) {
            console.error("Delete failed", error);
        }
    }

    const [selectedPhoto, setSelectedPhoto] = useState(null);

    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: 'var(--space-xl) 0' }}>
            <div className="container">

                <div id="dash-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)', gap: 'var(--space-md)' }}>
                    <div>
                        <h1 className="heading-lg text-gradient">Espace Admin</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Retrouvez ici tous les messages reçus depuis votre portfolio.</p>
                    </div>
                    <Link href="/" className="btn btn-outline" style={{ whiteSpace: 'nowrap' }}>
                        ← Retour
                    </Link>
                </div>

                {/* Stats Bar */}
                <div className="glass-card" style={{ marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                    <span style={{ fontSize: '1.5rem' }}>📨</span>
                    <div>
                        <p style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{messages.length} message(s) reçu(s)</p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total des soumissions du formulaire de contact</p>
                    </div>
                </div>

                <style>{`
                  @media (max-width: 600px) {
                    #dash-header {
                      flex-direction: column;
                      align-items: flex-start !important;
                      text-align: left;
                    }
                    .msg-item-header {
                      flex-direction: column;
                      gap: var(--space-md);
                    }
                    .msg-item-header button {
                      width: 100%;
                    }
                  }
                `}</style>

                {loading ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Chargement des messages...</div>
                ) : messages.length === 0 ? (
                    <div className="glass-card" style={{ textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>Aucun message reçu pour le moment.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        {messages.map((msg) => (
                            <div key={msg.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                                <div className="msg-item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        {/* Affichage de la photo de l'utilisateur */}
                                        <div
                                            onClick={() => msg.photo && setSelectedPhoto(msg.photo)}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                background: 'var(--bg-secondary)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                overflow: 'hidden',
                                                border: '2px solid var(--border-light)',
                                                cursor: msg.photo ? 'pointer' : 'default',
                                                flexShrink: 0
                                            }}
                                        >
                                            {msg.photo ? (
                                                <img src={msg.photo} alt={msg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <span style={{ fontSize: '1.2rem' }}>👤</span>
                                            )}
                                        </div>
                                        <div>
                                            <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)', fontSize: '1.1rem', display: 'block' }}>{msg.name}</span>
                                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                                {new Date(msg.date).toLocaleString('fr-FR')}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(msg.id)}
                                        style={{
                                            background: 'rgba(239, 68, 68, 0.15)',
                                            border: '1px solid rgba(239, 68, 68, 0.4)',
                                            color: '#ef4444',
                                            padding: '0.4rem 0.9rem',
                                            borderRadius: '0.5rem',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                            transition: 'background 0.2s ease',
                                            fontSize: '0.875rem',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'}
                                    >
                                        🗑 Supprimer
                                    </button>
                                </div>

                                <div style={{ overflowWrap: 'anywhere' }}>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Email : </span>
                                    <a href={`mailto:${msg.email}`} style={{ color: 'var(--accent-primary)' }}>{msg.email}</a>
                                </div>
                                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '0.5rem', marginTop: '0.25rem', overflowWrap: 'anywhere' }}>
                                    <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7' }}>{msg.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )
                }

                {/* Lightbox pour la photo du message */}
                {selectedPhoto && (
                    <div
                        onClick={() => setSelectedPhoto(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.85)',
                            zIndex: 10000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            backdropFilter: 'blur(5px)'
                        }}
                    >
                        <img src={selectedPhoto} alt="Agrandissement" style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '1rem', border: '5px solid white', boxShadow: '0 0 30px rgba(0,0,0,0.5)' }} />
                        <button onClick={() => setSelectedPhoto(null)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                    </div>
                )}
            </div>
        </main>
    );
}

