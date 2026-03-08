'use client';

import { useState } from 'react';

// Ajoutez vos certificats ici (chemin = public/certificats/)
const certificates = [
    {
        id: 1,
        title: 'Certification Back-End Development',
        issuer: 'Mon École / Ma Formation',
        date: '2024',
        image: '/certificats/certificat1.jpg',
    },
    {
        id: 2,
        title: 'Certification Design Graphique',
        issuer: 'Mon École / Ma Formation',
        date: '2024',
        image: '/certificats/certificat2.jpg',
    },
    // Ajoutez autant de certificats que vous voulez ici !
];

export default function CertificatesSection() {
    const [selected, setSelected] = useState(null);

    return (
        <section className="section" id="certificats">
            <div className="container">
                <h2 className="heading-lg text-gradient" style={{ textAlign: 'center', marginBottom: 'var(--space-sm)' }}>
                    Mes Certificats
                </h2>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>
                    Certifications et réalisations académiques
                </p>

                <style>{`
                  #certs-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: var(--space-lg);
                  }
                  @media (max-width: 600px) {
                    #certs-grid {
                      grid-template-columns: 1fr;
                    }
                  }
                `}</style>
                <div id="certs-grid">
                    {certificates.map((cert) => (
                        <div
                            key={cert.id}
                            className="glass-card"
                            style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
                            onClick={() => setSelected(cert)}
                        >
                            <img
                                src={cert.image}
                                alt={cert.title}
                                style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.style.height = '180px';
                                    e.target.parentElement.style.background = 'linear-gradient(135deg, #1e293b, #0f172a)';
                                    e.target.parentElement.style.display = 'flex';
                                    e.target.parentElement.style.alignItems = 'center';
                                    e.target.parentElement.style.justifyContent = 'center';
                                }}
                            />
                            <div style={{ padding: 'var(--space-md)' }}>
                                <h3 style={{ marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>{cert.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>🏫 {cert.issuer}</p>
                                <p style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>📅 {cert.date}</p>
                                <button
                                    style={{
                                        marginTop: '0.75rem',
                                        padding: '0.4rem 1rem',
                                        borderRadius: '9999px',
                                        border: '1px solid var(--border-light)',
                                        background: 'transparent',
                                        color: 'var(--text-primary)',
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                        width: '100%',
                                        transition: 'background 0.2s'
                                    }}
                                >
                                    👁 Voir le certificat
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox / Viewer */}
            {selected && (
                <div
                    onClick={() => setSelected(null)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.85)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                        backdropFilter: 'blur(6px)',
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-light)',
                            borderRadius: '1rem',
                            maxWidth: '800px',
                            width: '100%',
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            src={selected.image}
                            alt={selected.title}
                            style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', display: 'block' }}
                        />
                        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{selected.title}</p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{selected.issuer} • {selected.date}</p>
                            </div>
                            <button
                                onClick={() => setSelected(null)}
                                style={{
                                    background: 'var(--bg-primary)',
                                    border: '1px solid var(--border-light)',
                                    color: 'var(--text-primary)',
                                    padding: '0.5rem 1.25rem',
                                    borderRadius: '9999px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                }}
                            >
                                ✕ Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
