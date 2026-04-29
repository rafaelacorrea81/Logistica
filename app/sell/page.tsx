'use client';

import { useState } from 'react';
import { 
  Camera, 
  MapPin, 
  Home, 
  DollarSign, 
  Bed, 
  Bath, 
  Maximize, 
  Car, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  Upload,
  Info,
  Loader2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GoogleGenAI } from "@google/genai";

type PropertyType = 'Casa' | 'Apartamento' | 'Condomínio' | 'Terreno' | 'Comercial';

interface SellFormData {
  title: string;
  type: PropertyType;
  price: string;
  address: string;
  city: string;
  state: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  parking: string;
  description: string;
  images: string[];
}

const STEPS = [
  { id: 1, title: 'Informações Básicas', icon: Home },
  { id: 2, title: 'Localização', icon: MapPin },
  { id: 3, title: 'Detalhes Técnicos', icon: Info },
  { id: 4, title: 'Fotos e Descrição', icon: Camera },
  { id: 5, title: 'Revisão', icon: CheckCircle2 },
];

export default function SellPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<SellFormData>({
    title: '',
    type: 'Casa',
    price: '',
    address: '',
    city: '',
    state: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    parking: '',
    description: '',
    images: [],
  });

  // AI Generation State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiStyle, setAiStyle] = useState('Moderno');
  const [numImages, setNumImages] = useState(2);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const generateImages = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      const fullPrompt = `Gere uma imagem de alta qualidade de um imóvel com as seguintes características: ${aiPrompt}. Estilo: ${aiStyle}. A imagem deve ser realista e profissional para um anúncio imobiliário.`;
      
      const results: string[] = [];
      
      // Generate multiple images sequentially for better reliability
      for (let i = 0; i < numImages; i++) {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: `${fullPrompt} (Variação ${i + 1})` }],
          },
        });

        const parts = response.candidates?.[0]?.content?.parts;
        if (parts) {
          for (const part of parts) {
            if (part.inlineData) {
              results.push(`data:image/png;base64,${part.inlineData.data}`);
            }
          }
        }
      }
      
      setGeneratedImages(results);
    } catch (error) {
      console.error('Erro ao gerar imagens:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addGeneratedImage = (url: string) => {
    if (!formData.images.includes(url)) {
      updateFormData({ images: [...formData.images, url] });
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    updateFormData({ images: newImages });
  };

  const updateFormData = (data: Partial<SellFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    window.scrollTo(0, 0);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#f6f7f7]">
        <Navbar />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-3xl bg-white p-12 shadow-xl border border-slate-100"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900">Anúncio Enviado com Sucesso!</h2>
            <p className="mb-8 text-slate-600">
              Sua propriedade foi enviada para análise. Nossa equipe revisará os detalhes e entrará em contato em até 24 horas para ativar o anúncio.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/"
                className="rounded-xl bg-[#1a2b3c] px-8 py-4 font-bold text-white hover:opacity-90 transition-opacity"
              >
                Voltar para o Início
              </Link>
              <button 
                onClick={() => {
                  setIsSuccess(false);
                  setCurrentStep(1);
                  setFormData({
                    title: '',
                    type: 'Casa',
                    price: '',
                    address: '',
                    city: '',
                    state: '',
                    bedrooms: '',
                    bathrooms: '',
                    area: '',
                    parking: '',
                    description: '',
                    images: [],
                  });
                }}
                className="rounded-xl border border-slate-200 px-8 py-4 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Anunciar Outro Imóvel
              </button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7f7]">
      <Navbar />
      
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Anuncie seu Imóvel</h1>
          <p className="mt-4 text-slate-600">Venda sua propriedade com a inteligência e alcance da ImobiTech.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="relative flex justify-between">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = currentStep >= step.id;
              const isCurrent = currentStep === step.id;
              
              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                  <div 
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#1a2b3c] border-[#1a2b3c] text-white' 
                        : 'bg-white border-slate-200 text-slate-400'
                    } ${isCurrent ? 'ring-4 ring-[#1a2b3c]/10' : ''}`}
                  >
                    <Icon size={20} />
                  </div>
                  <span className={`mt-2 hidden text-xs font-bold sm:block ${isActive ? 'text-[#1a2b3c]' : 'text-slate-400'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
            {/* Background Line */}
            <div className="absolute top-6 left-0 h-0.5 w-full bg-slate-200 -z-0"></div>
            {/* Active Line */}
            <motion.div 
              className="absolute top-6 left-0 h-0.5 bg-[#1a2b3c] -z-0"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-8 shadow-xl border border-slate-100">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-slate-900">Informações Básicas</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="col-span-2">
                    <label className="mb-2 block text-sm font-bold text-slate-700">Título do Anúncio</label>
                    <input 
                      type="text"
                      required
                      placeholder="Ex: Linda Casa de Luxo no Jardim Europa"
                      className="w-full rounded-xl border border-slate-200 p-4 focus:border-[#1a2b3c] focus:ring-1 focus:ring-[#1a2b3c] outline-none transition-all"
                      value={formData.title}
                      onChange={(e) => updateFormData({ title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Tipo de Imóvel</label>
                    <select 
                      className="w-full rounded-xl border border-slate-200 p-4 focus:border-[#1a2b3c] focus:ring-1 focus:ring-[#1a2b3c] outline-none transition-all appearance-none bg-white"
                      value={formData.type}
                      onChange={(e) => updateFormData({ type: e.target.value as PropertyType })}
                    >
                      <option value="Casa">Casa</option>
                      <option value="Apartamento">Apartamento</option>
                      <option value="Condomínio">Condomínio</option>
                      <option value="Terreno">Terreno</option>
                      <option value="Comercial">Comercial</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Preço de Venda (R$)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="text"
                        required
                        placeholder="0,00"
                        className="w-full rounded-xl border border-slate-200 p-4 pl-12 focus:border-[#1a2b3c] focus:ring-1 focus:ring-[#1a2b3c] outline-none transition-all"
                        value={formData.price}
                        onChange={(e) => updateFormData({ price: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-slate-900">Localização</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="col-span-2">
                    <label className="mb-2 block text-sm font-bold text-slate-700">Endereço Completo</label>
                    <input 
                      type="text"
                      required
                      placeholder="Rua, número, bairro"
                      className="w-full rounded-xl border border-slate-200 p-4 focus:border-[#1a2b3c] focus:ring-1 focus:ring-[#1a2b3c] outline-none transition-all"
                      value={formData.address}
                      onChange={(e) => updateFormData({ address: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Cidade</label>
                    <input 
                      type="text"
                      required
                      placeholder="Ex: São Paulo"
                      className="w-full rounded-xl border border-slate-200 p-4 focus:border-[#1a2b3c] focus:ring-1 focus:ring-[#1a2b3c] outline-none transition-all"
                      value={formData.city}
                      onChange={(e) => updateFormData({ city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Estado</label>
                    <input 
                      type="text"
                      required
                      placeholder="Ex: SP"
                      className="w-full rounded-xl border border-slate-200 p-4 focus:border-[#1a2b3c] focus:ring-1 focus:ring-[#1a2b3c] outline-none transition-all"
                      value={formData.state}
                      onChange={(e) => updateFormData({ state: e.target.value })}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-slate-900">Detalhes Técnicos</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Bed size={16} /> Quartos
                    </label>
                    <input 
                      type="number"
                      required
                      min="0"
                      className="w-full rounded-xl border border-slate-200 p-4 focus:border-[#1a2b3c] focus:ring-1 focus:ring-[#1a2b3c] outline-none transition-all"
                      value={formData.bedrooms}
                      onChange={(e) => updateFormData({ bedrooms: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Bath size={16} /> Banheiros
                    </label>
                    <input 
                      type="number"
                      required
                      min="0"
                      className="w-full rounded-xl border border-slate-200 p-4 focus:border-[#1a2b3c] focus:ring-1 focus:ring-[#1a2b3c] outline-none transition-all"
                      value={formData.bathrooms}
                      onChange={(e) => updateFormData({ bathrooms: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Maximize size={16} /> Área Total (m²)
                    </label>
                    <input 
                      type="number"
                      required
                      min="1"
                      className="w-full rounded-xl border border-slate-200 p-4 focus:border-[#1a2b3c] focus:ring-1 focus:ring-[#1a2b3c] outline-none transition-all"
                      value={formData.area}
                      onChange={(e) => updateFormData({ area: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Car size={16} /> Vagas de Garagem
                    </label>
                    <input 
                      type="number"
                      required
                      min="0"
                      className="w-full rounded-xl border border-slate-200 p-4 focus:border-[#1a2b3c] focus:ring-1 focus:ring-[#1a2b3c] outline-none transition-all"
                      value={formData.parking}
                      onChange={(e) => updateFormData({ parking: e.target.value })}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h3 className="text-xl font-bold text-slate-900">Fotos e Descrição</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Descrição do Imóvel</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Descreva os pontos fortes do seu imóvel, reformas recentes, área de lazer, etc."
                      className="w-full rounded-xl border border-slate-200 p-4 focus:border-[#1a2b3c] focus:ring-1 focus:ring-[#1a2b3c] outline-none transition-all resize-none"
                      value={formData.description}
                      onChange={(e) => updateFormData({ description: e.target.value })}
                    />
                  </div>

                  {/* AI Image Generation Section */}
                  <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="size-8 bg-[#1a2b3c] text-white rounded-lg flex items-center justify-center">
                        <Camera size={18} />
                      </div>
                      <h4 className="font-bold text-slate-900">Gerar Fotos com IA</h4>
                    </div>
                    
                    <p className="text-sm text-slate-600 mb-6">
                      Não tem fotos profissionais? Descreva como é o imóvel e nossa IA gerará imagens realistas para você.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-xs font-bold text-slate-500 uppercase tracking-wider">Descrição para a IA</label>
                        <input 
                          type="text"
                          placeholder="Ex: Sala de estar moderna com janelas amplas e vista para o jardim"
                          className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-[#1a2b3c] outline-none"
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-bold text-slate-500 uppercase tracking-wider">Estilo Visual</label>
                          <select 
                            className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-[#1a2b3c] outline-none bg-white"
                            value={aiStyle}
                            onChange={(e) => setAiStyle(e.target.value)}
                          >
                            <option value="Moderno">Moderno</option>
                            <option value="Clássico">Clássico</option>
                            <option value="Minimalista">Minimalista</option>
                            <option value="Rústico">Rústico</option>
                            <option value="Luxuoso">Luxuoso</option>
                          </select>
                        </div>
                        <div>
                          <label className="mb-2 block text-xs font-bold text-slate-500 uppercase tracking-wider">Quantidade</label>
                          <select 
                            className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-[#1a2b3c] outline-none bg-white"
                            value={numImages}
                            onChange={(e) => setNumImages(Number(e.target.value))}
                          >
                            <option value={1}>1 Imagem</option>
                            <option value={2}>2 Imagens</option>
                            <option value={3}>3 Imagens</option>
                            <option value={4}>4 Imagens</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={generateImages}
                        disabled={isGenerating || !aiPrompt.trim()}
                        className="w-full py-3 bg-[#1a2b3c] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Gerando Imagens...
                          </>
                        ) : (
                          <>
                            <Camera size={18} />
                            Gerar Imagens
                          </>
                        )}
                      </button>
                    </div>

                    {/* Generated Images Grid */}
                    {generatedImages.length > 0 && (
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        {generatedImages.map((img, i) => (
                          <div key={i} className="relative group aspect-video rounded-lg overflow-hidden border border-slate-200">
                            <img src={img} alt="Generated" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => addGeneratedImage(img)}
                                className="bg-white text-[#1a2b3c] p-2 rounded-full hover:scale-110 transition-transform"
                                title="Adicionar ao anúncio"
                              >
                                <Upload size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Selected Images Section */}
                  <div>
                    <label className="mb-4 block text-sm font-bold text-slate-700">Fotos Selecionadas ({formData.images.length})</label>
                    
                    {formData.images.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                        {formData.images.map((img, i) => (
                          <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 group">
                            <img src={img} alt="Selected" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeImage(i)}
                              className="absolute top-2 right-2 size-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                        <div className="aspect-video rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-[#1a2b3c]/30 transition-colors cursor-pointer">
                          <Upload size={24} className="mb-1" />
                          <span className="text-[10px] font-bold">Adicionar Mais</span>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center hover:border-[#1a2b3c]/30 transition-colors cursor-pointer mb-6">
                        <Upload className="mx-auto mb-2 text-slate-400" size={32} />
                        <p className="text-sm font-bold text-slate-600">Nenhuma foto selecionada</p>
                        <p className="text-xs text-slate-400">Arraste fotos ou use a IA acima</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-slate-900">Revisão do Anúncio</h3>
                
                {/* Images Preview */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {formData.images.map((img, i) => (
                      <div key={i} className={`relative rounded-lg overflow-hidden border border-slate-200 ${i === 0 ? 'col-span-4 aspect-video' : 'aspect-square'}`}>
                        <img src={img} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                <div className="rounded-2xl bg-slate-50 p-6 space-y-4">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-sm text-slate-500">Imóvel</span>
                    <span className="text-sm font-bold text-slate-900">{formData.title || 'Não informado'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-sm text-slate-500">Tipo</span>
                    <span className="text-sm font-bold text-slate-900">{formData.type}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-sm text-slate-500">Preço</span>
                    <span className="text-sm font-bold text-[#1a2b3c]">R$ {formData.price || '0,00'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-sm text-slate-500">Localização</span>
                    <span className="text-sm font-bold text-slate-900">{formData.city}, {formData.state}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Bed size={16} /> {formData.bedrooms} Quartos
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Bath size={16} /> {formData.bathrooms} Banheiros
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Maximize size={16} /> {formData.area} m²
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Car size={16} /> {formData.parking} Vagas
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-amber-50 p-4 border border-amber-100 flex gap-3">
                  <Info className="text-amber-500 shrink-0" size={20} />
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Ao clicar em &quot;Publicar Anúncio&quot;, você concorda com nossos termos de serviço e política de privacidade. Seu anúncio passará por uma revisão de qualidade antes de ficar visível para o público.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-100">
            <button
              type="button"
              onClick={handleBack}
              className={`flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors ${
                currentStep === 1 ? 'invisible' : 'visible'
              }`}
            >
              <ArrowLeft size={18} /> Voltar
            </button>
            
            {currentStep < STEPS.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 rounded-xl bg-[#1a2b3c] px-8 py-4 font-bold text-white hover:opacity-90 transition-opacity"
              >
                Próximo Passo <ArrowRight size={18} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 font-bold text-white hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Publicando...
                  </>
                ) : (
                  <>
                    Publicar Anúncio <CheckCircle2 size={18} />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
