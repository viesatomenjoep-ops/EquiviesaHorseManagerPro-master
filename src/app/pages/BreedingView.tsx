import { useState } from 'react';
import { 
  Dna,
  Microscope,
  Baby,
  Calendar,
  ChevronRight,
  ArrowLeft,
  Plus,
  Search,
  Activity,
  Snowflake,
  TrendingUp
} from 'lucide-react';

const breedingCategories = [
  { id: 'mares', name: 'Merrie Lijnen & Cycli', count: 12, icon: Dna, color: 'text-rose-500', bg: 'bg-rose-50', hover: 'hover:bg-rose-50 hover:border-rose-200' },
  { id: 'embryos', name: 'Embryo Tracking', count: 8, icon: Microscope, color: 'text-blue-500', bg: 'bg-blue-50', hover: 'hover:bg-blue-50 hover:border-blue-200' },
  { id: 'foals', name: 'Veulen Opfok', count: 5, icon: Baby, color: 'text-emerald-500', bg: 'bg-emerald-50', hover: 'hover:bg-emerald-50 hover:border-emerald-200' },
  { id: 'stallions', name: 'Hengstenkeuze', count: 3, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50', hover: 'hover:bg-purple-50 hover:border-purple-200' },
];

export function BreedingView() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 1. Initial Dashboard View
  if (!selectedCategory) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Fokkerij & Genetica</h1>
            <p className="text-slate-500 mt-2">Kies een onderdeel om je fokprogramma, embryo's en veulens te beheren.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {breedingCategories.map(cat => {
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
                  <span className="text-sm font-semibold text-slate-600">{cat.count} Actief</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. Detail View
  const activeCatObj = breedingCategories.find(c => c.id === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Left Column: Categories List */}
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
            <h3 className="text-lg font-bold text-slate-900">Fokkerij Overzicht</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {breedingCategories.map(cat => {
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

      {/* Right Column: Breeding Data Grid */}
      <div className="flex-1 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col md:flex-row justify-between items-center gap-4">
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
            Nieuwe Toevoegen
          </button>
        </div>

        {/* Dummy List for Embryos/Mares */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-[#C2A878] hover:shadow-md transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {selectedCategory === 'embryos' ? `Embryo #${202600 + i}` : `Merrie Cyclus ${i}`}
                  </h4>
                  <p className="text-slate-500 text-sm mt-1">
                    {selectedCategory === 'embryos' ? 'Chacco-Blue x Levisto' : 'Verwachte eisprong: over 3 dagen'}
                  </p>
                </div>
                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                  selectedCategory === 'embryos' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {selectedCategory === 'embryos' ? 'Diepvries' : 'Cyclus Actief'}
                </span>
              </div>
              
              <div className="flex gap-4 mt-6">
                <div className="flex-1 bg-slate-50 p-3 rounded-xl flex items-center gap-3">
                  <Activity className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</p>
                    <p className="text-sm font-bold text-slate-900">
                      {selectedCategory === 'embryos' ? 'Ingeslagen' : 'Scannen vr.'}
                    </p>
                  </div>
                </div>
                <div className="flex-1 bg-slate-50 p-3 rounded-xl flex items-center gap-3">
                  {selectedCategory === 'embryos' ? (
                    <Snowflake className="w-5 h-5 text-blue-400" />
                  ) : (
                    <Calendar className="w-5 h-5 text-rose-400" />
                  )}
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {selectedCategory === 'embryos' ? 'Locatie' : 'Laatste check'}
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      {selectedCategory === 'embryos' ? 'Vat 3, A2' : 'Gisteren'}
                    </p>
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
