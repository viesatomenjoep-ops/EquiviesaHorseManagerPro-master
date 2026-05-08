import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  HeartPulse, 
  Stethoscope, 
  Syringe, 
  Scissors, 
  Activity, 
  AlertCircle,
  CheckCircle2,
  Calendar,
  Search,
  Plus
} from 'lucide-react';

export function HealthView() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'overview' | 'vaccinations' | 'farrier' | 'dental'>('overview');

  const stats = [
    { label: t('health.stats.healthy'), value: '41', icon: HeartPulse, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: t('health.stats.vaccinations'), value: '5', icon: Syringe, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: t('health.stats.farrier'), value: '12', icon: Scissors, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: t('health.stats.records'), value: '148', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-[#C2A878]" />
            {t('health.title')}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {t('health.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t('health.search')}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C2A878]"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#C2A878] text-white rounded-xl text-sm font-medium hover:bg-[#B0986A] transition-colors whitespace-nowrap">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">{t('health.new')}</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl overflow-x-auto">
            {[
              { id: 'overview', label: t('health.tabs.overview') },
              { id: 'vaccinations', label: t('health.tabs.vaccinations') },
              { id: 'farrier', label: t('health.tabs.farrier') },
              { id: 'dental', label: t('health.tabs.dental') }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Action List (Placeholder Data) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <h2 className="font-bold text-slate-900">{t('health.alerts.title')}</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { type: 'vaccine', horse: 'Luna', detail: 'Influenza & Tetanus', due: t('health.alerts.due_7'), urgency: 'high' },
                { type: 'farrier', horse: 'Don Juan', detail: 'Rondom beslaan', due: t('health.alerts.due_tomorrow'), urgency: 'high' },
                { type: 'vet', horse: 'Zangersheide Z', detail: 'Röntgenologische Keuring', due: t('health.alerts.due_week'), urgency: 'medium' },
                { type: 'dental', horse: 'Bella', detail: 'Jaarlijkse controle', due: t('health.alerts.due_30'), urgency: 'low' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.type === 'vaccine' ? 'bg-amber-100 text-amber-600' :
                      item.type === 'farrier' ? 'bg-blue-100 text-blue-600' :
                      item.type === 'vet' ? 'bg-purple-100 text-purple-600' :
                      'bg-emerald-100 text-emerald-600'
                    }`}>
                      {item.type === 'vaccine' ? <Syringe className="w-5 h-5" /> :
                       item.type === 'farrier' ? <Scissors className="w-5 h-5" /> :
                       <Stethoscope className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{item.horse}</h4>
                      <p className="text-sm text-slate-500">{item.detail}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.urgency === 'high' ? 'bg-red-100 text-red-700' :
                      item.urgency === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {item.due}
                    </span>
                    <button className="text-sm text-[#C2A878] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {t('health.alerts.action')} &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          
          {/* Quick Add Block */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-sm text-white relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#C2A878]/20 rounded-full blur-2xl"></div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#C2A878]" />
              {t('health.quick_log.title')}
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 rounded-xl p-3 text-left flex items-center gap-3">
                <Syringe className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-sm font-medium">{t('health.quick_log.vaccine')}</div>
                  <div className="text-xs text-white/50">{t('health.quick_log.vaccine_desc')}</div>
                </div>
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 rounded-xl p-3 text-left flex items-center gap-3">
                <Stethoscope className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-sm font-medium">{t('health.quick_log.vet')}</div>
                  <div className="text-xs text-white/50">{t('health.quick_log.vet_desc')}</div>
                </div>
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 rounded-xl p-3 text-left flex items-center gap-3">
                <Scissors className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-sm font-medium">{t('health.quick_log.farrier')}</div>
                  <div className="text-xs text-white/50">{t('health.quick_log.farrier_desc')}</div>
                </div>
              </button>
            </div>
          </div>

          {/* Dierenartsen & Smids */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-900 mb-4">{t('health.contacts.title')}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-slate-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-slate-900">Dierenkliniek De Bosakker</h4>
                  <p className="text-xs text-slate-500">Dr. H. Jansen</p>
                </div>
                <button className="p-2 text-slate-400 hover:text-[#C2A878] hover:bg-[#C2A878]/10 rounded-lg">
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-slate-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-slate-900">Hoefsmederij Veenstra</h4>
                  <p className="text-xs text-slate-500">Piet Veenstra</p>
                </div>
                <button className="p-2 text-slate-400 hover:text-[#C2A878] hover:bg-[#C2A878]/10 rounded-lg">
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button className="w-full mt-4 py-2 border border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:bg-slate-50 hover:border-slate-400 transition-colors">
              {t('health.contacts.add')}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
