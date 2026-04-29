'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Home, DollarSign, Filter, SortAsc, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { PROPERTIES } from '@/lib/data';

export default function SearchPage() {
  const [priceRange, setPriceRange] = useState(500000);

  return (
    <div className="min-h-screen bg-[#f6f7f7]">
      <Navbar />
      
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 md:px-10 py-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/" className="text-slate-500 hover:text-[#1a2b3c]">Início</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Resultados da Busca</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Kitnets e Lofts no Brasil</h1>
            <p className="text-slate-500 mt-1">{PROPERTIES.length} opções encontradas para você</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              <SortAsc size={16} /> Ordenar por: Destaque
            </button>
            <button className="md:hidden flex items-center gap-2 px-4 py-2 bg-[#1a2b3c] text-white rounded-lg text-sm font-medium">
              <Filter size={16} /> Filtros
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-24 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg">Filtros</h2>
                <button className="text-sm text-[#1a2b3c] font-medium hover:underline">Limpar tudo</button>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="text-[#1a2b3c]" size={18} />
                  <h3 className="font-semibold text-sm">Faixa de Preço</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input className="w-full text-sm border-slate-200 rounded-lg focus:ring-[#1a2b3c] focus:border-[#1a2b3c]" placeholder="Min" type="text" />
                    <input className="w-full text-sm border-slate-200 rounded-lg focus:ring-[#1a2b3c] focus:border-[#1a2b3c]" placeholder="Max" type="text" />
                  </div>
                  <input 
                    className="w-full accent-[#1a2b3c]" 
                    type="range" 
                    min="0" 
                    max="1000000" 
                    step="50000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  />
                  <div className="text-xs text-slate-500 text-center">Até R$ {priceRange.toLocaleString('pt-BR')}</div>
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Home className="text-[#1a2b3c]" size={18} />
                  <h3 className="font-semibold text-sm">Tipo de Imóvel</h3>
                </div>
                <div className="space-y-3">
                  {['Kitnet Padrão', 'Kitnet Mobiliada', 'Loft Design', 'Loft Compacto'].map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        defaultChecked={type === 'Kitnet Padrão'}
                        className="rounded border-slate-300 text-[#1a2b3c] focus:ring-[#1a2b3c]" 
                      />
                      <span className="text-sm text-slate-600 group-hover:text-[#1a2b3c] transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bedrooms */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Home className="text-[#1a2b3c]" size={18} />
                  <h3 className="font-semibold text-sm">Quartos</h3>
                </div>
                <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                  {['Qualquer', '1+', '2+', '3+', '4+'].map((val) => (
                    <button 
                      key={val}
                      className={`flex-1 py-2 text-xs font-medium transition-colors ${val === '3+' ? 'bg-[#1a2b3c] text-white' : 'hover:bg-slate-50 border-r border-slate-200 last:border-0'}`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="text-[#1a2b3c]" size={18} />
                  <h3 className="font-semibold text-sm">Comodidades</h3>
                </div>
                <div className="space-y-3">
                  {['Estacionamento', 'Piscina', 'Academia', 'Segurança'].map((amenity) => (
                    <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="rounded border-slate-300 text-[#1a2b3c] focus:ring-[#1a2b3c]" />
                      <span className="text-sm text-slate-600 group-hover:text-[#1a2b3c] transition-colors">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full py-3 bg-[#1a2b3c] text-white rounded-lg font-bold text-sm shadow-sm hover:opacity-90 transition-all">
                Aplicar Filtros
              </button>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROPERTIES.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <PropertyCard {...property} type={property.type as 'sale' | 'rent'} />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12 mb-8">
              <nav className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1a2b3c] text-white font-bold">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">3</button>
                <span className="mx-2 text-slate-400">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">12</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <ChevronRight size={20} />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
