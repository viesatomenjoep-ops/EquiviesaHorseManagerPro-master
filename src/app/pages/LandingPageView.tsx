import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Menu, X, ChevronRight, Shield, Zap, Globe, Smartphone, Activity, DollarSign, Users, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

export function LandingPageView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    { name: 'Oplossingen', href: '#features' },
    { name: 'Prijzen', href: '#pricing', action: () => navigate('/app/pricing') },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans selection:bg-[#C2A878] selection:text-white text-slate-200">
      
      {/* GLOW EFFECTS */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#C2A878]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* HEADER */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 \${
          isScrolled 
            ? 'bg-[#0a0a0a]/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-white/5 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
              <div className="w-10 h-10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl flex items-center justify-center shadow-lg border border-white/10 group-hover:border-[#C2A878]/50 transition-colors overflow-hidden">
                <img src="/viesa-logo.png" alt="Viesa Logo" className="w-8 h-8 object-contain drop-shadow-md" />
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-white">
                Equiviesa<span className="text-[#C2A878]">Pro</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={link.action ? link.action : () => {
                        const el = document.querySelector(link.href);
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }} 
                      className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center gap-4 pl-8 border-l border-white/10">
                <button 
                  onClick={() => navigate('/app')} 
                  className="text-sm font-bold text-white hover:text-[#C2A878] transition-colors"
                >
                  Inloggen
                </button>
                <button 
                  onClick={() => navigate('/app/pricing')} 
                  className="bg-gradient-to-r from-[#C2A878] to-[#B0986A] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(194,168,120,0.3)] hover:shadow-[0_0_30px_rgba(194,168,120,0.5)] hover:-translate-y-0.5 transition-all"
                >
                  Start 22 Dagen Gratis
                </button>
              </div>
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => navigate('/app')} className="text-white text-sm font-bold">
                Inloggen
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -mr-2 text-white hover:bg-white/5 rounded-full transition-colors"
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
            className="md:hidden absolute top-full left-0 right-0 bg-[#111] border-b border-white/10 shadow-2xl"
          >
            <div className="px-6 py-8 space-y-4">
              <ul className="space-y-6 pb-6 border-b border-white/10">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={() => { setMobileMenuOpen(false); if(link.action) link.action(); }} 
                      className="block text-lg font-bold text-slate-300 hover:text-white transition-colors w-full text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4 pt-4">
                <button onClick={() => navigate('/app')} className="w-full py-4 bg-white/5 text-white rounded-xl font-bold text-center hover:bg-white/10 transition-colors border border-white/10">
                  Naar Stal Manager (Inloggen)
                </button>
                <button onClick={() => navigate('/app/pricing')} className="w-full py-4 bg-gradient-to-r from-[#C2A878] to-[#B0986A] text-white rounded-xl font-bold text-center shadow-lg transition-all">
                  Start 22 Dagen Gratis
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-[#C2A878] text-xs font-bold uppercase tracking-widest mb-8 border border-[#C2A878]/30 backdrop-blur-sm">
              <SparkleIcon className="w-4 h-4" /> The Global Equestrian Ecosystem
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight max-w-5xl leading-[1.1] mb-8 drop-shadow-2xl">
              Van Chaos Naar <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C2A878] to-[#E5D3B3]">Controle</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
              Vervang gefragmenteerde tools door het meest complete, schaalbare alles-in-één platform voor moderne stallen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto justify-center">
              <button 
                onClick={() => navigate('/app/pricing')} 
                className="px-10 py-5 bg-gradient-to-r from-[#C2A878] to-[#B0986A] text-white rounded-2xl font-bold text-lg hover:shadow-[0_0_30px_rgba(194,168,120,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              >
                Start Je Proefperiode <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate('/app')} 
                className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-3 backdrop-blur-sm"
              >
                Direct Inloggen
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
            <div className="rounded-2xl border border-white/10 bg-[#111]/80 backdrop-blur-xl p-6 md:p-10 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C2A878] to-transparent opacity-50" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/5 text-left">
                  <Activity className="w-8 h-8 text-[#C2A878] mb-4" />
                  <div className="text-sm text-slate-400 mb-1">Actieve Paarden</div>
                  <div className="text-3xl font-bold text-white">42</div>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/5 text-left">
                  <DollarSign className="w-8 h-8 text-[#C2A878] mb-4" />
                  <div className="text-sm text-slate-400 mb-1">Maandomzet</div>
                  <div className="text-3xl font-bold text-white">€34K</div>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/5 text-left hidden md:block">
                  <Calendar className="w-8 h-8 text-[#C2A878] mb-4" />
                  <div className="text-sm text-slate-400 mb-1">Taken Vandaag</div>
                  <div className="text-3xl font-bold text-white">18</div>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/5 text-left hidden md:block">
                  <Users className="w-8 h-8 text-[#C2A878] mb-4" />
                  <div className="text-sm text-slate-400 mb-1">Stalpersoneel</div>
                  <div className="text-3xl font-bold text-white">6</div>
                </div>
              </div>
            </div>
          </motion.div>

        </section>

        {/* FEATURES GRID */}
        <section id="features" className="py-24 bg-[#0d0d0d] relative border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Alles Wat Je Stal Nodig Heeft</h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">Vier krachtige modules die naadloos samenwerken op één overzichtelijk platform.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#151515] p-10 rounded-3xl border border-white/5 hover:border-[#C2A878]/30 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-[#C2A878]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Stable & Horse Management</h3>
                <p className="text-slate-400 leading-relaxed text-lg">Digitaal gezondheidsdossier, interactieve stalborden en taakdelegatie voor grooms via de mobiele app.</p>
              </div>
              <div className="bg-[#151515] p-10 rounded-3xl border border-white/5 hover:border-[#C2A878]/30 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-[#C2A878]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">IoT Tracker & Billing Engine</h3>
                <p className="text-slate-400 leading-relaxed text-lg">Automatische facturatie: paard in de stapmolen = automatische toevoeging op de maandfactuur via Stripe.</p>
              </div>
              <div className="bg-[#151515] p-10 rounded-3xl border border-white/5 hover:border-[#C2A878]/30 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-8 h-8 text-[#C2A878]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Equine Media Vault</h3>
                <p className="text-slate-400 leading-relaxed text-lg">Ongelimiteerde cloudopslag voor 4K trainingsvideo's, auto-tagging op paardnaam, en geïntegreerde watermerken.</p>
              </div>
              <div className="bg-[#151515] p-10 rounded-3xl border border-white/5 hover:border-[#C2A878]/30 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-[#C2A878]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Social CMS & SEO Tools</h3>
                <p className="text-slate-400 leading-relaxed text-lg">Plan en publiceer direct naar Instagram/Facebook en domineer zoekmachines met onze geautomatiseerde lokale SEO.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BOTTOM */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#C2A878]/5" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl font-bold text-white mb-8">Klaar Om Je Stal Te Moderniseren?</h2>
            <p className="text-xl text-slate-400 mb-12">Start direct met het stroomlijnen van je operatie. Geen creditcard nodig voor de proefperiode.</p>
            <button 
              onClick={() => navigate('/app/pricing')} 
              className="px-12 py-5 bg-gradient-to-r from-[#C2A878] to-[#B0986A] text-white rounded-full font-bold text-xl hover:shadow-[0_0_40px_rgba(194,168,120,0.5)] hover:-translate-y-1 transition-all"
            >
              Probeer Equiviesa Pro Gratis
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-xl text-white">Equiviesa<span className="text-[#C2A878]">Pro</span></span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 Equiviesa. Alle rechten voorbehouden.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Voorwaarden</a>
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
