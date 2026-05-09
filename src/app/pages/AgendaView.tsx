import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabase';
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
  ArrowLeft
} from 'lucide-react';

interface CareEvent {
  id: string;
  category: string;
  title: string;
  date: string;
  status: string;
  provider: string;
  horse_name?: string;
}

export function AgendaView() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('planning');
  const [selectedDate, setSelectedDate] = useState<number | null>(9); // 9th selected by default
  const [events, setEvents] = useState<CareEvent[]>([]);
  const [showNewEvent, setShowNewEvent] = useState(false);
  
  // New event form state
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newProvider, setNewProvider] = useState('');

  const careCategories = useMemo(() => [
    { id: 'clinical', name: t('agenda.categories.clinical'), icon: HeartPulse, color: 'text-rose-500', bg: 'bg-rose-50', hover: 'hover:bg-rose-50 hover:border-rose-200' },
    { id: 'parasite', name: t('agenda.categories.parasite'), icon: BugOff, color: 'text-emerald-500', bg: 'bg-emerald-50', hover: 'hover:bg-emerald-50 hover:border-emerald-200' },
    { id: 'immune', name: t('agenda.categories.immune'), icon: Syringe, color: 'text-blue-500', bg: 'bg-blue-50', hover: 'hover:bg-blue-50 hover:border-blue-200' },
    { id: 'daily', name: t('agenda.categories.daily'), icon: Activity, color: 'text-amber-500', bg: 'bg-amber-50', hover: 'hover:bg-amber-50 hover:border-amber-200' },
    { id: 'medical', name: t('agenda.categories.medical'), icon: Pill, color: 'text-purple-500', bg: 'bg-purple-50', hover: 'hover:bg-purple-50 hover:border-purple-200' },
    { id: 'dental', name: t('agenda.categories.dental'), icon: Sparkles, color: 'text-teal-500', bg: 'bg-teal-50', hover: 'hover:bg-teal-50 hover:border-teal-200' },
    { id: 'farrier', name: t('agenda.categories.farrier'), icon: CalendarIcon, color: 'text-slate-500', bg: 'bg-slate-100', hover: 'hover:bg-slate-50 hover:border-slate-300' },
  ], [t]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const { data, error } = await supabase.from('care_events').select('*');
      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCreateEvent(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCategory || !newTitle || !newDate) return;

    try {
      const { error } = await supabase.from('care_events').insert({
        category: selectedCategory, // Note: backend expects enum types, making sure id matches enum if possible, else might fail
        title: newTitle,
        date: newDate,
        status: 'gepland',
        provider: newProvider || 'Unknown'
      });

      if (!error) {
        setShowNewEvent(false);
        setNewTitle('');
        setNewDate('');
        setNewProvider('');
        fetchEvents();
      } else {
        console.error(error);
        alert('Failed to save care event. Make sure the category enum matches.');
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Count items per category
  const categoriesWithCounts = careCategories.map(cat => ({
    ...cat,
    count: events.filter(e => e.category === cat.id && e.status === 'gepland').length
  }));

  // Filter events for the selected category
  const categoryEvents = events.filter(e => e.category === selectedCategory);
  const plannedEvents = categoryEvents.filter(e => e.status === 'gepland');
  const historyEvents = categoryEvents.filter(e => e.status === 'voltooid');

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
            <h1 className="text-3xl font-bold text-slate-900">{t('agenda.title')}</h1>
            <p className="text-slate-500 mt-2">{t('agenda.subtitle')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoriesWithCounts.map(cat => {
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
                  <span className="text-sm font-semibold text-slate-600">{cat.count} {t('agenda.planned')}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. Detail View (Planning & Historiek)
  const activeCatObj = categoriesWithCounts.find(c => c.id === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Left Column: Categories List (Healthcare Overview to the left) */}
      <div className="lg:w-80 flex-shrink-0 space-y-6">
        <button 
          onClick={() => setSelectedCategory(null)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#C2A878] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('agenda.back')}
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-900">{t('agenda.overview')}</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {categoriesWithCounts.map(cat => {
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
              onClick={() => { setActiveTab('planning'); setShowNewEvent(false); }}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                activeTab === 'planning' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {t('agenda.tabs.planning')}
            </button>
            <button 
              onClick={() => { setActiveTab('history'); setShowNewEvent(false); }}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                activeTab === 'history' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {t('agenda.tabs.history')}
            </button>
          </div>
          <button onClick={() => setShowNewEvent(true)} className="flex items-center gap-2 px-4 py-2 bg-[#C2A878] hover:bg-[#B09665] text-white rounded-lg font-bold text-sm transition-colors">
            <Plus className="w-4 h-4" />
            {t('agenda.new_entry')}
          </button>
        </div>

        {showNewEvent ? (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-in fade-in">
             <h2 className="text-lg font-bold mb-4 text-slate-900">{t('agenda.schedule_new', 'Nieuwe afspraak inplannen voor')} {activeCatObj?.name}</h2>
             <form onSubmit={handleCreateEvent} className="space-y-4 max-w-md">
               <div>
                 <label className="block text-sm font-bold text-slate-900 mb-1">{t('agenda.forms.title', 'Titel')}</label>
                 <input type="text" required value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md text-slate-900 bg-white" placeholder={t('agenda.forms.title_placeholder', 'Bijv. Controle of Enting')} />
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-900 mb-1">{t('agenda.forms.date', 'Datum')}</label>
                 <input type="date" required value={newDate} onChange={e => setNewDate(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md text-slate-900 bg-white" />
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-900 mb-1">{t('agenda.forms.provider', 'Uitvoerder (Dierenarts / Smid)')}</label>
                 <input type="text" value={newProvider} onChange={e => setNewProvider(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md text-slate-900 bg-white" placeholder={t('agenda.forms.provider_placeholder', 'Naam uitvoerder')} />
               </div>
               <div className="flex gap-3 pt-4">
                 <button type="submit" className="px-4 py-2 bg-[#C2A878] hover:bg-[#B09665] text-white rounded-lg font-bold transition-colors">{t('agenda.forms.save', 'Opslaan')}</button>
                 <button type="button" onClick={() => setShowNewEvent(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg font-bold transition-colors">{t('agenda.forms.cancel', 'Annuleren')}</button>
               </div>
             </form>
          </div>
        ) : activeTab === 'planning' ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Calendar */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Mei <span className="text-slate-400 font-normal">2026</span></h2>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50"><ChevronLeft className="w-4 h-4 text-slate-600" /></button>
                  <button className="px-2 py-1.5 border border-slate-200 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-50">{t('agenda.today')}</button>
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
                  const hasEvent = plannedEvents.some(e => {
                    const d = new Date(e.date);
                    return d.getDate() === day;
                  });
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
                {t('agenda.upcoming')} <span className="text-[#C2A878] font-normal">• {activeCatObj?.name}</span>
              </h3>
              
              {plannedEvents.length === 0 ? (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center text-slate-500">
                  Geen geplande afspraken.
                </div>
              ) : (
                plannedEvents.map(event => (
                  <div key={event.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-[#C2A878] hover:shadow-md transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">{event.title}</h4>
                        <p className="text-slate-500 text-sm mt-1">{event.provider}</p>
                      </div>
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider">{event.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : null}

        {activeTab === 'history' && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
            {historyEvents.length === 0 ? (
              <>
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{t('agenda.no_history')}</h3>
                <p className="text-slate-500 mt-2">{t('agenda.no_history_desc', { cat: activeCatObj?.name })}</p>
              </>
            ) : (
              <div className="space-y-4 text-left">
                 {historyEvents.map(event => (
                  <div key={event.id} className="p-4 border border-slate-200 rounded-lg">
                    <div className="font-bold">{event.title}</div>
                    <div className="text-sm text-slate-500">{event.date} • {event.provider}</div>
                  </div>
                 ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
