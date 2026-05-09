import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, Building, Briefcase, Zap, Shield, Globe, Users, PenTool, LayoutTemplate } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

const CUSTOM_MODULES = [
  { id: 'ehr', price: 45, icon: Shield },
  { id: 'erp', price: 65, icon: Briefcase },
  { id: 'crm', price: 40, icon: Users },
  { id: 'cms', price: 120, icon: Globe },
  { id: 'css', price: 30, icon: PenTool },
  { id: 'branding', price: 80, icon: LayoutTemplate },
  { id: 'ai', price: 90, icon: Zap },
  { id: 'breeding', price: 55, icon: Sparkles },
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

  const plans = [
    { id: 'basic', price: 149 },
    { id: 'premium', price: 299, popular: true },
    { id: 'ultra', price: 599 }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="text-center space-y-4 max-w-2xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
          {t('pricing.title')} <span className="text-[#C2A878]">{t('pricing.pro')}</span>
        </h1>
        <p className="text-base md:text-lg text-slate-600">
          <Trans i18nKey="pricing.subtitle">
            Beheer letterlijk alles vanaf één plek. Kies een compleet pakket of stel je eigen gepersonaliseerde abonnement samen. Start vandaag met een <span className="font-bold text-[#C2A878]">gratis 30-dagen free trial</span>.
          </Trans>
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center px-4">
        <div className="bg-slate-100 p-1 rounded-2xl flex items-center shadow-inner w-full max-w-md">
          <button 
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'presets' ? 'bg-white shadow-sm text-[#C2A878]' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t('pricing.tabs.presets')}
          </button>
          <button 
            onClick={() => setActiveTab('custom')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'custom' ? 'bg-white shadow-sm text-[#C2A878]' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t('pricing.tabs.custom')}
          </button>
        </div>
      </div>

      {activeTab === 'presets' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start px-4">
          {plans.map((plan) => {
            const features = t(`pricing.plans.${plan.id}.features`, { returnObjects: true }) as string[];
            return (
              <div key={plan.id} className={`relative bg-white rounded-3xl p-6 md:p-8 border-2 ${plan.popular ? 'border-[#C2A878] shadow-xl shadow-[#C2A878]/10' : 'border-slate-100 shadow-sm'} flex flex-col h-full transform transition-all hover:-translate-y-1`}>
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C2A878] text-white px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-md whitespace-nowrap">
                    {t('pricing.plans.most_popular')}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900">{t(`pricing.plans.${plan.id}.name`)}</h3>
                  <p className="text-slate-500 text-sm mt-1.5 min-h-[3rem]">{t(`pricing.plans.${plan.id}.desc`)}</p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-slate-900">€{plan.price}</span>
                    <span className="text-slate-500 text-sm">{t('pricing.plans.month')}</span>
                  </div>
                  <div className="mt-3 text-xs font-bold text-[#C2A878] bg-[#C2A878]/10 inline-block px-3 py-1 rounded-lg">
                    {t(`pricing.plans.${plan.id}.horses`)}
                  </div>
                </div>

                <div className="flex-grow space-y-3 mb-6">
                  {Array.isArray(features) && features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="mt-0.5 bg-emerald-100 p-0.5 rounded-full shrink-0">
                        <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                      </div>
                      <span className={`text-sm leading-tight ${i === 0 && plan.id !== 'basic' ? 'font-bold text-slate-900' : 'text-slate-600'}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all ${plan.popular ? 'bg-[#C2A878] text-white hover:bg-[#b09665] shadow-md' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                  {t('pricing.plans.trial_btn')}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'custom' && (
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border-2 border-[#C2A878]/20 mx-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{t('pricing.custom.title')}</h2>
            <p className="text-slate-500 mt-2 text-sm md:text-base">{t('pricing.custom.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {CUSTOM_MODULES.map(mod => {
              const Icon = mod.icon;
              const isSelected = selectedModules.includes(mod.id);
              return (
                <button
                  key={mod.id}
                  onClick={() => toggleModule(mod.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${isSelected ? 'bg-slate-50 border-[#C2A878] ring-1 ring-[#C2A878] shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-[#C2A878]/10 text-[#C2A878]' : 'bg-slate-100 text-slate-500'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-sm font-bold ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>{t(`pricing.custom.modules.${mod.id}`)}</span>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${isSelected ? 'text-[#C2A878]' : 'text-slate-500'}`}>€{mod.price}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">{t('pricing.plans.month').replace('/', '').trim()}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50 -mx-6 md:-mx-10 -mb-6 md:-mb-10 p-6 md:p-10 rounded-b-3xl">
            <div className="text-center md:text-left">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{t('pricing.custom.total_label')}</p>
              <div className="flex items-baseline justify-center md:justify-start gap-2">
                <span className="text-4xl font-extrabold text-slate-900">€{customTotal}</span>
                <span className="text-slate-500 text-sm">{t('pricing.plans.month')}</span>
              </div>
            </div>
            <button 
              disabled={selectedModules.length === 0}
              className="w-full md:w-auto px-8 py-3.5 bg-[#C2A878] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#b09665] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {t('pricing.custom.start_btn')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
