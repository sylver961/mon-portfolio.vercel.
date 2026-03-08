import ContactForm from '@/components/ContactForm';
import CertificatesSection from '@/components/CertificatesSection';
import Header from '@/components/Header';
import ProjectsSection from '@/components/ProjectsSection';
import { SocialIcons } from '@/components/SocialIcons';

export default function Home() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="container animate-fade-in centering-container">
          <p style={{ color: 'var(--accent-primary)', fontWeight: 'bold', marginBottom: 'var(--space-lg)' }}>
            Bonjour, je suis BIRHASHWIRWA BASABANYA Sylver
          </p>
          <h1 className="heading-xl" style={{ marginBottom: 'var(--space-md)', color: 'white' }}>
            Développeur <span className="text-gradient">Back-End</span>, Enseignant de l'Informatique <br /> et Designer Graphique
          </h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto var(--space-xl)', color: '#e5e7eb' }}>
            Je conçois des architectures robustes, des API performantes et des bases de données optimisées pour des applications web modernes.
          </p>
          {/* Social icons above CTA buttons */}
          <SocialIcons style={{ marginBottom: 'var(--space-lg)' }} />
          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap', marginTop: 'var(--space-md)' }}>
            <a href="#contact" className="btn btn-primary">Me contacter</a>
            {/* Downloadable CV Link */}
            <a href="/cv.pdf" download="Mon_CV_Developpeur.pdf" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
              <span style={{ marginRight: '0.5rem' }}>📄</span> Télécharger mon CV
            </a>
          </div>
        </div>
      </section>


      {/* About/Skills Section */}
      <section className="section" id="skills" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container centering-container">
          <h2 className="heading-lg text-gradient" style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>Mes Compétences</h2>


          <div className="grid grid-cols-3 gap-lg md:grid-cols-1">
            <div className="glass-card animate-fade-in delay-100">
              <h3 className="heading-md" style={{ marginBottom: 'var(--space-sm)' }}>Backend & APIs</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Développement d'API RESTful et GraphQL. Maîtrise de Node.js, Express, et NestJS.</p>
            </div>

            <div className="glass-card animate-fade-in delay-200">
              <h3 className="heading-md" style={{ marginBottom: 'var(--space-sm)' }}>Bases de Données</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Conception et optimisation de schémas. Expérience avec PostgreSQL, MongoDB et Redis.</p>
            </div>

            <div className="glass-card animate-fade-in delay-300">
              <h3 className="heading-md" style={{ marginBottom: 'var(--space-sm)' }}>DevOps & Cloud</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Déploiement sur AWS et Vercel. CI/CD avec GitHub Actions, conteneurisation Docker.</p>
            </div>
          </div>
        </div>
      </section>

      <ProjectsSection />

      {/* Certificates Section */}
      <CertificatesSection />

      {/* Contact Section */}
      <section className="section" id="contact" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container centering-container">
          <h2 className="heading-lg text-gradient" style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>Travaillons Ensemble</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)', maxWidth: '600px' }}>
            Je suis actuellement à la recherche de nouvelles opportunités. N'hésitez pas à me contacter si vous avez un projet en tête !, ou si vous avez besoin d'un design professionnel
          </p>

          <ContactForm />
        </div>
      </section>


      {/* Footer */}
      <footer style={{ padding: 'var(--space-lg) 0', textAlign: 'center', borderTop: '1px solid var(--border-light)' }}>
        <SocialIcons style={{ marginBottom: 'var(--space-md)' }} size={20} />
        <p style={{ color: 'var(--text-secondary)' }}>© {new Date().getFullYear()} Portfolio Sylver BIRHASHWIRWA. Construit avec Next.js. 🚀</p>
      </footer>
    </main>
  );
}
