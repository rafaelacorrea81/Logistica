'use client';

import React, { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { PROPERTIES, Property } from '@/lib/data';
import PropertyCard from '@/components/PropertyCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Heart, Home, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'favorites'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const favoritePropertyIds = snapshot.docs.map(doc => doc.data().propertyId);
      const favoriteProperties = PROPERTIES.filter(p => favoritePropertyIds.includes(p.id));
      setFavorites(favoriteProperties);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching favorites:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f7f7] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2b3c]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f6f7f7] flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 max-w-md w-full">
            <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="text-red-500 w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-[#1a2b3c] mb-4">Acesse seus Favoritos</h1>
            <p className="text-slate-600 mb-8">
              Faça login para salvar seus imóveis preferidos e acessá-los de qualquer lugar.
            </p>
            <Link 
              href="/login"
              className="block w-full bg-[#1a2b3c] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all"
            >
              Fazer Login
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7f7] flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-10 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-[#1a2b3c] tracking-tight">Meus Favoritos</h1>
            <p className="text-slate-500 mt-2">Você tem {favorites.length} {favorites.length === 1 ? 'imóvel salvo' : 'imóveis salvos'}</p>
          </div>
          <Link 
            href="/search"
            className="flex items-center gap-2 text-[#1a2b3c] font-bold hover:underline group"
          >
            Explorar mais imóveis <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm">
            <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Home className="text-slate-300 w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a2b3c] mb-4">Nenhum imóvel salvo ainda</h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">
              Navegue pelos nossos anúncios e clique no ícone de coração para salvar os imóveis que você mais gostou.
            </p>
            <Link 
              href="/search"
              className="inline-flex items-center justify-center bg-[#1a2b3c] text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all"
            >
              Começar a Explorar
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <PropertyCard {...property} type={property.type as 'sale' | 'rent'} />
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
