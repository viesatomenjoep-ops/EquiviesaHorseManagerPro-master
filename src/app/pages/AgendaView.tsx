import { useState, useEffect } from 'react';
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
  Search
} from 'lucide-react';

const careCategories = [
  { id: 'clinical', name: 'Klinische Afspraken', count: 2, icon: HeartPulse, color: 'text-rose-500', bg: 'bg-rose-50' },
  { id: 'parasite', name: 'Parasietpreventie', count: 1, icon: BugOff, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'immune', name: 'Immunisatie', count: 3, icon: Syringe, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'daily', name: 'Dagelijks Welzijn', count: 0, icon: Activity, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'medical', name: 'Medische Interventies', count: 1, icon: Pill, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 'dental', name: 'Gebitscontrole', count: 0, icon: Sparkles, color: 'text-teal-500', bg: 'bg-teal-50' },
  { id: 'farrier', name: 'Hoefsmid & Beslag', count: 4, icon: CalendarIcon, color: 'text-slate-500', bg: 'bg-slate-100' },
];

export function AgendaView() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4)); // May 2026 based on screenshot
  const [selectedDate, setSelectedDate] = useState<number | null>(9); // 9th selected by default
  const [activeTab, setActiveTab] = useState('planning');

  // Generate simple calendar days for the mockup
  const daysInMonth = 31;
  const firstDayOfMonth = 5; // Friday
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth - 1 }, (_, i) => i);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex gap-6">
          <button 
            onClick={() => setActiveTab('planning')}
            className={`font-semibold text-lg pb-4 -mb-[17px] transition-colors ${
              activeTab === 'planning' ? 'text-[#C2A878] border-b-2 border-[#C2A878]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Planning
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`font-semibold text-lg pb-4 -mb-[17px] transition-colors ${
              activeTab === 'history' ? 'text-[#C2A878] border-b-2 border-[#C2A878]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Historiek
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Filter..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-[#C2A878] focus:border-[#C2A878] w-48" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Calendar (col-span-12 lg:col-span-3) */}
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Mei <span className="text-slate-400 font-normal">2026</span></h2>
            <div className="flex items-center gap-1">
              <button className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50"><ChevronLeft className="w-4 h-4 text-slate-600" /></button>
              <button className="px-2 py-1.5 border border-slate-200 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-50">Vandaag</button>
              <button className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50"><ChevronRight className="w-4 h-4 text-slate-600" /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'].map(day => (
              <div key={day} className="text-xs font-bold text-slate-900 mb-2">{day}</div>
            ))}
            {blanks.map(b => <div key={`b-${b}`} />)}
            {days.map(day => {
              const isSelected = day === selectedDate;
              const hasEvent = day === 8;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    isSelected 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : hasEvent 
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Middle Column: Upcoming Events (col-span-12 lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-slate-900">
              Morgen <span className="text-slate-400 font-normal">Za 9 mei</span>
            </h3>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Event Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:border-[#D4C099] transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  Hoefsmid & Beslag
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
                </h4>
                <p className="text-slate-500 text-sm mt-1">Nieuw ijzerbeslag (Luna & Chimi)</p>
              </div>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full uppercase tracking-wider">To-Do</span>
            </div>
            
            <div className="flex items-center gap-3 mt-6">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm">
                <img src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Farrier" className="w-10 h-10 rounded-full object-cover" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-slate-900">Smid: Jan de Vries</p>
                <p className="text-slate-500">Gepland: 09:00 - 11:30</p>
              </div>
            </div>
          </div>
          
          {/* Empty State */}
          <div className="bg-white/50 p-6 rounded-2xl border border-dashed border-slate-200 text-center">
            <p className="text-slate-400 italic">Niets verder gepland voor deze dag</p>
          </div>
        </div>

        {/* Right Column: Categories (col-span-12 lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-xl font-bold text-slate-900">Overzicht Zorg</h3>
            <p className="text-sm text-slate-500 mt-1">Filter op specifieke behandeltypes</p>
          </div>
          
          <div className="divide-y divide-slate-50">
            {careCategories.map(cat => {
              const Icon = cat.icon;
              return (
                <button key={cat.id} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-700 group-hover:text-slate-900">{cat.name}</p>
                      <p className="text-xs text-slate-400">{cat.count} gepland</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-transform" />
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
