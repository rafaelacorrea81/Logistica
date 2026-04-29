'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, CreditCard, ShieldCheck, Info, 
  CheckCircle2, Building2, Landmark, Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PROPERTIES } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function PurchasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = PROPERTIES.find(p => p.id === id) || PROPERTIES.find(p => p.id === '8');
  
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('financing');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [protocol, setProtocol] = useState('');

  if (!property) return notFound();

  const itbi = property.price * 0.03; // 3% ITBI
  const registryFees = 5000;
  const total = property.price + itbi + registryFees;

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setProtocol(`IMB-${Math.floor(100000 + Math.random() * 900000)}`);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full text-center flex flex-col items-center gap-6"
          >
            <div className="size-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle2 size={60} />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-black text-[#1a2b3c]">Proposta Enviada!</h1>
              <p className="text-slate-600">
                Sua proposta para o <strong>{property.title}</strong> foi enviada com sucesso. 
                Um de nossos consultores entrará em contato em até 24 horas úteis.
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl w-full text-left border border-slate-100">
              <p className="text-xs font-bold uppercase text-slate-400 mb-2">Resumo da Solicitação</p>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Protocolo:</span>
                <span className="font-mono font-bold">#{protocol}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Data:</span>
                <span className="font-bold">{new Date().toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
            <Link 
              href="/"
              className="w-full bg-[#1a2b3c] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity"
            >
              Voltar para o Início
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7f7]">
      <Navbar />
      
      <main className="max-w-[1200px] mx-auto w-full px-4 md:px-10 py-12">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <Link href={`/property/${id}`} className="flex items-center text-sm font-medium text-slate-500 hover:text-[#1a2b3c] mb-4">
              <ChevronLeft size={16} className="mr-1" /> Voltar para o Imóvel
            </Link>
            <h1 className="text-4xl font-black text-[#1a2b3c]">Finalizar Proposta</h1>
            <p className="text-slate-600">Siga os passos abaixo para garantir seu novo imóvel.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Progress Bar */}
                <div className="h-2 bg-slate-100 flex">
                  <div 
                    className="h-full bg-[#1a2b3c] transition-all duration-500" 
                    style={{ width: `${(step / 3) * 100}%` }}
                  ></div>
                </div>

                <div className="p-8">
                  <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div 
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex flex-col gap-6"
                        >
                          <h2 className="text-2xl font-bold text-[#1a2b3c]">Informações Pessoais</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-bold uppercase text-slate-500 ml-1">Nome Completo</label>
                              <input required className="w-full rounded-lg border-slate-200 bg-slate-50 p-3" type="text" placeholder="Ex: Maria Oliveira" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-bold uppercase text-slate-500 ml-1">CPF</label>
                              <input required className="w-full rounded-lg border-slate-200 bg-slate-50 p-3" type="text" placeholder="000.000.000-00" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-bold uppercase text-slate-500 ml-1">E-mail</label>
                              <input required className="w-full rounded-lg border-slate-200 bg-slate-50 p-3" type="email" placeholder="maria@exemplo.com" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-bold uppercase text-slate-500 ml-1">Telefone</label>
                              <input required className="w-full rounded-lg border-slate-200 bg-slate-50 p-3" type="tel" placeholder="(11) 99999-9999" />
                            </div>
                          </div>
                          <button 
                            type="button"
                            onClick={handleNext}
                            className="w-full md:w-max px-12 bg-[#1a2b3c] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity self-end"
                          >
                            Próximo Passo
                          </button>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div 
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex flex-col gap-6"
                        >
                          <h2 className="text-2xl font-bold text-[#1a2b3c]">Forma de Pagamento</h2>
                          <div className="grid grid-cols-1 gap-4">
                            <button 
                              type="button"
                              onClick={() => setPaymentMethod('financing')}
                              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === 'financing' ? 'border-[#1a2b3c] bg-[#1a2b3c]/5' : 'border-slate-100 hover:border-slate-200'}`}
                            >
                              <div className={`size-12 rounded-full flex items-center justify-center ${paymentMethod === 'financing' ? 'bg-[#1a2b3c] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                <Landmark size={24} />
                              </div>
                              <div className="flex-1">
                                <p className="font-bold text-[#1a2b3c]">Financiamento Bancário</p>
                                <p className="text-sm text-slate-500">Simule com os principais bancos (Itaú, Santander, Caixa)</p>
                              </div>
                              <div className={`size-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'financing' ? 'border-[#1a2b3c]' : 'border-slate-200'}`}>
                                {paymentMethod === 'financing' && <div className="size-3 bg-[#1a2b3c] rounded-full"></div>}
                              </div>
                            </button>

                            <button 
                              type="button"
                              onClick={() => setPaymentMethod('pix')}
                              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === 'pix' ? 'border-[#1a2b3c] bg-[#1a2b3c]/5' : 'border-slate-100 hover:border-slate-200'}`}
                            >
                              <div className={`size-12 rounded-full flex items-center justify-center ${paymentMethod === 'pix' ? 'bg-[#1a2b3c] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                <Wallet size={24} />
                              </div>
                              <div className="flex-1">
                                <p className="font-bold text-[#1a2b3c]">Pagamento à Vista (Pix/TED)</p>
                                <p className="text-sm text-slate-500">Desconto de 2% no valor total do imóvel</p>
                              </div>
                              <div className={`size-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'pix' ? 'border-[#1a2b3c]' : 'border-slate-200'}`}>
                                {paymentMethod === 'pix' && <div className="size-3 bg-[#1a2b3c] rounded-full"></div>}
                              </div>
                            </button>

                            <button 
                              type="button"
                              onClick={() => setPaymentMethod('consortium')}
                              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === 'consortium' ? 'border-[#1a2b3c] bg-[#1a2b3c]/5' : 'border-slate-100 hover:border-slate-200'}`}
                            >
                              <div className={`size-12 rounded-full flex items-center justify-center ${paymentMethod === 'consortium' ? 'bg-[#1a2b3c] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                <Building2 size={24} />
                              </div>
                              <div className="flex-1">
                                <p className="font-bold text-[#1a2b3c]">Carta de Consórcio</p>
                                <p className="text-sm text-slate-500">Utilize sua carta de crédito já contemplada</p>
                              </div>
                              <div className={`size-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'consortium' ? 'border-[#1a2b3c]' : 'border-slate-200'}`}>
                                {paymentMethod === 'consortium' && <div className="size-3 bg-[#1a2b3c] rounded-full"></div>}
                              </div>
                            </button>
                          </div>
                          <div className="flex justify-between mt-4">
                            <button 
                              type="button"
                              onClick={handleBack}
                              className="px-8 py-4 text-slate-500 font-bold hover:text-[#1a2b3c] transition-colors"
                            >
                              Voltar
                            </button>
                            <button 
                              type="button"
                              onClick={handleNext}
                              className="px-12 bg-[#1a2b3c] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity"
                            >
                              Revisar Proposta
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div 
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex flex-col gap-6"
                        >
                          <h2 className="text-2xl font-bold text-[#1a2b3c]">Revisão Final</h2>
                          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col gap-4">
                            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                              <span className="text-slate-500">Imóvel</span>
                              <span className="font-bold text-[#1a2b3c]">{property.title}</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                              <span className="text-slate-500">Forma de Pagamento</span>
                              <span className="font-bold text-[#1a2b3c]">
                                {paymentMethod === 'financing' ? 'Financiamento Bancário' : 
                                 paymentMethod === 'pix' ? 'À Vista (Pix/TED)' : 'Carta de Consórcio'}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-500">Valor Total Estimado</span>
                              <span className="text-xl font-black text-[#1a2b3c]">R$ {total.toLocaleString('pt-BR')}</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                            <Info className="text-amber-600 shrink-0" size={20} />
                            <p className="text-xs text-amber-800 leading-relaxed">
                              Ao clicar em &quot;Enviar Proposta&quot;, você declara estar ciente de que esta é uma intenção de compra e não garante a reserva imediata do imóvel até a aprovação da documentação.
                            </p>
                          </div>

                          <div className="flex justify-between mt-4">
                            <button 
                              type="button"
                              onClick={handleBack}
                              className="px-8 py-4 text-slate-500 font-bold hover:text-[#1a2b3c] transition-colors"
                            >
                              Voltar
                            </button>
                            <button 
                              type="submit"
                              disabled={isSubmitting}
                              className="px-12 bg-[#1a2b3c] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                            >
                              {isSubmitting ? (
                                <>
                                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                  Processando...
                                </>
                              ) : 'Enviar Proposta'}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </div>
            </div>

            {/* Summary Sidebar */}
            <aside className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
                <h3 className="text-xl font-bold text-[#1a2b3c] mb-6">Resumo do Imóvel</h3>
                
                <div className="flex flex-col gap-4">
                  <div className="relative aspect-video rounded-xl overflow-hidden">
                    <Image 
                      src={property.image} 
                      alt={property.title} 
                      fill 
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-[#1a2b3c]">{property.title}</h4>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                      <Landmark size={14} /> {property.location}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Valor do Imóvel</span>
                      <span className="font-bold">R$ {property.price.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">ITBI (Est. 3%)</span>
                      <span className="font-bold">R$ {itbi.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Taxas de Cartório</span>
                      <span className="font-bold">R$ {registryFees.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between text-lg pt-3 border-t border-slate-100">
                      <span className="font-bold text-[#1a2b3c]">Total</span>
                      <span className="font-black text-[#1a2b3c]">R$ {total.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-[#1a2b3c] font-bold text-sm mb-2">
                    <ShieldCheck size={18} /> Compra Segura
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    Sua transação é protegida por criptografia de ponta a ponta e auditoria jurídica especializada da ImobiTech.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
