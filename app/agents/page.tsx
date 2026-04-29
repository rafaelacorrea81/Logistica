'use client';

import { useState } from 'react';
import { AGENTS } from '@/lib/data';
import { Search, Phone, Mail, Star, Award, Building, Filter, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('Todos');

  const allSpecialties = ['Todos', ...Array.from(new Set(AGENTS.flatMap(a => a.specialties)))];

  const filteredAgents = AGENTS.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'Todos' || agent.specialties.includes(specialtyFilter);
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
      {/* Hero Section */}
      <section className="relative bg-[#1a2b3c] py-20 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            Nossos Especialistas
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-300"
          >
            Conheça a equipe de corretores mais qualificada do mercado. Profissionais prontos para ajudar você a encontrar o imóvel dos seus sonhos.
          </motion.p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-[73px] z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md py-4 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Buscar por nome ou cargo..."
                className="w-full rounded-full border border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-[#1a2b3c] focus:outline-none focus:ring-1 focus:ring-[#1a2b3c]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              <Filter size={16} className="text-slate-500 shrink-0" />
              {allSpecialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSpecialtyFilter(specialty)}
                  className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                    specialtyFilter === specialty
                      ? 'bg-[#1a2b3c] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {filteredAgents.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={agent.avatar}
                    alt={agent.name}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-[#1a2b3c] backdrop-blur-sm">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    {agent.rating}
                  </div>
                </div>
                
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-1">
                    <h3 className="text-lg font-bold text-[#1a2b3c]">{agent.name}</h3>
                    <p className="text-sm font-medium text-slate-500">{agent.role}</p>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {agent.specialties.map((spec) => (
                      <span key={spec} className="rounded-md bg-slate-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 border border-slate-100">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3 border-t border-slate-100 pt-4">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Award size={14} />
                        <span>Experiência</span>
                      </div>
                      <span className="font-bold text-[#1a2b3c]">{agent.experience}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Building size={14} />
                        <span>Imóveis Ativos</span>
                      </div>
                      <span className="font-bold text-[#1a2b3c]">{agent.propertiesCount}</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 flex gap-2">
                    <a 
                      href={`tel:${agent.phone}`}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                      title="Ligar"
                    >
                      <Phone size={18} />
                    </a>
                    <a 
                      href={`mailto:${agent.email}`}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                      title="E-mail"
                    >
                      <Mail size={18} />
                    </a>
                    <button className="flex-1 rounded-lg bg-[#1a2b3c] text-sm font-bold text-white shadow-sm hover:opacity-90 transition-opacity">
                      Ver Perfil
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Search size={40} />
            </div>
            <h3 className="text-xl font-bold text-[#1a2b3c]">Nenhum corretor encontrado</h3>
            <p className="mt-2 text-slate-500">Tente ajustar seus filtros ou termo de busca.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSpecialtyFilter('Todos'); }}
              className="mt-6 text-sm font-bold text-[#1a2b3c] underline"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#1a2b3c] p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold md:text-4xl">Quer fazer parte da nossa equipe?</h2>
              <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
                Estamos sempre em busca de talentos apaixonados pelo mercado imobiliário e tecnologia.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto rounded-xl bg-white px-8 py-4 text-sm font-bold text-[#1a2b3c] shadow-lg hover:bg-slate-100 transition-colors">
                  Ver Vagas Abertas
                </button>
                <button className="w-full sm:w-auto rounded-xl border border-white/20 px-8 py-4 text-sm font-bold text-white hover:bg-white/10 transition-colors">
                  Falar com RH
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
