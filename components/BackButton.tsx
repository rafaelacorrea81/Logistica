'use client';

import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  return (
    <button 
      onClick={() => window.history.back()}
      className="border border-slate-200 text-slate-600 px-8 py-4 rounded-xl font-bold hover:bg-white transition-all flex items-center justify-center gap-2"
    >
      <ArrowLeft size={18} /> Voltar
    </button>
  );
}
