'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Home, Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from './AuthProvider';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a2b3c] text-white transition-transform group-hover:scale-110">
            <Home size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#1a2b3c]">ImobiTech</h1>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {[
            { name: 'Comprar', href: '/search' },
            { name: 'Vender', href: '/sell' },
            { name: 'Alugar', href: '/rent' },
            { name: 'Favoritos', href: '/favorites' },
            { name: 'Corretores', href: '/agents' },
            { name: 'Sobre', href: '/about' }
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-600 hover:text-[#1a2b3c] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-bold text-slate-900">{user.displayName}</span>
                <button 
                  onClick={logout}
                  className="text-[10px] font-bold text-red-500 hover:underline flex items-center gap-1"
                >
                  <LogOut size={10} /> Sair
                </button>
              </div>
              <div className="size-10 rounded-full overflow-hidden border-2 border-slate-100 relative">
                <Image 
                  src={user.photoURL || 'https://picsum.photos/seed/user/100/100'} 
                  alt="User" 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block text-sm font-bold text-[#1a2b3c] px-4 py-2 rounded-lg border border-[#1a2b3c]/20 hover:bg-[#1a2b3c]/5 transition-colors">
                Entrar
              </Link>
              <Link href="/login" className="bg-[#1a2b3c] text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:opacity-90 transition-opacity">
                Começar
              </Link>
            </>
          )}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-100 bg-white overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {[
                { name: 'Comprar', href: '/search' },
                { name: 'Vender', href: '/sell' },
                { name: 'Alugar', href: '/rent' },
                { name: 'Favoritos', href: '/favorites' },
                { name: 'Corretores', href: '/agents' },
                { name: 'Sobre', href: '/about' }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-slate-600"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="border-slate-100" />
              {user ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full overflow-hidden relative">
                      <Image src={user.photoURL || ''} alt="User" fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-sm font-bold text-slate-900">{user.displayName}</span>
                  </div>
                  <button onClick={logout} className="text-sm font-bold text-red-500 text-left">Sair</button>
                </div>
              ) : (
                <Link href="/login" className="text-sm font-bold text-[#1a2b3c] text-left" onClick={() => setIsOpen(false)}>Entrar</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
