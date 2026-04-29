import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import ChatSystem from '@/components/ChatSystem';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'ImobiTech | Plataforma Imobiliária Moderna',
  description: 'Encontre a casa dos seus sonhos com a ImobiTech. Combinação inteligente com IA e fechamento digital sem complicações.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body suppressHydrationWarning className="font-sans antialiased">
        <AuthProvider>
          {children}
          <ChatSystem />
        </AuthProvider>
      </body>
    </html>
  );
}
