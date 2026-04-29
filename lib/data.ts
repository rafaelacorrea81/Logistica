import React from 'react';
import { Home, Search, MapPin, Bed, Bath, Square, Heart, ArrowRight, Phone, Mail, Globe, Info, Shield, Zap, Waves, Tv, Wine, Dumbbell, ChefHat, Cpu, Menu, X } from 'lucide-react';

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  gallery?: string[];
  tag: string;
  featured: boolean;
  type: 'sale' | 'rent';
  condo?: number;
  iptu?: number;
  description?: string;
  videoUrl?: string;
  features?: { icon: React.ElementType; title: string; desc: string }[];
}

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Kitnet Aconchegante no Centro de Vitória',
    price: 250000,
    location: 'Vitória, ES',
    beds: 1,
    baths: 1,
    sqft: 28,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2070',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=2070'
    ],
    tag: 'Novo Anúncio',
    featured: true,
    type: 'sale',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '2',
    title: 'Loft Moderno em Jardim da Penha',
    price: 320000,
    location: 'Vitória, ES',
    beds: 1,
    baths: 1,
    sqft: 32,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=2070',
    gallery: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2070'
    ],
    tag: 'Destaque',
    featured: true,
    type: 'sale'
  },
  {
    id: '3',
    title: 'Kitnet Mobiliada na Praia da Costa',
    price: 280000,
    location: 'Vila Velha, ES',
    beds: 1,
    baths: 1,
    sqft: 30,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=2070',
    gallery: [
      'https://images.unsplash.com/photo-1512918766671-ad650b9b732d?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=2070'
    ],
    tag: 'Oferta Imperdível',
    featured: true,
    type: 'sale'
  },
  {
    id: '4',
    title: 'Loft Compacto em Itapuã',
    price: 195000,
    location: 'Vila Velha, ES',
    beds: 1,
    baths: 1,
    sqft: 25,
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=2067',
    tag: 'Destaque',
    featured: false,
    type: 'sale'
  },
  {
    id: '5',
    title: 'Kitnet Próximo a Laranjeiras',
    price: 1800,
    location: 'Serra, ES',
    beds: 1,
    baths: 1,
    sqft: 22,
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=2070',
    gallery: [
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1501183007986-d0d080b147f9?auto=format&fit=crop&q=80&w=2070'
    ],
    tag: 'Aluguel',
    featured: true,
    type: 'rent',
    condo: 350,
    iptu: 80
  },
  {
    id: '6',
    title: 'Loft Design na Enseada do Suá',
    price: 2200,
    location: 'Vitória, ES',
    beds: 1,
    baths: 1,
    sqft: 35,
    image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&q=80&w=2070',
    gallery: [
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=2070'
    ],
    tag: 'Novo',
    featured: false,
    type: 'rent',
    condo: 450,
    iptu: 120
  },
  {
    id: '7',
    title: 'Kitnet Prática em Campo Grande',
    price: 1500,
    location: 'Cariacica, ES',
    beds: 1,
    baths: 1,
    sqft: 26,
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=2070',
    gallery: [
      'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1484101403033-57105d2b77ca?auto=format&fit=crop&q=80&w=2070'
    ],
    tag: 'Oportunidade',
    featured: false,
    type: 'rent',
    condo: 250,
    iptu: 50
  },
  {
    id: '8',
    title: 'Loft Executivo na Praia do Canto',
    price: 850000,
    location: 'Vitória, ES',
    beds: 1,
    baths: 1,
    sqft: 42,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070',
    tag: 'Anúncio Premium',
    featured: false,
    type: 'sale',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Loft de alto padrão localizado no coração financeiro de São Paulo. Ideal para executivos que buscam praticidade sem abrir mão do luxo. O edifício conta com infraestrutura completa, incluindo lavanderia coletiva, coworking, academia de última geração e piscina no rooftop com vista 360º da cidade.',
    gallery: [
      'https://images.unsplash.com/photo-1512918766671-ad650b9b732d?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=2070'
    ],
    features: [
      { icon: Zap, title: 'Automação', desc: 'Controle de luz e ar-condicionado via smartphone.' },
      { icon: Tv, title: 'Smart TV', desc: 'Equipado com TV de 65 polegadas e som integrado.' },
      { icon: Waves, title: 'Rooftop Pool', desc: 'Piscina aquecida com vista para o skyline.' },
      { icon: Dumbbell, title: 'Fitness Center', desc: 'Academia completa aberta 24 horas.' },
      { icon: Cpu, title: 'Coworking', desc: 'Espaço dedicado para trabalho com internet de alta velocidade.' },
      { icon: ChefHat, title: 'Espaço Gourmet', desc: 'Cozinha compartilhada equipada para eventos.' },
      { icon: Shield, title: 'Portaria 24h', desc: 'Segurança total com controle de acesso biométrico.' },
      { icon: Home, title: 'Lavanderia', desc: 'Lavanderia OMO integrada ao condomínio.' }
    ]
  },
  {
    id: '9',
    title: 'Kitnet Vista Mar na Praia do Morro',
    price: 350000,
    location: 'Guarapari, ES',
    beds: 1,
    baths: 1,
    sqft: 30,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=2070',
    tag: 'Frente Mar',
    featured: true,
    type: 'sale'
  },
  {
    id: '10',
    title: 'Loft Design em Itaparica',
    price: 3500,
    location: 'Vila Velha, ES',
    beds: 1,
    baths: 1,
    sqft: 38,
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=2070',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=2070'
    ],
    tag: 'Luxo',
    featured: false,
    type: 'rent',
    condo: 600,
    iptu: 150
  },
  {
    id: '11',
    title: 'Kitnet Reformada em Jardim Camburi',
    price: 220000,
    location: 'Vitória, ES',
    beds: 1,
    baths: 1,
    sqft: 27,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=2071',
    tag: 'Pronto para Morar',
    featured: true,
    type: 'sale'
  },
  {
    id: '12',
    title: 'Kitnet Moderna em Jacaraípe',
    price: 1600,
    location: 'Serra, ES',
    beds: 1,
    baths: 1,
    sqft: 24,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=2070',
    tag: 'Econômico',
    featured: false,
    type: 'rent',
    condo: 280,
    iptu: 60
  }
];

export const AGENTS = [
  {
    id: '1',
    name: 'Roberto Almeida',
    role: 'Corretor Sênior',
    experience: '12 anos',
    specialties: ['Imóveis de Luxo', 'Investimentos'],
    phone: '+55 (11) 98765-4321',
    email: 'roberto.almeida@imobitech.com.br',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.9,
    propertiesCount: 42
  },
  {
    id: '2',
    name: 'Juliana Mendes',
    role: 'Especialista em Aluguéis',
    experience: '8 anos',
    specialties: ['Residencial', 'Apartamentos'],
    phone: '+55 (11) 97654-3210',
    email: 'juliana.mendes@imobitech.com.br',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.8,
    propertiesCount: 56
  },
  {
    id: '3',
    name: 'Marcos Oliveira',
    role: 'Consultor Imobiliário',
    experience: '5 anos',
    specialties: ['Primeiro Imóvel', 'Financiamento'],
    phone: '+55 (11) 96543-2109',
    email: 'marcos.oliveira@imobitech.com.br',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.7,
    propertiesCount: 28
  },
  {
    id: '4',
    name: 'Beatriz Santos',
    role: 'Corretora Comercial',
    experience: '10 anos',
    specialties: ['Escritórios', 'Galpões'],
    phone: '+55 (11) 95432-1098',
    email: 'beatriz.santos@imobitech.com.br',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 5.0,
    propertiesCount: 15
  }
];

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Ricardo Silva',
    role: 'Comprador',
    content: 'A ImobiTech facilitou todo o processo de compra da minha primeira casa. A transparência e a tecnologia deles são incomparáveis.',
    avatar: 'https://picsum.photos/seed/ricardo/100/100',
    rating: 5,
    date: '15 de Fevereiro, 2024'
  },
  {
    id: '2',
    name: 'Mariana Costa',
    role: 'Inquilina',
    content: 'Alugar um apartamento nunca foi tão rápido. Fiz tudo pelo celular e em menos de 24 horas já estava com as chaves.',
    avatar: 'https://picsum.photos/seed/mariana/100/100',
    rating: 5,
    date: '02 de Março, 2024'
  },
  {
    id: '3',
    name: 'Carlos Eduardo',
    role: 'Vendedor',
    content: 'Vendi meu imóvel em tempo recorde. O suporte dos corretores e a visibilidade da plataforma fizeram toda a diferença.',
    avatar: 'https://picsum.photos/seed/carlos/100/100',
    rating: 4,
    date: '20 de Janeiro, 2024'
  },
  {
    id: '4',
    name: 'Ana Paula',
    role: 'Investidora',
    content: 'Uso a ImobiTech para gerenciar meus investimentos imobiliários. A análise de dados deles me ajuda a tomar decisões melhores.',
    avatar: 'https://picsum.photos/seed/ana/100/100',
    rating: 5,
    date: '10 de Dezembro, 2023'
  }
];
