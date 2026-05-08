import { useState } from 'react';
import { 
  MapPin, 
  Home, 
  Users, 
  Settings,
  Plus,
  Box as BoxIcon,
  Activity,
  CheckCircle2
} from 'lucide-react';

export function LocationsView() {
  const [activeTab, setActiveTab] = useState<'stables' | 'paddocks'>('stables');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-[#C2A878]" />
            Stallen & Locaties
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Beheer stallen, box-indelingen en weidegang overzichtelijk.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#C2A878] text-white rounded-xl text-sm font-medium hover:bg-[#B0986A] transition-colors">
          <Plus className="w-4 h-4" />
          Nieuwe Locatie
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Location Block */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-slate-600" />
                <h2 className="font-bold text-slate-900">Hoofdstal (Valkenswaard)</h2>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">24/30 BOXEN BEZET</span>
            </div>
            
            <div className="p-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${i < 8 ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-dashed border-slate-300'} flex flex-col items-center justify-center text-center gap-2 transition-transform hover:scale-105 cursor-pointer`}>
                    <BoxIcon className={`w-6 h-6 ${i < 8 ? 'text-[#C2A878]' : 'text-slate-300'}`} />
                    <div>
                      <p className="text-xs font-bold text-slate-400">BOX {i + 1}</p>
                      <p className="text-sm font-medium text-slate-900 truncate w-full px-1">
                        {i === 0 ? 'Luna' : i === 1 ? 'Don Juan' : i < 8 ? 'Paard ' + (i+1) : 'Leeg'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-sm text-white relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#C2A878]/20 rounded-full blur-2xl"></div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#C2A878]" />
              Stalbeheer
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 rounded-xl p-3 text-left flex items-center gap-3">
                <BoxIcon className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-sm font-medium">Box Toewijzen</div>
                  <div className="text-xs text-white/50">Verplaats een paard</div>
                </div>
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 rounded-xl p-3 text-left flex items-center gap-3">
                <Activity className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-sm font-medium">Weidegang Schema</div>
                  <div className="text-xs text-white/50">Beheer paddock tijden</div>
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
