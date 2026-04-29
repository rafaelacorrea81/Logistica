'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'motion/react';
import { Target, Users, Shield, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="text-blue-600" size={24} />,
      title: 'Inovação Constante',
      description: 'Utilizamos as tecnologias mais recentes, incluindo IA, para simplificar a jornada imobiliária.'
    },
    {
      icon: <Shield className="text-blue-600" size={24} />,
      title: 'Transparência Total',
      description: 'Processos claros e honestos em cada etapa, garantindo segurança para compradores e vendedores.'
    },
    {
      icon: <Award className="text-blue-600" size={24} />,
      title: 'Excelência no Serviço',
      description: 'Nossa equipe é treinada para oferecer um atendimento personalizado e de alto nível.'
    }
  ];

  const stats = [
    { label: 'Imóveis Vendidos', value: '15k+' },
    { label: 'Clientes Felizes', value: '12k+' },
    { label: 'Cidades Atendidas', value: '45' },
    { label: 'Anos de Mercado', value: '12' }
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-[#1a2b3c] text-white">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="https://picsum.photos/seed/architecture/1920/1080" 
            alt="Background" 
            fill 
            loading="lazy"
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-blue-600 rounded-full"
            >
              Nossa Missão
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            >
              Redefinindo o futuro do mercado imobiliário.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 leading-relaxed"
            >
              Na ImobiTech, combinamos tecnologia de ponta com um toque humano para tornar a compra, venda e aluguel de imóveis uma experiência simples, rápida e transparente.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#1a2b3c] mb-2">{stat.value}</div>
                <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image 
                src="https://picsum.photos/seed/office/800/800" 
                alt="Nossa História" 
                fill 
                loading="lazy"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b3c] mb-8">Como tudo começou</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  A ImobiTech nasceu em 2012 com uma visão simples: o mercado imobiliário estava parado no tempo. Processos burocráticos, falta de transparência e tecnologias obsoletas tornavam a busca pelo lar ideal um pesadelo.
                </p>
                <p>
                  Decidimos mudar isso. Começamos como uma pequena startup focada em digitalizar documentos e hoje somos a plataforma líder em inovação imobiliária no Brasil, utilizando inteligência artificial para conectar pessoas aos seus lares perfeitos.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    'Pioneiros em contratos digitais com validade jurídica.',
                    'Primeira plataforma a usar IA para precificação dinâmica.',
                    'Rede de mais de 500 corretores certificados.'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="text-blue-600 shrink-0 mt-1" size={20} />
                      <span className="font-medium text-slate-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-32 bg-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b3c] mb-6">Nossos Valores</h2>
            <p className="text-slate-600">O que nos guia todos os dias para oferecer a melhor experiência para você.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1a2b3c] mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1a2b3c] rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Pronto para encontrar seu novo lar?</h2>
              <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
                Explore milhares de imóveis selecionados e experimente a forma mais moderna de comprar ou alugar.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/search" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group">
                  Ver Imóveis <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/agents" className="w-full sm:w-auto bg-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors">
                  Falar com um Corretor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
