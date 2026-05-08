import { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Syringe, 
  BugOff, 
  HeartPulse, 
  Activity, 
  Pill, 
  Sparkles,
  Search,
  ArrowLeft
} from 'lucide-react';

const careCategories = [
  { id: 'clinical', name: 'Klinische Afspraken', count: 2, icon: HeartPulse, color: 'text-rose-500', bg: 'bg-rose-50', hover: 'hover:bg-rose-50 hover:border-rose-200' },
  { id: 'parasite', name: 'Parasietpreventie', count: 1, icon: BugOff, color: 'text-emerald-500', bg: 'bg-emerald-50', hover: 'hover:bg-emerald-50 hover:border-emerald-200' },
  { id: 'immune', name: 'Immunisatie', count: 3, icon: Syringe, color: 'text-blue-500', bg: 'bg-blue-50', hover: 'hover:bg-blue-50 hover:border-blue-200' },
  { id: 'daily', name: 'Dagelijks Welzijn', count: 0, icon: Activity, color: 'text-amber-500', bg: 'bg-amber-50', hover: 'hover:bg-amber-50 hover:border-amber-200' },
  { id: 'medical', name: 'Medische Interventies', count: 1, icon: Pill, color: 'text-purple-500', bg: 'bg-purple-50', hover: 'hover:bg-purple-50 hover:border-purple-200' },
  { id: 'dental', name: 'Gebitscontrole', count: 0, icon: Sparkles, color: 'text-teal-500', bg: 'bg-teal-50', hover: 'hover:bg-teal-50 hover:border-teal-200' },
  { id: 'farrier', name: 'Hoefsmid & Beslag', count: 4, icon: CalendarIcon, color: 'text-slate-500', bg: 'bg-slate-100', hover: 'hover:bg-slate-50 hover:border-slate-300' },
];

export function AgendaView() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('planning');
  const [selectedDate, setSelectedDate] = useState<number | null>(9); // 9th selected by default

  // Calendar setup
  const daysInMonth = 31;
  const firstDayOfMonth = 5; 
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth - 1 }, (_, i) => i);

  // 1. Initial Dashboard View
  if (!selectedCategory) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Care Support Dashboard</h1>
            <p className="text-slate-500 mt-2">Selecteer een zorgcategorie om de planning en historiek te beheren.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {careCategories.map(cat => {
            const Icon = cat.icon;
            return (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex flex-col items-center justify-center p-8 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 group ${cat.hover} hover:-translate-y-1 hover:shadow-md`}
              >
                <div className={`w-20 h-20 rounded-full ${cat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-10 h-10 ${cat.color}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 text-center">{cat.name}</h3>
                <div className="mt-3 px-4 py-1.5 bg-slate-100 rounded-full">
                  <span className="text-sm font-semibold text-slate-600">{cat.count} Gepland</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. Detail View (Planning & Historiek)
  const activeCatObj = careCategories.find(c => c.id === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Left Column: Categories List (Healthcare Overview to the left) */}
      <div className="lg:w-80 flex-shrink-0 space-y-6">
        <button 
          onClick={() => setSelectedCategory(null)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#C2A878] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-900">Overzicht Zorg</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {careCategories.map(cat => {
              const Icon = cat.icon;
              const isActive = cat.id === selectedCategory;
              return (
                <button 
                  key={cat.id} 
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between p-4 transition-colors group ${
                    isActive ? 'bg-[#C2A878]/10' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${cat.bg} ${cat.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className={`font-bold ${isActive ? 'text-[#C2A878]' : 'text-slate-700'}`}>{cat.name}</p>
                    </div>
                  </div>
                  {isActive && <ChevronRight className="w-5 h-5 text-[#C2A878]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Planning & History Area */}
      <div className="flex-1 space-y-6">
        {/* Header Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 flex justify-between items-center">
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('planning')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                activeTab === 'planning' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Planning
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                activeTab === 'history' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Historiek
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#C2A878] hover:bg-[#B09665] text-white rounded-lg font-bold text-sm transition-colors">
            <Plus className="w-4 h-4" />
            Nieuwe Invoer
          </button>
        </div>

        {activeTab === 'planning' && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Calendar */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Mei <span className="text-slate-400 font-normal">2026</span></h2>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50"><ChevronLeft className="w-4 h-4 text-slate-600" /></button>
                  <button className="px-2 py-1.5 border border-slate-200 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-50">Vandaag</button>
                  <button className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50"><ChevronRight className="w-4 h-4 text-slate-600" /></button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'].map(day => (
                  <div key={day} className="text-xs font-bold text-slate-400 uppercase mb-2">{day}</div>
                ))}
                {blanks.map(b => <div key={`b-${b}`} />)}
                {days.map(day => {
                  const isSelected = day === selectedDate;
                  const hasEvent = day === 8 || day === 15;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-bold transition-all relative ${
                        isSelected 
                          ? 'bg-slate-900 text-white shadow-md' 
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {day}
                      {hasEvent && !isSelected && (
                        <div className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${activeCatObj?.color.replace('text-', 'bg-')} bg-rose-500`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Events for selected date */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Aankomend <span className="text-[#C2A878] font-normal">• {activeCatObj?.name}</span>
              </h3>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-[#C2A878] hover:shadow-md transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Preventieve Controle</h4>
                    <p className="text-slate-500 text-sm mt-1">Dierenkliniek De Paardenkamp</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider">Morgen</span>
                </div>
                <div className="text-sm border-t border-slate-100 pt-4 mt-2">
                  <p className="font-semibold text-slate-700">Paarden: <span className="font-normal text-slate-500">Luna, Chimi</span></p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Geen historiek gevonden</h3>
            <p className="text-slate-500 mt-2">Er zijn nog geen voltooide acties in de categorie {activeCatObj?.name}.</p>
          </div>
        )}

      </div>
    </div>
  );
}
