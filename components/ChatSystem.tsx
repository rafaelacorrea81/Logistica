'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  User as UserIcon, 
  Loader2, 
  ChevronLeft,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from './AuthProvider';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp, 
  doc, 
  updateDoc,
  getDocs,
  limit
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';

interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: { toDate: () => Date } | null;
}

interface Chat {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageAt: { toDate: () => Date } | null;
  unreadBy?: string[];
  propertyId?: string;
  otherUser?: {
    displayName: string;
    photoURL: string;
    uid: string;
  };
}

export default function ChatSystem() {
  const { user, loading, loginWithGoogle } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const startNewChat = useCallback(async (agentId: string = 'agent_demo') => {
    if (!user) return;

    // Check if chat already exists
    const q = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', user.uid)
    );
    const snapshot = await getDocs(q);
    const existingChat = snapshot.docs.find(doc => doc.data().participants.includes(agentId));

    if (existingChat) {
      setActiveChatId(existingChat.id);
    } else {
      const newChatRef = await addDoc(collection(db, 'chats'), {
        participants: [user.uid, agentId],
        lastMessage: '',
        lastMessageAt: serverTimestamp(),
        createdAt: serverTimestamp()
      });
      setActiveChatId(newChatRef.id);
    }
  }, [user]);

  useEffect(() => {
    const handleOpenChat = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsOpen(true);
      if (customEvent.detail?.agentId) {
        startNewChat(customEvent.detail.agentId);
      }
    };
    window.addEventListener('open-chat', handleOpenChat);
    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, [user, startNewChat]);

  // Listen for chats
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', user.uid),
      orderBy('lastMessageAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const chatList: Chat[] = [];
      for (const chatDoc of snapshot.docs) {
        const data = chatDoc.data();
        const otherUserId = data.participants.find((id: string) => id !== user.uid);
        
        // Fetch other user info (simplified for demo, in real app use a cache or denormalize)
        const otherUser = { displayName: 'Corretor', photoURL: 'https://picsum.photos/seed/agent/100/100', uid: otherUserId };
        
        chatList.push({
          id: chatDoc.id,
          ...data,
          otherUser
        } as Chat);
      }
      setChats(chatList);
    });

    return () => unsubscribe();
  }, [user]);

  // Listen for messages in active chat
  useEffect(() => {
    if (!activeChatId) return;

    const q = query(
      collection(db, 'chats', activeChatId, 'messages'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgList);
      
      // Scroll to bottom
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    });

    return () => unsubscribe();
  }, [activeChatId]);

  // Mark as read when chat is opened or active chat changes
  useEffect(() => {
    if (isOpen && activeChatId && user) {
      const currentChat = chats.find(c => c.id === activeChatId);
      if (currentChat?.unreadBy?.includes(user.uid)) {
        updateDoc(doc(db, 'chats', activeChatId), {
          unreadBy: currentChat.unreadBy.filter(id => id !== user.uid)
        });
      }
    }
  }, [isOpen, activeChatId, user, chats]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChatId || !user) return;

    setIsSending(true);
    try {
      const text = newMessage.trim();
      setNewMessage('');
      
      await addDoc(collection(db, 'chats', activeChatId, 'messages'), {
        senderId: user.uid,
        text,
        createdAt: serverTimestamp()
      });

      await updateDoc(doc(db, 'chats', activeChatId), {
        lastMessage: text,
        lastMessageAt: serverTimestamp(),
        unreadBy: activeChat?.participants.filter(id => id !== user.uid) || []
      });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const activeChat = chats.find(c => c.id === activeChatId);
  const unreadChatsCount = chats.filter(c => user && c.unreadBy?.includes(user.uid)).length;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="size-14 bg-[#1a2b3c] text-white rounded-full shadow-2xl flex items-center justify-center relative"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && unreadChatsCount > 0 && (
          <span className="absolute -top-1 -right-1 size-5 bg-red-500 rounded-full border-2 border-white text-[10px] flex items-center justify-center font-bold">
            {unreadChatsCount}
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1a2b3c] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                {activeChatId && (
                  <button onClick={() => setActiveChatId(null)} className="hover:bg-white/10 p-1 rounded-lg transition-colors">
                    <ChevronLeft size={20} />
                  </button>
                )}
                <div>
                  <h3 className="font-bold text-sm">
                    {activeChatId ? activeChat?.otherUser?.displayName : 'Suas Conversas'}
                  </h3>
                  <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold">
                    {activeChatId ? 'Online' : 'ImobiTech Chat'}
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden flex flex-col bg-slate-50">
              {!user ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="size-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                    <UserIcon size={32} />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">Entre para conversar</h4>
                  <p className="text-sm text-slate-500 mb-6">
                    Faça login para falar diretamente com nossos corretores e proprietários.
                  </p>
                  <button 
                    onClick={loginWithGoogle}
                    className="w-full py-3 bg-[#1a2b3c] text-white rounded-xl font-bold hover:opacity-90 transition-all"
                  >
                    Entrar com Google
                  </button>
                </div>
              ) : activeChatId ? (
                <>
                  {/* Messages */}
                  <div 
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar"
                  >
                    {messages.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-xs text-slate-400">Inicie a conversa agora!</p>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div 
                          key={msg.id}
                          className={`flex ${msg.senderId === user.uid ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                            msg.senderId === user.uid 
                              ? 'bg-[#1a2b3c] text-white rounded-tr-none' 
                              : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Input */}
                  <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200 flex gap-2">
                    <input
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#1a2b3c] outline-none transition-all"
                      placeholder="Digite sua mensagem..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button 
                      disabled={isSending || !newMessage.trim()}
                      className="size-10 bg-[#1a2b3c] text-white rounded-xl flex items-center justify-center hover:opacity-90 transition-all disabled:opacity-50"
                    >
                      {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    </button>
                  </form>
                </>
              ) : (
                /* Chat List */
                <div className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar">
                  {chats.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                      <MessageSquare size={48} className="text-slate-200 mb-4" />
                      <p className="text-sm text-slate-500">Nenhuma conversa ativa.</p>
                      <button 
                        onClick={() => startNewChat()}
                        className="mt-4 text-sm font-bold text-[#1a2b3c] hover:underline"
                      >
                        Falar com Suporte
                      </button>
                    </div>
                  ) : (
                    chats.map((chat) => {
                      const isUnread = user && chat.unreadBy?.includes(user.uid);
                      return (
                        <button
                          key={chat.id}
                          onClick={() => setActiveChatId(chat.id)}
                          className={`w-full flex items-center gap-4 p-3 hover:bg-white rounded-xl transition-all text-left group ${isUnread ? 'bg-blue-50/50' : ''}`}
                        >
                          <div className="size-12 rounded-full overflow-hidden bg-slate-200 relative shrink-0">
                            <Image
                              src={chat.otherUser?.photoURL || 'https://picsum.photos/seed/agent/100/100'}
                              alt="User"
                              fill
                              loading="lazy"
                              className="object-cover"
                              referrerPolicy="no-referrer"
                            />
                            {isUnread && (
                              <div className="absolute top-0 right-0 size-3 bg-blue-500 border-2 border-white rounded-full" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className={`text-sm truncate ${isUnread ? 'font-black text-[#1a2b3c]' : 'font-bold text-slate-900'}`}>
                                {chat.otherUser?.displayName}
                              </h4>
                              <span className={`text-[10px] ${isUnread ? 'font-bold text-blue-600' : 'text-slate-400'}`}>
                                {chat.lastMessageAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className={`text-xs truncate ${isUnread ? 'font-bold text-slate-700' : 'text-slate-500'}`}>
                              {chat.lastMessage || 'Inicie a conversa...'}
                            </p>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
