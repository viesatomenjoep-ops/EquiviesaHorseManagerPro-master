import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Dna,
  Microscope,
  Baby,
  Calendar,
  Plus,
  Search,
  Activity,
  Snowflake,
  TrendingUp,
  Syringe,
  ClipboardList,
  Link as LinkIcon,
  Truck,
  DollarSign
} from 'lucide-react';

export function BreedingView() {
  const location = useLocation();
  const [activeSubModule, setActiveSubModule] = useState<string>('overview');

  // Determine which of the 4 main modules we are in based on the URL
  const path = location.pathname;
  let moduleName = "";
  let icon = Dna;
  let colorClass = "text-rose-500";
  let bgClass = "bg-rose-50";
  
  if (path.includes('mares')) {
    moduleName = "Mare Lines & Cycli";
    icon = Dna;
    colorClass = "text-rose-500";
    bgClass = "bg-rose-50";
  } else if (path.includes('embryos')) {
    moduleName = "Embryo Tracking";
    icon = Microscope;
    colorClass = "text-blue-500";
    bgClass = "bg-blue-50";
  } else if (path.includes('foals')) {
    moduleName = "Foal Rearing";
    icon = Baby;
    colorClass = "text-emerald-500";
    bgClass = "bg-emerald-50";
  } else if (path.includes('stallions')) {
    moduleName = "Stallion Selection";
    icon = TrendingUp;
    colorClass = "text-purple-500";
    bgClass = "bg-purple-50";
  }

  const MainIcon = icon;

  // Define the sub-blocks for EACH specific module
  const getSubBlocks = () => {
    if (path.includes('mares')) return [
      { id: 'cycles', name: 'Cyclus Registratie', icon: Activity, count: 12 },
      { id: 'scans', name: 'Dierenarts Scans', icon: Microscope, count: 4 },
      { id: 'treatments', name: 'Hormoonbehandelingen', icon: Syringe, count: 2 },
      { id: 'magic', name: 'Dierenarts Magic Links', icon: LinkIcon, count: 1 }
    ];
    if (path.includes('embryos')) return [
      { id: 'flushes', name: 'Embryo Spoelingen', icon: Activity, count: 5 },
      { id: 'storage', name: 'Vrieskist & Canisters', icon: Snowflake, count: 18 },
      { id: 'transfers', name: 'Draagmerrie Transfers', icon: Dna, count: 3 }
    ];
    if (path.includes('foals')) return [
      { id: 'registration', name: 'Paspoort & DNA', icon: ClipboardList, count: 6 },
      { id: 'health', name: 'Gezondheidschema', icon: Activity, count: 14 },
      { id: 'training', name: 'Training Logboek', icon: Activity, count: 8 }
    ];
    if (path.includes('stallions')) return [
      { id: 'collections', name: 'Sperma Collecties', icon: Microscope, count: 22 },
      { id: 'shipping', name: 'Verzending & Logistiek', icon: Truck, count: 9 },
      { id: 'fees', name: 'Dekgelden Beheer', icon: DollarSign, count: 4 }
    ];
    return [];
  };

  const subBlocks = getSubBlocks();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Header for this specific Breeding Module */}
      <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
        <div className={`p-4 rounded-2xl ${bgClass}`}>
          <MainIcon className={`w-8 h-8 ${colorClass}`} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{moduleName}</h1>
          <p className="text-slate-500 mt-1">Beheer en analyseer specifieke data voor {moduleName.toLowerCase()}.</p>
        </div>
      </div>

      {/* Sub-Blocks Grid (Only for THIS module) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subBlocks.map(block => {
          const BlockIcon = block.icon;
          const isActive = activeSubModule === block.id;
          return (
            <button 
              key={block.id}
              onClick={() => setActiveSubModule(block.id)}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 ${
                isActive 
                ? 'bg-black text-[#C2A878] border-black shadow-lg scale-105' 
                : 'bg-white text-slate-700 border-slate-200 hover:border-[#C2A878] hover:shadow-md'
              }`}
            >
              <BlockIcon className={`w-8 h-8 mb-4 ${isActive ? 'text-[#C2A878]' : 'text-slate-400'}`} />
              <h3 className="font-bold text-center">{block.name}</h3>
              <span className={`mt-2 text-xs px-3 py-1 rounded-full ${isActive ? 'bg-[#C2A878]/20' : 'bg-slate-100 text-slate-500'}`}>
                {block.count} Items
              </span>
            </button>
          )
        })}
      </div>

      {/* Data Grid Area */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 min-h-[400px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={`Zoek in ${subBlocks.find(b => b.id === activeSubModule)?.name || 'overzicht'}...`}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C2A878] transition-shadow"
            />
          </div>
          <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#111111] hover:bg-slate-800 text-[#C2A878] rounded-xl font-bold text-sm transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Item Toevoegen
          </button>
        </div>

        {/* Dummy list showing dynamic context */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 rounded-2xl border border-slate-100 hover:border-[#C2A878] hover:shadow-md transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {activeSubModule === 'overview' ? 'Selecteer een categorie' : `${subBlocks.find(b => b.id === activeSubModule)?.name} Item #${i}`}
                  </h4>
                  <p className="text-slate-500 text-sm mt-1">Status: Actief en up to date</p>
                </div>
                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${bgClass} ${colorClass}`}>
                  Actief
                </span>
              </div>
              
              <div className="flex gap-4 mt-6">
                <div className="flex-1 bg-slate-50 p-3 rounded-xl flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Datum</p>
                    <p className="text-sm font-bold text-slate-900">Vandaag</p>
                  </div>
                </div>
                <div className="flex-1 bg-slate-50 p-3 rounded-xl flex items-center gap-3">
                  <Activity className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Actie</p>
                    <p className="text-sm font-bold text-slate-900">Vereist aandacht</p>
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
