import Link from 'next/link';
import { Home, Facebook, Twitter, Instagram, Mail, Info, Globe, DollarSign } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a2b3c] text-white">
                <Home size={24} />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-[#1a2b3c]">ImobiTech</h1>
            </div>
            <p className="text-sm leading-6 text-slate-600 max-w-xs">
              Revolucionando a forma como você encontra e garante seu próximo lar. Ferramentas modernas para um mercado moderno.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-slate-400 hover:text-[#1a2b3c] transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-[#1a2b3c] transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-[#1a2b3c] transition-colors">
                <Instagram size={20} />
              </Link>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold leading-6 text-slate-900">Imóveis</h3>
                <ul className="mt-6 space-y-4">
                  {[
                    { name: 'Casas em Destaque', href: '#' },
                    { name: 'Novos Anúncios', href: '#' },
                    { name: 'Aluguéis', href: '/rent' },
                    { name: 'Comercial', href: '#' }
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-slate-600 hover:text-[#1a2b3c]">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-bold leading-6 text-slate-900">Recursos</h3>
                <ul className="mt-6 space-y-4">
                  {[
                    { name: 'Calculadora de Hipoteca', href: '#' },
                    { name: 'Guia do Comprador', href: '#' },
                    { name: 'Depoimentos', href: '/testimonials' },
                    { name: 'Tendências de Mercado', href: '#' },
                    { name: 'Histórias de Sucesso', href: '#' }
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-slate-600 hover:text-[#1a2b3c]">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold leading-6 text-slate-900">Empresa</h3>
                <ul className="mt-6 space-y-4">
                  {[
                    { name: 'Sobre Nós', href: '/about' },
                    { name: 'Corretores', href: '/agents' },
                    { name: 'Contato', href: '#' },
                    { name: 'Carreiras', href: '#' }
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-slate-600 hover:text-[#1a2b3c]">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-bold leading-6 text-slate-900">Jurídico</h3>
                <ul className="mt-6 space-y-4">
                  {[
                    { name: 'Política de Privacidade', href: '#' },
                    { name: 'Termos de Serviço', href: '#' },
                    { name: 'Licenciamento', href: '#' }
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-slate-600 hover:text-[#1a2b3c]">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs leading-5 text-slate-500">© 2024 ImobiTech Soluções Imobiliárias. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Globe size={14} /> Português (BR)
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <DollarSign size={14} /> BRL
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
