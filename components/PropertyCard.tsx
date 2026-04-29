import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import FavoriteButton from './FavoriteButton';

interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  gallery?: string[];
  tag?: string;
  type?: 'sale' | 'rent';
  condo?: number;
  iptu?: number;
}

export default function PropertyCard({ id, title, price, location, beds, baths, sqft, image, gallery, tag, type = 'sale', condo, iptu }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = gallery && gallery.length > 0 ? [image, ...gallery] : [image];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      whileHover={{ y: -12, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
      className="group overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-200/60"
    >
      <div className="relative h-72 w-full overflow-hidden">
        <Link href={`/property/${id}`}>
          <div className="relative h-full w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative h-full w-full"
              >
                <Image
                  src={images[currentImageIndex]}
                  alt={title}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </Link>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white/80 text-[#1a2b3c] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white/80 text-[#1a2b3c] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronRight size={18} />
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`size-1.5 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {tag && (
          <div className="absolute top-4 left-4 z-10 rounded-full bg-[#1a2b3c]/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
            {tag}
          </div>
        )}
        <FavoriteButton propertyId={id} className="absolute top-4 right-4 z-10" />
      </div>
      <Link href={`/property/${id}`}>
        <div className="p-6">
          <div className="flex flex-col mb-2">
            <span className="text-2xl font-bold text-[#1a2b3c]">
              R$ {price.toLocaleString('pt-BR')}{type === 'rent' ? '/mês' : ''}
            </span>
            {(condo || iptu) && (
              <div className="flex gap-3 mt-1">
                {condo && (
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Condo: R$ {condo.toLocaleString('pt-BR')}
                  </span>
                )}
                {iptu && (
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    IPTU: R$ {iptu.toLocaleString('pt-BR')}
                  </span>
                )}
              </div>
            )}
          </div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1a2b3c] transition-colors truncate">
            {title}
          </h3>
          <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
            <MapPin size={14} /> {location}
          </p>
          <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-1 text-sm text-slate-600">
              <Bed size={14} /> {beds} QTS
            </div>
            <div className="flex items-center gap-1 text-sm text-slate-600">
              <Bath size={14} /> {baths} BANS
            </div>
            <div className="flex items-center gap-1 text-sm text-slate-600">
              <Square size={14} /> {sqft.toLocaleString('pt-BR')} m²
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
