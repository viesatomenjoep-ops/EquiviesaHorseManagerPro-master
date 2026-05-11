import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Menu, X, ChevronRight, Shield, Zap, Globe, Smartphone, Activity, DollarSign, Users, Calendar, Moon, Sun, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';

export function LandingPageView() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Handle hydration mismatch for theme
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    let nextLang = 'en';
    if (currentLang === 'nl') nextLang = 'en';
    else if (currentLang === 'en') nextLang = 'es';
    else if (currentLang === 'es') nextLang = 'nl';
    
    i18n.changeLanguage(nextLang);
    localStorage.setItem('appLanguage', nextLang);
  };

  const navLinks = [
    { name: t('landing.nav.solutions', 'Oplossingen'), href: '#features' },
    { name: t('landing.nav.pricing', 'Prijzen'), href: '#pricing', action: () => navigate('/app/pricing') },
    { name: t('landing.nav.contact', 'Contact'), href: '#contact' },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-200 font-sans selection:bg-[#C2A878] selection:text-white transition-colors duration-300">
      
      {/* GLOW EFFECTS */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#C2A878]/5 dark:bg-[#C2A878]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* HEADER */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-slate-200 dark:border-white/5 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
              <div className="w-10 h-10 bg-white dark:bg-gradient-to-br dark:from-[#1a1a1a] dark:to-[#0a0a0a] rounded-xl flex items-center justify-center shadow-md dark:shadow-lg border border-slate-200 dark:border-white/10 group-hover:border-[#C2A878]/50 transition-colors overflow-hidden">
                <img src="/viesa-logo.png" alt="Viesa Logo" className="w-8 h-8 object-contain drop-shadow-sm dark:drop-shadow-md" />
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
                Equiviesa<span className="text-[#C2A878]">Pro</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <ul className="flex items-center gap-6 lg:gap-8">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={link.action ? link.action : () => {
                        const el = document.querySelector(link.href);
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }} 
                      className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#C2A878] dark:hover:text-white transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center gap-4 pl-6 lg:pl-8 border-l border-slate-300 dark:border-white/10">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors uppercase text-xs font-bold"
                  aria-label="Toggle Language"
                >
                  <Languages className="w-4 h-4" />
                  {i18n.language}
                </button>

                <button 
                  onClick={() => navigate('/app')} 
                  className="text-sm font-bold text-slate-900 dark:text-white hover:text-[#C2A878] dark:hover:text-[#C2A878] transition-colors"
                >
                  {t('landing.nav.login', 'Inloggen')}
                </button>
                <button 
                  onClick={() => navigate('/app/pricing')} 
                  className="bg-gradient-to-r from-[#C2A878] to-[#B0986A] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg dark:shadow-[0_0_20px_rgba(194,168,120,0.3)] dark:hover:shadow-[0_0_30px_rgba(194,168,120,0.5)] hover:-translate-y-0.5 transition-all"
                >
                  {t('landing.nav.start_free', 'Start 22 Dagen Gratis')}
                </button>
              </div>
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-slate-600 dark:text-white"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => navigate('/app')} className="text-slate-900 dark:text-white text-sm font-bold">
                {t('landing.nav.login', 'Inloggen')}
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -mr-2 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/5 rounded-full transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#111] border-b border-slate-200 dark:border-white/10 shadow-2xl"
          >
            <div className="px-6 py-8 space-y-4">
              <ul className="space-y-6 pb-6 border-b border-slate-200 dark:border-white/10">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={() => { setMobileMenuOpen(false); if(link.action) link.action(); }} 
                      className="block text-lg font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors w-full text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
                <li>
                  <button onClick={toggleLanguage} className="flex items-center gap-2 text-lg font-bold text-slate-700 dark:text-slate-300 w-full uppercase">
                    <Languages className="w-5 h-5" /> Taal: {i18n.language}
                  </button>
                </li>
              </ul>
              <div className="flex flex-col gap-4 pt-4">
                <button onClick={() => navigate('/app')} className="w-full py-4 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white rounded-xl font-bold text-center hover:bg-slate-200 dark:hover:bg-white/10 transition-colors border border-slate-300 dark:border-white/10">
                  {t('landing.nav.login', 'Naar Stal Manager (Inloggen)')}
                </button>
                <button onClick={() => navigate('/app/pricing')} className="w-full py-4 bg-gradient-to-r from-[#C2A878] to-[#B0986A] text-white rounded-xl font-bold text-center shadow-lg transition-all">
                  {t('landing.nav.start_free', 'Start 22 Dagen Gratis')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-40 pb-20 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center z-10 min-h-[90vh] justify-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/50 dark:bg-white/5 text-[#C2A878] text-xs font-bold uppercase tracking-widest mb-8 border border-[#C2A878]/30 backdrop-blur-sm">
              <SparkleIcon className="w-4 h-4" /> {t('landing.hero.badge', 'The Global Equestrian Ecosystem')}
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-5xl leading-[1.1] mb-8 drop-shadow-sm dark:drop-shadow-2xl">
              {t('landing.hero.title_1', 'Van Chaos Naar')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C2A878] to-[#B0986A] dark:from-[#C2A878] dark:to-[#E5D3B3]">{t('landing.hero.title_2', 'Controle')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
              {t('landing.hero.subtitle', 'Vervang gefragmenteerde tools door het meest complete, schaalbare alles-in-één platform voor moderne stallen.')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto justify-center">
              <button 
                onClick={() => navigate('/app/pricing')} 
                className="px-10 py-5 bg-gradient-to-r from-[#C2A878] to-[#B0986A] text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-[0_0_30px_rgba(194,168,120,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              >
                {t('landing.hero.start_trial', 'Start Je Proefperiode')} <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate('/app')} 
                className="px-10 py-5 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-400 dark:hover:border-white/20 transition-all flex items-center justify-center gap-3 backdrop-blur-sm shadow-sm dark:shadow-none"
              >
                {t('landing.hero.login_direct', 'Direct Inloggen')}
              </button>
            </div>
          </motion.div>

          {/* Abstract Dashboard Preview Graphic */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-24 w-full max-w-5xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-[#0a0a0a] via-transparent to-transparent z-10" />
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl p-6 md:p-10 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C2A878] to-transparent opacity-50" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6 border border-slate-100 dark:border-white/5 text-left">
                  <Activity className="w-8 h-8 text-[#C2A878] mb-4" />
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Actieve Paarden</div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">42</div>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6 border border-slate-100 dark:border-white/5 text-left">
                  <DollarSign className="w-8 h-8 text-[#C2A878] mb-4" />
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Maandomzet</div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">€34K</div>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6 border border-slate-100 dark:border-white/5 text-left hidden md:block">
                  <Calendar className="w-8 h-8 text-[#C2A878] mb-4" />
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Taken Vandaag</div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">18</div>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6 border border-slate-100 dark:border-white/5 text-left hidden md:block">
                  <Users className="w-8 h-8 text-[#C2A878] mb-4" />
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Stalpersoneel</div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">6</div>
                </div>
              </div>
            </div>
          </motion.div>

        </section>

        {/* FEATURES GRID */}
        <section id="features" className="py-24 bg-white dark:bg-[#0d0d0d] relative border-t border-slate-200 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">{t('landing.features.title', 'Alles Wat Je Stal Nodig Heeft')}</h2>
              <p className="text-slate-600 dark:text-slate-400 text-xl max-w-2xl mx-auto">{t('landing.features.subtitle', 'Vier krachtige modules die naadloos samenwerken op één overzichtelijk platform.')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 dark:bg-[#151515] p-10 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-[#C2A878]/30 dark:hover:border-[#C2A878]/30 transition-colors shadow-sm dark:shadow-none group">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white/5 shadow-sm dark:shadow-none border border-slate-100 dark:border-transparent flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-[#C2A878]" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('landing.features.f1_title', 'Stable & Horse Management')}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{t('landing.features.f1_desc', 'Digitaal gezondheidsdossier, interactieve stalborden en taakdelegatie voor grooms via de mobiele app.')}</p>
              </div>
              <div className="bg-slate-50 dark:bg-[#151515] p-10 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-[#C2A878]/30 dark:hover:border-[#C2A878]/30 transition-colors shadow-sm dark:shadow-none group">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white/5 shadow-sm dark:shadow-none border border-slate-100 dark:border-transparent flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-[#C2A878]" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('landing.features.f2_title', 'IoT Tracker & Billing Engine')}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{t('landing.features.f2_desc', 'Automatische facturatie: paard in de stapmolen = automatische toevoeging op de maandfactuur via Stripe.')}</p>
              </div>
              <div className="bg-slate-50 dark:bg-[#151515] p-10 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-[#C2A878]/30 dark:hover:border-[#C2A878]/30 transition-colors shadow-sm dark:shadow-none group">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white/5 shadow-sm dark:shadow-none border border-slate-100 dark:border-transparent flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-8 h-8 text-[#C2A878]" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('landing.features.f3_title', 'Equine Media Vault')}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{t('landing.features.f3_desc', 'Ongelimiteerde cloudopslag voor 4K trainingsvideo\'s, auto-tagging op paardnaam, en geïntegreerde watermerken.')}</p>
              </div>
              <div className="bg-slate-50 dark:bg-[#151515] p-10 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-[#C2A878]/30 dark:hover:border-[#C2A878]/30 transition-colors shadow-sm dark:shadow-none group">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white/5 shadow-sm dark:shadow-none border border-slate-100 dark:border-transparent flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-[#C2A878]" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('landing.features.f4_title', 'Social CMS & SEO Tools')}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{t('landing.features.f4_desc', 'Plan en publiceer direct naar Instagram/Facebook en domineer zoekmachines met onze geautomatiseerde lokale SEO.')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BOTTOM */}
        <section className="py-32 relative overflow-hidden bg-slate-50 dark:bg-[#0a0a0a]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#C2A878]/10 dark:to-[#C2A878]/5" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-8">{t('landing.cta.title', 'Klaar Om Je Stal Te Moderniseren?')}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">{t('landing.cta.subtitle', 'Start direct met het stroomlijnen van je operatie. Geen creditcard nodig voor de proefperiode.')}</p>
            <button 
              onClick={() => navigate('/app/pricing')} 
              className="px-12 py-5 bg-gradient-to-r from-[#C2A878] to-[#B0986A] text-white rounded-full font-bold text-xl shadow-xl hover:shadow-[0_0_40px_rgba(194,168,120,0.5)] hover:-translate-y-1 transition-all"
            >
              {t('landing.cta.btn', 'Probeer Equiviesa Pro Gratis')}
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-xl text-slate-900 dark:text-white">Equiviesa<span className="text-[#C2A878]">Pro</span></span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 Equiviesa. {t('landing.footer.rights', 'Alle rechten voorbehouden.')}</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">{t('landing.footer.privacy', 'Privacy')}</a>
            <a href="#" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">{t('landing.footer.terms', 'Voorwaarden')}</a>
          </div>
        </div>
      </footer>

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
