'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, CheckCircle2, User, Mail, Phone, Calendar, 
  ShieldCheck, FileText, CreditCard, ArrowRight, Home, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PROPERTIES } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function RentApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = PROPERTIES.find(p => p.id === id);
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [protocolNumber, setProtocolNumber] = useState('');

  useEffect(() => {
    // Generate a protocol number on mount to avoid hydration mismatch
    const timer = setTimeout(() => {
      const num = Math.floor(100000 + Math.random() * 900000).toString();
      setProtocolNumber(num);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!property) return notFound();

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const steps = [
    { id: 1, title: 'Informações Pessoais', icon: User },
    { id: 2, title: 'Detalhes da Locação', icon: Calendar },
    { id: 3, title: 'Documentação', icon: FileText },
    { id: 4, title: 'Revisão', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#f6f7f7]">
      <Navbar />
      
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <Link href={`/property/${id}`} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-[#1a2b3c] mb-8">
          <ChevronLeft size={16} className="mr-1" /> Voltar para o imóvel
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Progress Bar */}
              <div className="bg-slate-50 px-8 py-6 border-b border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-bold text-[#1a2b3c]">Solicitação de Aluguel</h1>
                  <span className="text-sm font-bold text-slate-400">Passo {step} de 4</span>
                </div>
                <div className="flex gap-2">
                  {steps.map((s) => (
                    <div 
                      key={s.id} 
                      className={`h-2 flex-1 rounded-full transition-colors duration-500 ${s.id <= step ? 'bg-[#1a2b3c]' : 'bg-slate-200'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-8">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form 
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}
                    >
                      {step === 1 && (
                        <div className="space-y-6">
                          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <User size={20} className="text-[#1a2b3c]" /> Dados do Proponente
                          </h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-bold uppercase text-slate-500">Nome Completo</label>
                              <input required className="rounded-xl border-slate-200 bg-slate-50 focus:ring-[#1a2b3c] focus:border-[#1a2b3c]" type="text" placeholder="Ex: Maria Oliveira" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-bold uppercase text-slate-500">CPF</label>
                              <input required className="rounded-xl border-slate-200 bg-slate-50 focus:ring-[#1a2b3c] focus:border-[#1a2b3c]" type="text" placeholder="000.000.000-00" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-bold uppercase text-slate-500">E-mail</label>
                              <input required className="rounded-xl border-slate-200 bg-slate-50 focus:ring-[#1a2b3c] focus:border-[#1a2b3c]" type="email" placeholder="maria@exemplo.com" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-bold uppercase text-slate-500">Telefone</label>
                              <input required className="rounded-xl border-slate-200 bg-slate-50 focus:ring-[#1a2b3c] focus:border-[#1a2b3c]" type="tel" placeholder="(11) 99999-9999" />
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-6">
                          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Calendar size={20} className="text-[#1a2b3c]" /> Período e Garantia
                          </h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-bold uppercase text-slate-500">Data de Início Desejada</label>
                              <input required className="rounded-xl border-slate-200 bg-slate-50 focus:ring-[#1a2b3c] focus:border-[#1a2b3c]" type="date" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-bold uppercase text-slate-500">Tempo de Contrato</label>
                              <select className="rounded-xl border-slate-200 bg-slate-50 focus:ring-[#1a2b3c] focus:border-[#1a2b3c]">
                                <option>12 meses</option>
                                <option>24 meses</option>
                                <option>30 meses (Padrão)</option>
                                <option>36 meses</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase text-slate-500">Tipo de Garantia</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                              {['Seguro Fiança', 'Título de Capitalização', 'Fiador'].map((type) => (
                                <label key={type} className="flex flex-col items-center justify-center p-4 border-2 border-slate-100 rounded-2xl cursor-pointer hover:border-[#1a2b3c] transition-colors has-[:checked]:border-[#1a2b3c] has-[:checked]:bg-[#1a2b3c]/5">
                                  <input type="radio" name="guarantee" className="hidden" defaultChecked={type === 'Seguro Fiança'} />
                                  <span className="text-sm font-bold text-slate-700">{type}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-6">
                          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <FileText size={20} className="text-[#1a2b3c]" /> Upload de Documentos
                          </h2>
                          <p className="text-sm text-slate-500">Anexe cópias legíveis do seu RG/CNH e Comprovante de Renda (últimos 3 meses).</p>
                          <div className="grid grid-cols-1 gap-4">
                            {['Documento de Identidade', 'Comprovante de Renda', 'Comprovante de Residência'].map((doc) => (
                              <div key={doc} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                <span className="text-sm font-medium text-slate-700">{doc}</span>
                                <button type="button" className="text-xs font-bold text-[#1a2b3c] hover:underline">Selecionar Arquivo</button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div className="space-y-6">
                          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <ShieldCheck size={20} className="text-[#1a2b3c]" /> Revisão Final
                          </h2>
                          <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">Aluguel Mensal:</span>
                              <span className="font-bold text-[#1a2b3c]">R$ {property.price.toLocaleString('pt-BR')}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">Taxas de Condomínio/IPTU:</span>
                              <span className="font-bold text-slate-700">Incluso</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">Garantia Selecionada:</span>
                              <span className="font-bold text-slate-700">Seguro Fiança</span>
                            </div>
                            <hr className="border-slate-200" />
                            <div className="flex justify-between text-lg font-bold">
                              <span className="text-[#1a2b3c]">Total Mensal:</span>
                              <span>R$ {property.price.toLocaleString('pt-BR')}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <input required type="checkbox" className="mt-1 rounded border-slate-300 text-[#1a2b3c] focus:ring-[#1a2b3c]" />
                            <p className="text-xs text-slate-500 leading-relaxed">
                              Declaro que as informações prestadas são verdadeiras e autorizo a ImobiTech a realizar a análise de crédito e consulta aos órgãos de proteção ao crédito.
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="mt-10 flex justify-between gap-4">
                        {step > 1 && (
                          <button 
                            type="button"
                            onClick={handleBack}
                            className="px-8 py-4 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                          >
                            Voltar
                          </button>
                        )}
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className={`flex-1 bg-[#1a2b3c] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          {isSubmitting ? (
                            <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              {step === 4 ? 'Enviar Solicitação' : 'Próximo Passo'} <ArrowRight size={18} />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="mx-auto size-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={40} />
                      </div>
                      <h2 className="text-3xl font-black text-[#1a2b3c] mb-4">Solicitação Enviada!</h2>
                      <p className="text-slate-600 mb-8 max-w-md mx-auto">
                        Sua solicitação de aluguel para <strong>{property.title}</strong> foi recebida com sucesso. Nossa equipe analisará seus documentos e entrará em contato em até 24 horas.
                      </p>
                      <div className="bg-slate-50 rounded-2xl p-6 mb-8 inline-block">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Número do Protocolo</p>
                        <p className="text-2xl font-mono font-bold text-[#1a2b3c]">#{protocolNumber}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/" className="bg-[#1a2b3c] text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-colors">
                          Voltar para o Início
                        </Link>
                        <button className="border border-slate-200 text-slate-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                          Acompanhar Status
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-[#1a2b3c] mb-6">Resumo do Imóvel</h3>
              <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4">
                <Image 
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">{property.title}</h4>
              <p className="text-xs text-slate-500 flex items-center gap-1 mb-4">
                <MapPin size={12} /> {property.location}
              </p>
              <div className="flex justify-between items-center py-4 border-t border-slate-100">
                <span className="text-sm text-slate-500">Aluguel Mensal</span>
                <span className="font-bold text-[#1a2b3c]">R$ {property.price.toLocaleString('pt-BR')}</span>
              </div>
              <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 mt-4">
                <ShieldCheck className="text-blue-600 shrink-0" size={20} />
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  Sua solicitação é protegida pela <strong>Garantia ImobiTech</strong>. Seus dados estão seguros e criptografados.
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
