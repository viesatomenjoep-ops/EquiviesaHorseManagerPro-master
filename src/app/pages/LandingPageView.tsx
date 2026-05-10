import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Menu, X, ChevronRight, Play, Shield, Zap, Globe, Smartphone } from 'lucide-react';
import { LanguageSelector } from '../components/LanguageSelector';
import { useTranslation } from 'react-i18next';

export function LandingPageView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('landing.nav.solutions'), href: '#features' },
    { name: t('landing.nav.pricing'), href: '#pricing', action: () => navigate('/app/pricing') },
    { name: t('landing.nav.stories'), href: '#stories' },
    { name: t('landing.nav.faq'), href: '#faq' },
    { name: t('landing.nav.contact'), href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#C2A878] selection:text-white">
      {/* PUBLIC HEADER */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                <img src="/viesa-logo.png" alt="Viesa Logo" className="w-8 h-8 object-contain drop-shadow-md" />
              </div>
              <span className={`font-serif font-bold text-xl tracking-tight transition-colors text-black`}>
                Equiviesa<span className="text-black">Pro</span>
              </span>
              <button onClick={() => navigate('/')}
                className="w-2 h-2 rounded-full bg-black hover:bg-slate-800 transition-colors"
                aria-label="Return to homepage"
                title="Return to homepage"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <ul className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={link.action ? link.action : () => {}} 
                      className="text-sm font-bold text-black hover:text-[#C2A878] transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
                <LanguageSelector />
                <button onClick={() => navigate('/app')} className="text-sm font-bold text-black hover:text-[#C2A878] transition-colors">
                  Inloggen
                </button>
                <button onClick={() => window.location.href = "https://wa.me/31651641886"} className="text-sm font-bold text-black hover:text-[#C2A878] transition-colors">
                  Adviesgesprek
                </button>
                <button onClick={() => navigate('/app/pricing')} className="bg-[#C2A878] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md shadow-[#C2A878]/20 hover:bg-[#b09665] hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Start 22 Dagen Gratis
                </button>
              </div>
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <LanguageSelector />
              <button onClick={() => navigate('/app/pricing')} className="bg-[#C2A878] text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm">
                Probeer Gratis
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -mr-2 text-black hover:bg-slate-100 rounded-full transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl animate-in slide-in-from-top-2">
            <div className="px-4 py-6 space-y-4">
              <ul className="space-y-4 pb-6 border-b border-slate-100">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={() => { setMobileMenuOpen(false); if(link.action) link.action(); }} 
                      className="block text-base font-bold text-slate-800 hover:text-[#C2A878] transition-colors w-full text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 pt-2">
                <button onClick={() => navigate('/app')} className="w-full py-3 bg-black text-white rounded-xl font-bold text-center hover:bg-slate-900 transition-colors">
                  Inloggen Portaal
                </button>
                <button onClick={() => window.location.href = "https://wa.me/31651641886"} className="w-full py-3 border-2 border-black text-black rounded-xl font-bold text-center hover:bg-slate-50 transition-colors">
                  Vraag Demo Aan
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION PLACEHOLDER */}
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C2A878]/10 text-[#C2A878] text-xs font-bold uppercase tracking-widest mb-8 border border-[#C2A878]/20">
          <SparkleIcon className="w-3.5 h-3.5" /> {t('landing.tagline')}
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-black tracking-tight max-w-4xl leading-[1.1] mb-6">
          {t('landing.title')} <span className="text-black">{t('landing.subtitle')}</span>
        </h1>
        
        <p className="text-lg md:text-xl text-black font-medium max-w-2xl mb-10 leading-relaxed">
          {t('landing.description')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button onClick={() => navigate('/app/pricing')} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
            {t('landing.cta.start_free')} <ChevronRight className="w-5 h-5" />
          </button>
          <button className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
            <Play className="w-5 h-5 text-[#C2A878] fill-[#C2A878]" /> {t('landing.cta.watch_demo')}
          </button>
        </div>

        {/* Feature Teaser */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl w-full text-left">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <Shield className="w-8 h-8 text-black mb-4" />
            <h3 className="font-bold text-black mb-2">{t('landing.features.ehr.title')}</h3>
            <p className="text-sm text-black font-medium">{t('landing.features.ehr.desc')}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <Zap className="w-8 h-8 text-black mb-4" />
            <h3 className="font-bold text-black mb-2">{t('landing.features.planning.title')}</h3>
            <p className="text-sm text-black font-medium">{t('landing.features.planning.desc')}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <Globe className="w-8 h-8 text-black mb-4" />
            <h3 className="font-bold text-black mb-2">{t('landing.features.billing.title')}</h3>
            <p className="text-sm text-black font-medium">{t('landing.features.billing.desc')}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <Smartphone className="w-8 h-8 text-black mb-4" />
            <h3 className="font-bold text-black mb-2">{t('landing.features.access.title')}</h3>
            <p className="text-sm text-black font-medium">{t('landing.features.access.desc')}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

function SparkleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
