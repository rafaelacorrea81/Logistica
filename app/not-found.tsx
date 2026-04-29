import Link from 'next/link';
import { Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-slate-100 rounded-full text-[#1a2b3c]">
            <Home size={48} />
          </div>
          <h1 className="text-6xl font-black text-[#1a2b3c] mb-4">404</h1>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Página não encontrada</h2>
          <p className="text-slate-600 mb-8">
            Desculpe, a página que você está procurando não existe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="bg-[#1a2b3c] text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <Home size={18} /> Voltar ao Início
            </Link>
            <BackButton />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
