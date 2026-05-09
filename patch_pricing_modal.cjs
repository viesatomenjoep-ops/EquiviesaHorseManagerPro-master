const fs = require('fs');

let content = fs.readFileSync('src/app/pages/PricingView.tsx', 'utf8');

// Add Lucide icons needed
content = content.replace(
  /Check, ArrowRight, Sparkles, Building, Briefcase, Zap, Shield, Globe, Users, PenTool, LayoutTemplate/g,
  'Check, ArrowRight, Sparkles, Building, Briefcase, Zap, Shield, Globe, Users, PenTool, LayoutTemplate, X, CreditCard, Mail, Lock'
);

// Add Checkout State
content = content.replace(
  /const \[selectedModules, setSelectedModules\] = useState<string\[\]>\(\[\]\);/g,
  `const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);`
);

// Update Preset Button
content = content.replace(
  /<button className=\{`w-full py-3.5 rounded-xl text-sm font-bold transition-all \${plan.popular \? 'bg-\[#C2A878\] text-white hover:bg-\[#b09665\] shadow-md' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`\}>\s*\{t\('pricing.plans.trial_btn'\)\}\s*<\/button>/g,
  `<button onClick={() => { setCheckoutData({ type: 'preset', plan }); setShowCheckout(true); }} className={\`w-full py-3.5 rounded-xl text-sm font-bold transition-all \${plan.popular ? 'bg-[#C2A878] text-white hover:bg-[#b09665] shadow-md' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}\`}>
                  {t('pricing.plans.trial_btn')}
                </button>`
);

// Update Custom Button
content = content.replace(
  /<button \s*disabled=\{selectedModules.length === 0\}\s*className="w-full md:w-auto px-8 py-3.5 bg-\[#C2A878\] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-\[#b09665\] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"\s*>\s*\{t\('pricing.custom.start_btn'\)\} <ArrowRight className="w-4 h-4" \/>\s*<\/button>/g,
  `<button 
              disabled={selectedModules.length === 0}
              onClick={() => { setCheckoutData({ type: 'custom', modules: selectedModules, total: customTotal }); setShowCheckout(true); }}
              className="w-full md:w-auto px-8 py-3.5 bg-[#C2A878] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#b09665] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {t('pricing.custom.start_btn')} <ArrowRight className="w-4 h-4" />
            </button>`
);

// Add Modal at the end
const modalCode = `
      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Left side: Form */}
            <div className="flex-1 p-8 md:p-10 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900">Start je 30-Dagen Trial</h2>
                <button onClick={() => setShowCheckout(false)} className="md:hidden p-2 bg-slate-100 rounded-full text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form className="space-y-5" onSubmit={e => { e.preventDefault(); setIsSubmitting(true); setTimeout(() => { setIsSubmitting(false); setShowCheckout(false); alert('Welkom bij Equiviesa Pro! Je account is succesvol aangemaakt.'); }, 1500); }}>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Bedrijfsnaam / Stalnaam</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input required type="text" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C2A878] outline-none transition-all" placeholder="Stal de Muze" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Voornaam</label>
                    <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C2A878] outline-none transition-all" placeholder="Jan" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Achternaam</label>
                    <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C2A878] outline-none transition-all" placeholder="Jansen" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">E-mailadres</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input required type="email" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C2A878] outline-none transition-all" placeholder="jan@stal.nl" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Wachtwoord</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input required type="password" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C2A878] outline-none transition-all" placeholder="••••••••" />
                  </div>
                </div>

                <div className="pt-4">
                  <label className="block text-sm font-bold text-slate-700 mb-3">Betaalmethode (Wordt pas na 30 dagen belast)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="border-2 border-[#C2A878] bg-[#C2A878]/5 rounded-xl p-3 flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="payment" defaultChecked className="text-[#C2A878] focus:ring-[#C2A878]" />
                      <CreditCard className="w-5 h-5 text-[#C2A878]" />
                      <span className="font-bold text-slate-900 text-sm">Creditcard</span>
                    </label>
                    <label className="border border-slate-200 bg-slate-50 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:border-[#C2A878]/50">
                      <input type="radio" name="payment" className="text-[#C2A878] focus:ring-[#C2A878]" />
                      <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">iDEAL</div>
                      <span className="font-bold text-slate-900 text-sm">iDEAL</span>
                    </label>
                  </div>
                </div>

                <button disabled={isSubmitting} type="submit" className="w-full py-4 bg-[#111111] hover:bg-slate-800 text-white rounded-xl font-bold text-lg mt-6 transition-all shadow-lg flex items-center justify-center gap-2">
                  {isSubmitting ? <Sparkles className="w-5 h-5 animate-spin" /> : 'Bevestig & Start Proefperiode'}
                </button>
                <p className="text-xs text-center text-slate-500 mt-4">Je zit nergens aan vast. Annuleer op elk moment tijdens je proefperiode.</p>
              </form>
            </div>

            {/* Right side: Summary */}
            <div className="w-full md:w-80 bg-slate-50 p-8 md:p-10 border-t md:border-t-0 md:border-l border-slate-200 flex flex-col relative">
              <button onClick={() => setShowCheckout(false)} className="hidden md:flex absolute top-6 right-6 p-2 bg-slate-200/50 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Jouw Abonnement</h3>
              
              {checkoutData?.type === 'preset' ? (
                <div className="space-y-4 flex-grow">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                    <span className="font-bold text-slate-900 text-lg">{t(\`pricing.plans.\${checkoutData.plan.id}.name\`)} Pakket</span>
                    <span className="font-bold text-slate-900">€{checkoutData.plan.price}</span>
                  </div>
                  <div className="text-sm text-slate-600 space-y-2">
                    {t(\`pricing.plans.\${checkoutData.plan.id}.features\`, { returnObjects: true })?.map((f, i) => (
                      <div key={i} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> {f}</div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 flex-grow">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                    <span className="font-bold text-slate-900 text-lg">Custom Plan</span>
                    <span className="font-bold text-slate-900">€{checkoutData?.total}</span>
                  </div>
                  <div className="text-sm text-slate-600 space-y-3">
                    {checkoutData?.modules?.map(id => (
                      <div key={id} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500" /> 
                          {t(\`pricing.custom.modules.\${id}\`)}
                        </div>
                        <span className="text-slate-400 text-xs font-medium">€{CUSTOM_MODULES.find(m => m.id === id)?.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-slate-200 mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-500">Vandaag te betalen</span>
                  <span className="font-extrabold text-2xl text-emerald-600">€0,00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Daarna per maand</span>
                  <span className="font-bold text-slate-900">€{checkoutData?.type === 'preset' ? checkoutData.plan.price : checkoutData?.total}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
`;

content = content.replace('</div>\n  );\n}\n', modalCode + '    </div>\n  );\n}\n');

fs.writeFileSync('src/app/pages/PricingView.tsx', content);
