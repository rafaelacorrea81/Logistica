'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Mail, Lock, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { loginWithGoogle, user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative">
      {/* Back to Home */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-[#1a2b3c] font-medium transition-colors"
      >
        <ChevronLeft size={20} />
        <span>Voltar para o Início</span>
      </Link>

      <div className="flex flex-col items-center w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <div className="size-10 bg-[#1a2b3c] rounded-lg flex items-center justify-center">
            <Home className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold text-[#1a2b3c] tracking-tight">ImobiTech</span>
        </div>

        <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Bem-vindo de volta</h1>
            <p className="text-slate-500 mt-2">Entre na sua conta para continuar</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1" htmlFor="email">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1a2b3c] focus:border-transparent outline-none transition-all"
                  id="email"
                  placeholder="seu@email.com"
                  type="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-slate-700" htmlFor="password">
                  Senha
                </label>
                <a className="text-xs font-medium text-[#1a2b3c] hover:underline" href="#">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1a2b3c] focus:border-transparent outline-none transition-all"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 ml-1">
              <input
                className="rounded border-slate-300 text-[#1a2b3c] focus:ring-[#1a2b3c]"
                id="remember"
                type="checkbox"
              />
              <label className="text-sm text-slate-600 cursor-pointer" htmlFor="remember">
                Lembrar de mim
              </label>
            </div>

            <button className="w-full py-4 bg-[#1a2b3c] text-white rounded-xl font-bold shadow-lg shadow-[#1a2b3c]/20 hover:opacity-90 transition-all active:scale-[0.98]">
              Entrar
            </button>
          </form>

          <div className="mt-8">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-500 font-medium">Ou continue com</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium text-sm"
              >
                <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={18} height={18} />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium text-sm">
                <Image src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" width={18} height={18} />
                Facebook
              </button>
            </div>
          </div>

          <p className="text-center mt-8 text-sm text-slate-600">
            Não tem uma conta?{' '}
            <a className="font-bold text-[#1a2b3c] hover:underline" href="#">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
