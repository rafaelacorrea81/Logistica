'use client';

import { use, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, Bed, Bath, Square, Share2, Play, 
  Phone, Mail, Verified, ArrowRight, ChevronLeft, ChevronRight, Home,
  CreditCard, Maximize2, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FavoriteButton from '@/components/FavoriteButton';
import { PROPERTIES } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = PROPERTIES.find(p => p.id === id) || PROPERTIES.find(p => p.id === '8');
  
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const gallery = property?.gallery || [property?.image || ''];
  
  const nextImage = () => setActiveImage((prev) => (prev + 1) % gallery.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + gallery.length) % gallery.length);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setActiveImage((prev) => (prev + 1) % gallery.length);
      if (e.key === 'ArrowLeft') setActiveImage((prev) => (prev - 1 + gallery.length) % gallery.length);
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gallery.length]);

  if (!property) return notFound();

  return (
    <div className="min-h-screen bg-[#f6f7f7]">
      <Navbar />
      
      <main className="flex-1 flex flex-col max-w-[1200px] mx-auto w-full px-4 md:px-10 py-8 gap-8">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <Link href="/search" className="flex items-center text-sm font-medium text-slate-500 hover:text-[#1a2b3c]">
            <ChevronLeft size={16} className="mr-1" /> Voltar para Busca
          </Link>
          <div className="flex gap-4">
            <button className="flex items-center justify-center rounded-lg h-10 bg-white border border-slate-200 text-slate-900 px-4 hover:bg-slate-50 transition-colors">
              <Share2 size={18} className="mr-2" />
              <span className="text-sm font-bold">Compartilhar</span>
            </button>
            <FavoriteButton 
              propertyId={property.id} 
              showLabel 
              className="rounded-lg h-10 bg-white border border-slate-200 px-4 hover:bg-slate-50" 
            />
          </div>
        </div>

        {/* Gallery Section */}
        <section className="flex flex-col gap-4">
          <div className="relative group aspect-[16/9] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl bg-slate-200 cursor-zoom-in">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full"
                onClick={() => setIsLightboxOpen(true)}
              >
                <Image
                  src={gallery[activeImage]}
                  alt={`${property.title} - Image ${activeImage + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Navigation Arrows */}
            {gallery.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-xl text-white border border-white/20 hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                >
                  <ChevronLeft size={28} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-xl text-white border border-white/20 hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            {/* Expand Button */}
            <button 
              onClick={() => setIsLightboxOpen(true)}
              className="absolute top-6 right-6 p-3 rounded-xl bg-white/10 backdrop-blur-xl text-white border border-white/20 hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
            >
              <Maximize2 size={20} />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-6 right-6 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-xl text-white text-xs font-bold tracking-widest border border-white/10">
              {activeImage + 1} / {gallery.length}
            </div>
          </div>

          {/* Thumbnails Grid */}
          {gallery.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {gallery.map((img, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === idx ? 'border-[#1a2b3c] ring-4 ring-[#1a2b3c]/10 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    loading="lazy"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.button>
              ))}
            </div>
          )}
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
              onClick={() => setIsLightboxOpen(false)}
            >
              <button 
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
                onClick={() => setIsLightboxOpen(false)}
              >
                <X size={32} />
              </button>

              <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full max-w-6xl max-h-[80vh]"
                >
                  <Image
                    src={gallery[activeImage]}
                    alt="Lightbox View"
                    fill
                    loading="lazy"
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {gallery.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-0 top-1/2 -translate-y-1/2 p-6 text-white/50 hover:text-white transition-colors"
                    >
                      <ChevronLeft size={64} strokeWidth={1} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-0 top-1/2 -translate-y-1/2 p-6 text-white/50 hover:text-white transition-colors"
                    >
                      <ChevronRight size={64} strokeWidth={1} />
                    </button>
                  </>
                )}

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full p-4 no-scrollbar">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === idx ? 'border-white scale-110' : 'border-transparent opacity-40'
                      }`}
                    >
                      <Image src={img} alt="Thumb" fill loading="lazy" className="object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-black leading-tight tracking-tight text-[#1a2b3c]">
                    {property.title}
                  </h1>
                  <p className="text-slate-600 text-lg mt-1 flex items-center gap-1">
                    <MapPin size={20} /> {property.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-[#1a2b3c]">
                    R$ {property.price.toLocaleString('pt-BR')}{property.type === 'rent' ? '/mês' : ''}
                  </p>
                  <div className="flex flex-col items-end gap-1 mt-1">
                    {property.type === 'rent' && (
                      <p className="text-slate-500 text-xs font-medium">Taxas Incluídas</p>
                    )}
                    {property.condo && (
                      <p className="text-slate-500 text-xs font-medium">Condomínio: R$ {property.condo.toLocaleString('pt-BR')}</p>
                    )}
                    {property.iptu && (
                      <p className="text-slate-500 text-xs font-medium">IPTU: R$ {property.iptu.toLocaleString('pt-BR')}</p>
                    )}
                    {property.type === 'sale' && !property.condo && !property.iptu && (
                      <p className="text-slate-500 text-sm">
                        Hipoteca Est.: R$ {(property.price * 0.005).toLocaleString('pt-BR')}/mês
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mt-6 py-6 border-y border-slate-200">
                <div className="flex items-center gap-2">
                  <Bed className="text-[#1a2b3c]" size={20} />
                  <span className="font-bold">{property.beds} Quartos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="text-[#1a2b3c]" size={20} />
                  <span className="font-bold">{property.baths} Banheiros</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="text-[#1a2b3c]" size={20} />
                  <span className="font-bold">{property.sqft.toLocaleString('pt-BR')} m²</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="text-[#1a2b3c]" size={20} />
                  <span className="font-bold">Garagem para 4 Carros</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-[#1a2b3c]">Descrição do Imóvel</h2>
              <p className="text-slate-700 leading-relaxed">
                {property.description || 'Experimente o luxo incomparável nesta obra-prima arquitetônica contemporânea. Esta propriedade oferece paredes de vidro do chão ao teto que emolduram vistas deslumbrantes de todos os cômodos. Projetada para uma vida integrada entre interior e exterior, a residência possui um terraço amplo, uma piscina de borda infinita e uma cozinha externa de nível profissional.'}
              </p>
            </div>

            {/* Video Tour Section */}
            {property.videoUrl && (
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-[#1a2b3c]">Tour em Vídeo</h2>
                <div 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="relative flex items-center justify-center bg-black aspect-video rounded-xl overflow-hidden group cursor-pointer shadow-lg"
                >
                  <Image
                    src={`https://img.youtube.com/vi/${property.videoUrl.split('/').pop()?.split('?')[0]}/maxresdefault.jpg`}
                    alt="Video Preview"
                    fill
                    loading="lazy"
                    className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback if maxresdefault doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.src = `https://img.youtube.com/vi/${property.videoUrl?.split('/').pop()?.split('?')[0]}/0.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  <button className="relative z-10 flex shrink-0 items-center justify-center rounded-full size-20 bg-[#1a2b3c] text-white shadow-2xl group-hover:scale-110 transition-transform">
                    <Play size={40} className="translate-x-1" fill="currentColor" />
                  </button>
                  <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center justify-between">
                      <p className="text-white text-sm font-bold uppercase tracking-widest">Clique para Assistir o Tour</p>
                      <p className="text-white text-xs font-medium uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">Full HD</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Location Placeholder */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-[#1a2b3c]">Localização</h2>
              <div className="h-80 w-full rounded-xl overflow-hidden bg-slate-200 shadow-inner relative">
                <Image
                  src="https://picsum.photos/seed/map/1200/800"
                  alt="Mapa"
                  fill
                  loading="lazy"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <MapPin className="text-[#1a2b3c] size-12 drop-shadow-lg" fill="currentColor" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-lg flex justify-between items-center shadow-md">
                  <span className="text-sm font-medium">{property.location}</span>
                  <button className="text-[#1a2b3c] font-bold text-xs uppercase hover:underline">Abrir no Maps</button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Contact Agent */}
          <aside className="flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
              <h3 className="text-xl font-bold text-[#1a2b3c] mb-6">Contatar Corretor</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="size-16 rounded-full overflow-hidden bg-slate-100 relative">
                  <Image
                    src="https://picsum.photos/seed/agent/200/200"
                    alt="Corretor"
                    fill
                    loading="lazy"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="font-bold text-lg">Marcus Sterling</p>
                  <p className="text-slate-500 text-sm">Especialista em Imóveis de Luxo</p>
                </div>
              </div>
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-slate-500 ml-1">Nome Completo</label>
                  <input className="w-full rounded-lg border-slate-200 bg-slate-50 focus:ring-[#1a2b3c] focus:border-[#1a2b3c]" placeholder="João Silva" type="text" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-slate-500 ml-1">E-mail</label>
                  <input className="w-full rounded-lg border-slate-200 bg-slate-50 focus:ring-[#1a2b3c] focus:border-[#1a2b3c]" placeholder="joao@exemplo.com" type="email" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-slate-500 ml-1">Mensagem</label>
                  <textarea className="w-full rounded-lg border-slate-200 bg-slate-50 focus:ring-[#1a2b3c] focus:border-[#1a2b3c]" placeholder="Estou interessado em visitar esta propriedade..." rows={4}></textarea>
                </div>
                <Link 
                  href={property.type === 'rent' ? `/rent/${property.id}` : `/purchase/${property.id}`}
                  className="w-full bg-[#1a2b3c] text-white font-bold py-4 rounded-lg hover:opacity-90 transition-colors flex items-center justify-center gap-2 mb-2"
                >
                  <CreditCard size={20} /> {property.type === 'rent' ? 'Alugar Agora' : 'Comprar Agora'}
                </Link>
                <button className="w-full border-2 border-[#1a2b3c] text-[#1a2b3c] font-bold py-3 rounded-lg hover:bg-[#1a2b3c]/5 transition-colors" type="submit">
                  Agendar Visita Privada
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-2 leading-tight">
                  Ao clicar em &quot;Agendar Visita Privada&quot;, você concorda com os Termos de Uso e Política de Privacidade da ImobiTech.
                </p>
              </form>
              <div className="mt-8 flex flex-col gap-3">
                <button className="flex items-center justify-center gap-2 w-full py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-semibold">
                  <Phone size={18} /> Ligar para o Escritório
                </button>
                <button className="flex items-center justify-center gap-2 w-full py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-semibold">
                  <Mail size={18} /> E-mail Direto
                </button>
              </div>
            </div>
            <div className="bg-[#1a2b3c]/5 p-6 rounded-xl border border-[#1a2b3c]/10">
              <h4 className="font-bold text-[#1a2b3c] flex items-center gap-2 mb-2">
                <Verified size={18} /> Listagem Premier
              </h4>
              <p className="text-xs text-slate-600">
                Esta propriedade foi verificada por nossa equipe de auditoria de luxo quanto à integridade arquitetônica e comodidades exclusivas.
              </p>
            </div>
          </aside>
        </div>

        {/* Features Grid */}
        <section className="border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold text-[#1a2b3c] mb-6">Características de Luxo</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
            {(property.features || []).map((feature, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <feature.icon className="text-[#1a2b3c]" size={32} />
                <span className="font-bold text-sm">{feature.title}</span>
                <p className="text-xs text-slate-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && property.videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <button 
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
              onClick={() => setIsVideoModalOpen(false)}
            >
              <X size={32} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`${property.videoUrl}?autoplay=1`}
                title="Property Video Tour"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
