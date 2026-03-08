'use client';

import { useState } from 'react';

export default function ContactForm() {
    const [status, setStatus] = useState(''); // '', 'loading', 'success', 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API request for demo purposes or link to actual API
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus('success');
                e.target.reset();
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3 className="heading-md" style={{ marginBottom: 'var(--space-md)' }}>Me Contacter</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>

                <div>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>Nom</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-light)',
                            background: 'rgba(0,0,0,0.2)',
                            color: 'var(--text-primary)'
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-light)',
                            background: 'rgba(0,0,0,0.2)',
                            color: 'var(--text-primary)'
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="message" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-light)',
                            background: 'rgba(0,0,0,0.2)',
                            color: 'var(--text-primary)',
                            resize: 'vertical'
                        }}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" disabled={status === 'loading'} style={{ marginTop: 'var(--space-sm)' }}>
                    {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>

                {status === 'success' && <p style={{ color: '#4ade80', textAlign: 'center' }}>Message envoyé avec succès !</p>}
                {status === 'error' && <p style={{ color: '#f87171', textAlign: 'center' }}>Erreur lors de l'envoi. Veuillez réessayer.</p>}

            </form>
        </div>
    );
}
