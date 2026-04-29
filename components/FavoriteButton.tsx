'use client';

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  propertyId: string;
  className?: string;
  showLabel?: boolean;
}

export default function FavoriteButton({ propertyId, className, showLabel = false }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteDocId, setFavoriteDocId] = useState<string | null>(null);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setIsFavorite(false);
      setFavoriteDocId(null);
      return;
    }

    const q = query(
      collection(db, 'favorites'),
      where('userId', '==', user.uid),
      where('propertyId', '==', propertyId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setIsFavorite(true);
        setFavoriteDocId(snapshot.docs[0].id);
      } else {
        setIsFavorite(false);
        setFavoriteDocId(null);
      }
    }, (error) => {
      console.error('Error fetching favorite status:', error);
    });

    return () => unsubscribe();
  }, [user, propertyId]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert('Por favor, faça login para favoritar imóveis.');
      return;
    }

    try {
      if (isFavorite && favoriteDocId) {
        await deleteDoc(doc(db, 'favorites', favoriteDocId));
      } else {
        await addDoc(collection(db, 'favorites'), {
          userId: user.uid,
          propertyId,
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={cn(
        "transition-all duration-300 flex items-center justify-center",
        !showLabel && "p-2 rounded-full",
        isFavorite ? "text-red-500" : "text-gray-600 hover:text-red-500",
        !showLabel && (isFavorite ? "bg-red-50" : "bg-white/80 hover:bg-white"),
        className
      )}
      aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <Heart className={cn("w-5 h-5", isFavorite && "fill-current", showLabel && "mr-2")} />
      {showLabel && <span className="text-sm font-bold">{isFavorite ? 'Salvo' : 'Salvar'}</span>}
    </button>
  );
}
