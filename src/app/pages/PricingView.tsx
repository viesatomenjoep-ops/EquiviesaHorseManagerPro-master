import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, Building, Briefcase, Zap, Shield, Globe, Users, PenTool, LayoutTemplate, X, CreditCard, Mail, Lock } from 'lucide-react';
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
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            Beheer letterlijk alles vanaf één plek. Kies een compleet pakket of stel je eigen gepersonaliseerde abonnement samen. Start vandaag met een <span className="font-bold text-[#C2A878]">gratis 22-dagen free trial</span>.
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

                <button onClick={() => { setCheckoutData({ type: 'preset', plan }); setShowCheckout(true); }} className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all ${plan.popular ? 'bg-[#C2A878] text-white hover:bg-[#b09665] shadow-md' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
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
              onClick={() => { setCheckoutData({ type: 'custom', modules: selectedModules, total: customTotal }); setShowCheckout(true); }}
              className="w-full md:w-auto px-8 py-3.5 bg-[#C2A878] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#b09665] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {t('pricing.custom.start_btn')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    
      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 bg-black/60 overflow-y-auto animate-in fade-in duration-200">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row relative overflow-hidden">
            <div className="flex-1 p-6 md:p-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900">{t('pricing.checkout.title')}</h2>
                <button onClick={() => setShowCheckout(false)} className="md:hidden p-2 bg-slate-100 rounded-full text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form className="space-y-5" onSubmit={e => { e.preventDefault(); setIsSubmitting(true); setTimeout(() => { setIsSubmitting(false); setShowCheckout(false); alert(t('pricing.checkout.success')); }, 1500); }}>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">{t('pricing.checkout.company')}</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input required type="text" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C2A878] outline-none transition-all" placeholder={t('pricing.checkout.company_ph')} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">{t('pricing.checkout.firstname')}</label>
                    <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C2A878] outline-none transition-all" placeholder={t('pricing.checkout.firstname_ph')} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">{t('pricing.checkout.lastname')}</label>
                    <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C2A878] outline-none transition-all" placeholder={t('pricing.checkout.lastname_ph')} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">{t('pricing.checkout.email')}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input required type="email" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C2A878] outline-none transition-all" placeholder="jan@stal.nl" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">{t('pricing.checkout.password')}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input required type="password" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C2A878] outline-none transition-all" placeholder="••••••••" />
                  </div>
                </div>

                <div className="pt-4">
                  <label className="block text-sm font-bold text-slate-700 mb-3">{t('pricing.checkout.payment_method')}</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="border-2 border-[#C2A878] bg-[#C2A878]/5 rounded-xl p-3 flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="payment" defaultChecked className="text-[#C2A878] focus:ring-[#C2A878]" />
                      <CreditCard className="w-5 h-5 text-[#C2A878]" />
                      <span className="font-bold text-slate-900 text-sm">{t('pricing.checkout.creditcard')}</span>
                    </label>
                    <label className="border border-slate-200 bg-slate-50 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:border-[#C2A878]/50">
                      <input type="radio" name="payment" className="text-[#C2A878] focus:ring-[#C2A878]" />
                      <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">iDEAL</div>
                      <span className="font-bold text-slate-900 text-sm">iDEAL</span>
                    </label>
                  </div>
                </div>

                <button disabled={isSubmitting} type="submit" className="w-full py-4 bg-[#111111] hover:bg-slate-800 text-white rounded-xl font-bold text-lg mt-6 transition-all shadow-lg flex items-center justify-center gap-2">
                  {isSubmitting ? <Sparkles className="w-5 h-5 animate-spin" /> : t('pricing.checkout.submit')}
                </button>
                <p className="text-xs text-center text-slate-500 mt-4">{t('pricing.checkout.guarantee')}</p>
              </form>
            </div>

            {/* Right side: Summary */}
            <div className="w-full md:w-96 bg-slate-50 p-6 md:p-10 border-t md:border-t-0 md:border-l border-slate-200 flex flex-col relative rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl">
              <button onClick={() => setShowCheckout(false)} className="hidden md:flex absolute top-6 right-6 p-2 bg-slate-200/50 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">{t('pricing.checkout.summary_title')}</h3>
              
              {checkoutData?.type === 'preset' ? (
                <div className="space-y-4 flex-grow">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                    <span className="font-bold text-slate-900 text-lg">{t(`pricing.plans.${checkoutData.plan.id}.name`)} {t('pricing.checkout.plan_suffix')}</span>
                    <span className="font-bold text-slate-900">€{checkoutData.plan.price}</span>
                  </div>
                  <div className="text-sm text-slate-600 space-y-2">
                    {t(`pricing.plans.${checkoutData.plan.id}.features`, { returnObjects: true })?.map((f, i) => (
                      <div key={i} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> {f}</div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 flex-grow">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                    <span className="font-bold text-slate-900 text-lg">{t('pricing.checkout.custom_plan')}</span>
                    <span className="font-bold text-slate-900">€{checkoutData?.total}</span>
                  </div>
                  <div className="text-sm text-slate-600 space-y-3">
                    {checkoutData?.modules?.map(id => (
                      <div key={id} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500" /> 
                          {t(`pricing.custom.modules.${id}`)}
                        </div>
                        <span className="text-slate-400 text-xs font-medium">€{CUSTOM_MODULES.find(m => m.id === id)?.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-slate-200 mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-500">{t('pricing.checkout.pay_today')}</span>
                  <span className="font-extrabold text-2xl text-emerald-600">€0,00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">{t('pricing.checkout.pay_after')}</span>
                  <span className="font-bold text-slate-900">€{checkoutData?.type === 'preset' ? checkoutData.plan.price : checkoutData?.total}</span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
