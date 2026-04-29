'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Quote, Send, CheckCircle2, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TESTIMONIALS } from '@/lib/data';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(TESTIMONIALS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Cliente',
    content: '',
    rating: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newTestimonial = {
        id: (testimonials.length + 1).toString(),
        ...formData,
        avatar: `https://picsum.photos/seed/${formData.name}/100/100`,
        date: new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
      };
      
      setTestimonials([newTestimonial, ...testimonials]);
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: '', role: 'Cliente', content: '', rating: 5 });
      
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f6f7f7]">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6"
          >
            <MessageSquare size={16} />
            <span>Voz dos nossos clientes</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-[#1a2b3c] mb-6"
          >
            O que dizem sobre a ImobiTech
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Nossa missão é transformar vidas através do mercado imobiliário. Veja as experiências reais de quem já utilizou nossa plataforma.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Testimonials List */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {testimonials.map((t, index) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative group"
                >
                  <Quote className="absolute top-6 right-8 text-slate-100 group-hover:text-blue-50 transition-colors" size={48} />
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < t.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed mb-8 relative z-10">
                    &quot;{t.content}&quot;
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <Image 
                        src={t.avatar} 
                        alt={t.name} 
                        fill 
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a2b3c]">{t.name}</h4>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">{t.role} • {t.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Submission Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-[#1a2b3c] text-white p-8 rounded-3xl shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                
                <h3 className="text-2xl font-bold mb-2 relative z-10">Deixe seu depoimento</h3>
                <p className="text-slate-300 text-sm mb-8 relative z-10">Sua opinião é fundamental para continuarmos evoluindo.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Nome Completo</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input 
                        required
                        type="text" 
                        className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Sua Experiência</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-white/10 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                      placeholder="Conte-nos como foi sua jornada com a ImobiTech..."
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Avaliação</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({...formData, rating: star})}
                          className="p-1 transition-transform hover:scale-110"
                        >
                          <Star 
                            size={24} 
                            className={star <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-white/20"} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send size={18} />
                        Enviar Depoimento
                      </>
                    )}
                  </button>
                </form>

                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute inset-0 bg-[#1a2b3c] flex flex-col items-center justify-center p-8 text-center z-20"
                    >
                      <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={40} />
                      </div>
                      <h4 className="text-2xl font-bold mb-2">Obrigado!</h4>
                      <p className="text-slate-300">Seu depoimento foi recebido com sucesso e já está visível na página.</p>
                      <button 
                        onClick={() => setShowSuccess(false)}
                        className="mt-8 text-white/60 hover:text-white text-sm font-bold underline"
                      >
                        Fechar
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-8 p-6 bg-white rounded-3xl border border-slate-200 text-center">
                <p className="text-slate-500 text-sm">
                  Já é nosso cliente e quer compartilhar sua história? <br />
                  <span className="text-[#1a2b3c] font-bold">Junte-se a mais de 5.000 famílias felizes.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
