'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Search, MapPin, Home, DollarSign, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { PROPERTIES } from '@/lib/data';

export default function RentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  const rentalProperties = PROPERTIES.filter(p => p.type === 'rent');
  
  const filteredProperties = rentalProperties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = maxPrice === '' || p.price <= parseInt(maxPrice);
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-[#f6f7f7]">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black text-[#1a2b3c]"
          >
            Imóveis para Alugar
          </motion.h1>
          <p className="mt-2 text-slate-600">Encontre o lugar perfeito para chamar de lar temporário ou permanente.</p>
        </div>

        {/* Filters Bar */}
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex flex-1 items-center px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
            <Search className="text-slate-400 mr-2" size={20} />
            <input 
              className="w-full border-0 bg-transparent p-0 text-slate-900 placeholder:text-slate-400 focus:ring-0 text-sm" 
              placeholder="Buscar por cidade, bairro ou nome..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-1 items-center px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
            <DollarSign className="text-slate-400 mr-2" size={20} />
            <input 
              className="w-full border-0 bg-transparent p-0 text-slate-900 placeholder:text-slate-400 focus:ring-0 text-sm" 
              placeholder="Preço máximo mensal" 
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-1 items-center px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
            <Home className="text-slate-400 mr-2" size={20} />
            <select className="w-full border-0 bg-transparent p-0 text-slate-900 focus:ring-0 text-sm appearance-none cursor-pointer">
              <option>Tipo de Imóvel</option>
              <option>Kitnet</option>
              <option>Loft</option>
              <option>Apartamento</option>
              <option>Casa</option>
            </select>
          </div>

          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors">
            <SlidersHorizontal size={18} /> Filtros
          </button>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PropertyCard {...property} type="rent" />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="mx-auto w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Nenhum imóvel encontrado</h3>
              <p className="text-slate-500 mt-2">Tente ajustar seus filtros ou busca para encontrar o que procura.</p>
              <button 
                onClick={() => { setSearchQuery(''); setMaxPrice(''); }}
                className="mt-6 text-[#1a2b3c] font-bold hover:underline"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}
        </div>

        {/* Featured Rental Section */}
        <section className="mt-24">
          <div className="relative overflow-hidden rounded-3xl bg-[#1a2b3c] px-6 py-16 sm:px-12 lg:flex lg:items-center lg:gap-12">
            <div className="relative z-10 lg:w-1/2">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold mb-4 uppercase tracking-wider">
                Exclusivo ImobiTech
              </span>
              <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
                Aluguel Digital: Rápido, Seguro e Sem Fiador
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                Nossa tecnologia de análise de crédito instantânea permite que você alugue seu próximo imóvel em menos de 24 horas, sem a necessidade de um fiador tradicional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-[#1a2b3c] px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                  Como Funciona
                </button>
                <button className="border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/5 transition-colors">
                  Ver Depoimentos
                </button>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-1/2 relative h-64 sm:h-96 rounded-2xl overflow-hidden">
              <Image 
                src="https://picsum.photos/seed/interior/800/600"
                alt="Modern interior"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
