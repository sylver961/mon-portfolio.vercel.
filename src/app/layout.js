import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata = {
  title: 'Portfolio — BIRHASHWIRWA BASABANYA Sylver',
  description: "Portfolio professionnel d'un développeur Back-End, Enseignant en Informatique et Designer Graphique.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
