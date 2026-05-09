import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, Building, Briefcase, Zap, Shield, Globe, Users, PenTool, LayoutTemplate } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PRESET_PLANS = [
  {
    id: 'basic',
    name: 'Basis',
    price: 149,
    description: 'Perfect voor kleine stallen.',
    horses: 'Tot 5 paarden',
    features: [
      'Standaard EHR (Gezondheid)',
      'Basis Agenda & Taken',
      'Locatie & Boxbeheer',
      'Email Support (48u reactie)',
      'Standaard Formulieren'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 299,
    description: 'Voor professionele stallen & fokkerij.',
    horses: 'Tot 10 paarden',
    features: [
      'Alles uit Basis, plus:',
      'Volledig ERP (Facturen & Offertes)',
      'Geavanceerd CRM Systeem',
      'Uitgebreide Fokkerij Module',
      'Lokale SEO Dominantie',
      'Klantportaal (Client Portal)',
      'Priority Support (24u reactie)'
    ],
    popular: true
  },
  {
    id: 'ultra',
    name: 'Ultra',
    price: 599,
    description: 'Voor de ultieme paardenonderneming.',
    horses: 'Vanaf 20 paarden',
    features: [
      'Alles uit Premium, plus:',
      'Compleet CMS (Website Manager)',
      'Custom Website Development',
      'Custom App Development Opties',
      'AI Klantenservice Bots (24/7)',
      'Logo & Branding Design',
      'Ondersteuning meerdere vestigingen',
      '24/7 VIP Telefoon Support'
    ]
  }
];

const CUSTOM_MODULES = [
  { id: 'ehr', name: 'EHR (Gezondheidsdossier)', price: 45, icon: Shield },
  { id: 'erp', name: 'ERP (Facturatie & Offertes)', price: 65, icon: Briefcase },
  { id: 'crm', name: 'CRM (Klantrelaties)', price: 40, icon: Users },
  { id: 'cms', name: 'CMS & Website Development', price: 120, icon: Globe },
  { id: 'css', name: 'CSS & Custom Styling', price: 30, icon: PenTool },
  { id: 'branding', name: 'Branding & Logo Design', price: 80, icon: LayoutTemplate },
  { id: 'ai', name: 'AI Automations & Bots', price: 90, icon: Zap },
  { id: 'breeding', name: 'Fokkerij Manager', price: 55, icon: Sparkles },
];

export function PricingView() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  const toggleModule = (id: string) => {
    setSelectedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const customTotal = CUSTOM_MODULES.filter(m => selectedModules.includes(m.id)).reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900">Paardenmanager App <span className="text-[#C2A878]">Pro</span></h1>
        <p className="text-lg text-slate-600">
          Beheer letterlijk alles vanaf één plek. Kies een compleet pakket of stel je eigen gepersonaliseerde abonnement samen. 
          Start vandaag met een <span className="font-bold text-[#C2A878]">gratis 22-dagen free trial</span>.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="bg-slate-100 p-1 rounded-2xl flex items-center shadow-inner">
          <button 
            onClick={() => setActiveTab('presets')}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'presets' ? 'bg-white shadow-sm text-[#C2A878]' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Vaste Pakketten
          </button>
          <button 
            onClick={() => setActiveTab('custom')}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'custom' ? 'bg-white shadow-sm text-[#C2A878]' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Bouw Je Eigen Abonnement
          </button>
        </div>
      </div>

      {activeTab === 'presets' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {PRESET_PLANS.map((plan, idx) => (
            <div key={plan.id} className={`relative bg-white rounded-3xl p-8 border-2 ${plan.popular ? 'border-[#C2A878] shadow-xl shadow-[#C2A878]/10' : 'border-slate-100 shadow-sm'} flex flex-col h-full transform transition-all hover:-translate-y-1`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C2A878] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
                  Meest Gekozen
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="text-slate-500 text-sm mt-2 min-h-[40px]">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-slate-900">€{plan.price}</span>
                  <span className="text-slate-500">/ maand</span>
                </div>
                <div className="mt-2 text-sm font-bold text-[#C2A878] bg-[#C2A878]/10 inline-block px-3 py-1 rounded-lg">
                  {plan.horses}
                </div>
              </div>

              <div className="flex-grow space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-emerald-100 p-0.5 rounded-full">
                      <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={3} />
                    </div>
                    <span className={`text-sm ${i === 0 && plan.id !== 'basic' ? 'font-bold text-slate-900' : 'text-slate-600'}`}>{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-[#C2A878] text-white hover:bg-[#b09665] shadow-md' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                Start 22-Dagen Free Trial
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'custom' && (
        <div className="bg-slate-900 rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Bouw Jouw Custom Plan</h2>
            <p className="text-slate-400 mt-2">Selecteer alleen de modules die jouw paardenbedrijf nodig heeft.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {CUSTOM_MODULES.map(mod => {
              const Icon = mod.icon;
              const isSelected = selectedModules.includes(mod.id);
              return (
                <button
                  key={mod.id}
                  onClick={() => toggleModule(mod.id)}
                  className={`flex items-center justify-between p-5 rounded-2xl border transition-all text-left ${isSelected ? 'bg-slate-800 border-[#C2A878] ring-1 ring-[#C2A878]' : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${isSelected ? 'bg-[#C2A878]/20 text-[#C2A878]' : 'bg-slate-700 text-slate-400'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>{mod.name}</span>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${isSelected ? 'text-[#C2A878]' : 'text-slate-400'}`}>€{mod.price}</div>
                    <div className="text-xs text-slate-500">/ mo</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Jouw Custom Plan Totaal</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-white">€{customTotal}</span>
                <span className="text-slate-400">/ maand</span>
              </div>
            </div>
            <button 
              disabled={selectedModules.length === 0}
              className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Custom Abonnement <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
