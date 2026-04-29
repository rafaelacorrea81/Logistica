'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Home, DollarSign, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { PROPERTIES } from '@/lib/data';

export default function HomePage() {
  const featuredProperties = PROPERTIES.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-[#f6f7f7]">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-3xl bg-[#1a2b3c] px-6 py-24 sm:px-12 lg:py-32"
            >
              <div className="absolute inset-0 -z-10 opacity-40">
                <Image
                  src="https://picsum.photos/seed/luxury/1920/1080"
                  alt="Modern luxury house"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  priority
                />
              </div>
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1a2b3c]/90 via-[#1a2b3c]/40 to-transparent"></div>
              
              <div className="relative z-10 mx-auto max-w-2xl text-center">
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-black tracking-tight text-white sm:text-6xl"
                >
                  Encontre a Kitnet ou Loft Perfeito com a ImobiTech
                </motion.h2>
                <p className="mt-6 text-lg leading-8 text-slate-200">
                  Especialistas em kitnets e lofts. A forma mais moderna de encontrar seu espaço compacto e funcional nas melhores localizações.
                </p>

                {/* Search Bar */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row bg-white p-2 rounded-2xl shadow-2xl border border-white/10">
                  <div className="flex flex-1 items-center px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-200">
                    <MapPin className="text-slate-400 mr-2" size={20} />
                    <input 
                      className="w-full border-0 bg-transparent p-0 text-slate-900 placeholder:text-slate-400 focus:ring-0 text-sm" 
                      placeholder="Cidade ou Bairro" 
                      type="text"
                    />
                  </div>
                  <div className="flex flex-1 items-center px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-200">
                    <Home className="text-slate-400 mr-2" size={20} />
                    <select className="w-full border-0 bg-transparent p-0 text-slate-900 focus:ring-0 text-sm appearance-none cursor-pointer">
                      <option>Tipo de Imóvel</option>
                      <option>Kitnet Padrão</option>
                      <option>Kitnet Mobiliada</option>
                      <option>Loft Design</option>
                      <option>Loft Compacto</option>
                    </select>
                  </div>
                  <div className="flex flex-1 items-center px-4 py-2">
                    <DollarSign className="text-slate-400 mr-2" size={20} />
                    <input 
                      className="w-full border-0 bg-transparent p-0 text-slate-900 placeholder:text-slate-400 focus:ring-0 text-sm" 
                      placeholder="Preço Máximo" 
                      type="text"
                    />
                  </div>
                  <Link href="/search" className="bg-[#1a2b3c] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                    <Search size={20} /> Buscar
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Listings */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Kitnets em Destaque</h2>
              <p className="mt-2 text-slate-600">As melhores opções de kitnets e lofts selecionadas para você.</p>
            </div>
            <Link href="/search" className="hidden sm:flex items-center text-sm font-bold text-[#1a2b3c] hover:underline">
              Ver Todas as Propriedades <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PropertyCard {...property} type={property.type as 'sale' | 'rent'} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-20 text-center shadow-2xl sm:px-16 sm:py-24">
            <div className="absolute inset-0 -z-10 bg-[#1a2b3c]/20 backdrop-blur-sm"></div>
            <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#1a2b3c] to-[#15191d]"></div>
            
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">Quer anunciar sua kitnet?</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Somos especialistas no mercado de imóveis compactos. Anuncie sua kitnet ou loft e alcance milhares de interessados em minutos.
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-xl bg-white px-8 py-4 text-sm font-bold text-[#1a2b3c] shadow-sm hover:bg-slate-100 transition-colors">
                Obter Avaliação Gratuita
              </button>
              <Link href="#" className="text-sm font-bold leading-6 text-white flex items-center hover:underline">
                Saiba mais <ArrowRight className="ml-1" size={16} />
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
              {[
                { label: 'Casas Vendidas', value: '15k+' },
                { label: 'Clientes Felizes', value: '99%' },
                { label: 'Tempo Médio de Anúncio', value: '24h' },
                { label: 'Avaliação dos Usuários', value: '4.9/5' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
