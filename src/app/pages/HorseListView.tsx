import { useState } from 'react';
import { 
  Trophy,
  Euro,
  Tent,
  Activity,
  Plus,
  Search,
  MapPin,
  Heart
} from 'lucide-react';

const horseCategories = [
  { id: 'jumpers', name: 'Springpaarden', count: 18, icon: Trophy, color: 'text-blue-500', bg: 'bg-blue-50', hover: 'hover:bg-blue-50 hover:border-blue-200' },
  { id: 'dressage', name: 'Dressuurpaarden', count: 4, icon: Activity, color: 'text-purple-500', bg: 'bg-purple-50', hover: 'hover:bg-purple-50 hover:border-purple-200' },
  { id: 'sales', name: 'Handelspaarden', count: 12, icon: Euro, color: 'text-emerald-500', bg: 'bg-emerald-50', hover: 'hover:bg-emerald-50 hover:border-emerald-200' },
  { id: 'rearing', name: 'Opfok & Pensioen', count: 8, icon: Tent, color: 'text-rose-500', bg: 'bg-rose-50', hover: 'hover:bg-rose-50 hover:border-rose-200' },
];

export function HorseListView() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 1. Initial Dashboard View
  if (!selectedCategory) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Mijn Paarden</h1>
            <p className="text-slate-500 mt-2">Selecteer een categorie om het staloverzicht te bekijken.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {horseCategories.map(cat => {
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
                  <span className="text-sm font-semibold text-slate-600">{cat.count} Paarden</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. Detail View for a specific category
  const activeCatObj = horseCategories.find(c => c.id === selectedCategory);
  const ActiveIcon = activeCatObj?.icon || Trophy;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header for Category */}
      <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
        <button 
          onClick={() => setSelectedCategory(null)}
          className="mr-2 p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <span className="text-xl">←</span>
        </button>
        <div className={`p-4 rounded-2xl ${activeCatObj?.bg}`}>
          <ActiveIcon className={`w-8 h-8 ${activeCatObj?.color}`} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{activeCatObj?.name}</h1>
          <p className="text-slate-500 mt-1">Beheer alle {activeCatObj?.name.toLowerCase()} in de database.</p>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 min-h-[400px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={`Zoek in ${activeCatObj?.name}...`}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C2A878] transition-shadow"
            />
          </div>
          <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#111111] hover:bg-slate-800 text-[#C2A878] rounded-xl font-bold text-sm transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Paard Toevoegen
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-[#C2A878] hover:shadow-lg transition-all cursor-pointer">
              {/* Horse Image Header */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img 
                  src={`https://source.unsplash.com/800x600/?horse,jumping,equestrian&sig=${selectedCategory}${i}`} 
                  alt="Horse"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                  {selectedCategory === 'sales' ? '€ 45.000' : 'Actief'}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#C2A878] transition-colors">
                    {selectedCategory === 'sales' ? 'Chacco Blue II' : `Equiviesa's Star #${i}`}
                  </h3>
                </div>
                <p className="text-sm text-slate-500 mb-4 line-clamp-1">Kannan x Balou du Rouet • Ruin • 8 Jaar</p>
                
                <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>Hoofdstal, Box A{i}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-400" />
                    <span>Gezond</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
