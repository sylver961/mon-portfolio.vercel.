'use client';

import { useState } from 'react';

// Tous vos projets ici
const allProjects = [
    {
        id: 1,
        title: 'E-Commerce API',
        description: "Une API backend complète pour une plateforme e-commerce gérant l'authentification, les produits et les paiements Stripe.",
        image: '/projects/project1.png',
        tags: ['Node.js', 'PostgreSQL'],
    },
    {
        id: 2,
        title: "Microservices d'Analyse",
        description: "Architecture événementielle avec RabbitMQ pour traiter de larges volumes de données en temps réel.",
        image: '/projects/project2.png',
        tags: ['Go', 'RabbitMQ'],
    },
    {
        id: 3,
        title: 'Conception Graphique',
        description: "Création de design professionnel, logos pro pour les Entreprises, avec les logiciels d'adobe photoshop, Canvas.",
        image: '/projects/project3.png',
        tags: ['Photoshop', 'Canvas'],
    },
    // Ajoutez vos autres projets ici — ils seront cachés jusqu'à "Voir plus"
    // {
    //   id: 4,
    //   title: 'Mon Projet 4',
    //   description: '...',
    //   image: '/projects/project4.png',
    //   tags: ['React', 'Next.js'],
    // },
];

const INITIAL_COUNT = 2; // Nombre de projets affichés par défaut

export default function ProjectsSection() {
    const [showAll, setShowAll] = useState(false);

    const visibleProjects = showAll ? allProjects : allProjects.slice(0, INITIAL_COUNT);

    return (
        <section className="section" id="projects">
            <div className="container">
                <h2 className="heading-lg text-gradient" style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>Projets Récents</h2>

                <div className="grid grid-cols-2 gap-lg md:grid-cols-1">
                    {visibleProjects.map((project) => (
                        <div key={project.id} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                            <img
                                src={project.image}
                                alt={project.title}
                                style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                            />
                            <div style={{ padding: 'var(--space-md)' }}>
                                <h3 className="heading-md" style={{ marginBottom: 'var(--space-sm)' }}>{project.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>{project.description}</p>
                                <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                                    {project.tags.map(tag => (
                                        <span key={tag} style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', background: 'var(--bg-secondary)', fontSize: '0.875rem' }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Voir plus / Voir moins */}
                {allProjects.length > INITIAL_COUNT && (
                    <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="btn btn-outline"
                        >
                            {showAll ? '↑ Voir moins' : '↓ Voir plus de projets'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
