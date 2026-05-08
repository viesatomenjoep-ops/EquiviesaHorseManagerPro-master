import { useState } from 'react';
import { 
  Users, 
  Building2, 
  Briefcase, 
  MapPin, 
  Stethoscope,
  ChevronRight,
  ArrowLeft,
  Plus,
  Search,
  Phone,
  Mail,
  MapPin as LocationIcon
} from 'lucide-react';

const crmCategories = [
  { id: 'clients', name: 'Klanten & Eigenaren', count: 42, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', hover: 'hover:bg-blue-50 hover:border-blue-200' },
  { id: 'vets', name: 'Dierenartsen & Klinieken', count: 8, icon: Stethoscope, color: 'text-emerald-500', bg: 'bg-emerald-50', hover: 'hover:bg-emerald-50 hover:border-emerald-200' },
  { id: 'suppliers', name: 'Leveranciers', count: 14, icon: Briefcase, color: 'text-amber-500', bg: 'bg-amber-50', hover: 'hover:bg-amber-50 hover:border-amber-200' },
  { id: 'locations', name: 'Stallen & Locaties', count: 3, icon: MapPin, color: 'text-rose-500', bg: 'bg-rose-50', hover: 'hover:bg-rose-50 hover:border-rose-200' },
  { id: 'companies', name: 'Bedrijfsrelaties', count: 12, icon: Building2, color: 'text-slate-500', bg: 'bg-slate-100', hover: 'hover:bg-slate-50 hover:border-slate-300' },
];

export function AdministrationView() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 1. Initial Dashboard View
  if (!selectedCategory) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Administratie & CRM</h1>
            <p className="text-slate-500 mt-2">Selecteer een categorie om relaties, stallen of bedrijven te beheren.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crmCategories.map(cat => {
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
                  <span className="text-sm font-semibold text-slate-600">{cat.count} Relaties</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. Detail View
  const activeCatObj = crmCategories.find(c => c.id === selectedCategory);

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
            <h3 className="text-lg font-bold text-slate-900">CRM Categorieën</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {crmCategories.map(cat => {
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

      {/* Right Column: CRM Data Grid */}
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

        {/* Dummy List of contacts/companies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-[#C2A878] hover:shadow-md transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-xl font-bold text-slate-400">
                    {i === 1 ? 'E' : i === 2 ? 'V' : i === 3 ? 'S' : 'H'}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Equivest Holding B.V.</h4>
                    <p className="text-slate-500 text-sm font-medium">B2B Klant • Actief</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mt-4 pt-4 border-t border-slate-50 text-sm">
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400" />
                  +31 6 12 34 56 78
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400" />
                  contact@equivest.nl
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <LocationIcon className="w-4 h-4 text-slate-400" />
                  Amsterdam, NL
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
