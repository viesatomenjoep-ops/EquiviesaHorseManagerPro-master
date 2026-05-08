import { useState, useEffect } from 'react';
import { KPICard } from '../components/KPICard';
import { KanbanBoard } from '../components/KanbanBoard';
import { AIFeed } from '../components/AIFeed';
import { IoTTracker } from '../components/IoTTracker';
import { 
  PawPrint, CheckCircle, DollarSign, Image, Home, Activity, Briefcase, 
  Dna, Settings, CloudRain, Thermometer, Wind, AlertCircle, HeartPulse, 
  Trophy, Calendar, CreditCard, ChevronRight
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function Dashboard() {
  const [totalHorses, setTotalHorses] = useState<number>(42);
  const [isLoading, setIsLoading] = useState(true);
  const trendData = [45, 52, 48, 61, 58, 67, 72];

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const { count, error } = await supabase
          .from('horses')
          .select('*', { count: 'exact', head: true });
        
        if (!error && count !== null) {
          setTotalHorses(count);
        }
      } catch (err) {
        console.error('Error fetching from Supabase:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* ROW 1: QUICK MODULE ACCESS BLOCKS */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Snelmenu Modules</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { title: "Stalbeheer", path: "/horses", icon: Home, color: "from-blue-600 to-blue-400" },
            { title: "Verzorging", path: "/health", icon: HeartPulse, color: "from-rose-600 to-rose-400" },
            { title: "Administratie", path: "/contacts", icon: Briefcase, color: "from-purple-600 to-purple-400" },
            { title: "Fokkerij", path: "/breeding/mares", icon: Dna, color: "from-pink-600 to-pink-400" },
            { title: "Analytics", path: "/reports", icon: Activity, color: "from-emerald-600 to-emerald-400" }
          ].map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <button 
                key={idx}
                onClick={() => window.location.href = mod.path}
                className="relative overflow-hidden bg-[#111111] border border-slate-800 rounded-2xl p-5 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${mod.color} opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:opacity-20 transition-opacity`} />
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${mod.color} bg-opacity-20 mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white group-hover:text-[#C2A878] transition-colors">{mod.title}</h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">Open Module <ChevronRight className="w-3 h-3" /></p>
              </button>
            )
          })}
        </div>
      </div>

      {/* ROW 2: KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Actieve Paarden" value={isLoading ? "..." : totalHorses} subtitle="+3 deze maand" icon={PawPrint} trend="up" showChart={true} trendData={trendData} />
        <KPICard title="Openstaande Taken" value="8/12" subtitle="67% Voltooid" icon={CheckCircle}>
          <div className="text-sm">Vandaag</div>
        </KPICard>
        <KPICard title="Totale Omzet (Mnd)" value="€12.450" subtitle="€2.340 nog te innen" icon={DollarSign} trend="up" />
        <KPICard title="Media & Documenten" value={127} subtitle="Nieuwe bestanden" icon={Image} trend="up" />
      </div>

      {/* ROW 3: NEW BLOCKS (WEATHER, ALERTS, FINANCIALS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weer & Stal Klimaat */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <h3 className="font-bold flex items-center gap-2 mb-6">
            <CloudRain className="w-5 h-5 text-blue-300" /> Klimaat & Weer
          </h3>
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-5xl font-black mb-1">14°C</p>
              <p className="text-blue-200 text-sm">Licht bewolkt, 15% neerslag</p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                <Thermometer className="w-4 h-4 text-rose-300" />
                <span className="text-sm">Stal: 18°C</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                <Wind className="w-4 h-4 text-emerald-300" />
                <span className="text-sm">Vocht: 45%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Urgente Gezondheids Alerts */}
        <div className="bg-white rounded-2xl border border-rose-100 p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-rose-500"></div>
          <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-rose-500" /> Gezondheid Alerts
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5"></div>
              <div>
                <p className="text-sm font-bold text-slate-800">Vaccinatie Verlopen: Bella</p>
                <p className="text-xs text-slate-500">Influenza (2 dagen over tijd)</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5"></div>
              <div>
                <p className="text-sm font-bold text-slate-800">Hoefsmid Gepland: Don Juan</p>
                <p className="text-xs text-slate-500">Morgen om 10:00 (Nieuw beslag)</p>
              </div>
            </li>
          </ul>
          <button className="w-full mt-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-sm font-semibold hover:bg-rose-100 transition-colors">
            Bekijk Medisch Dossier
          </button>
        </div>

        {/* Komende Wedstrijden */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#C2A878]" /> Komende Wedstrijden
            </h3>
            <button className="text-slate-400 hover:text-[#C2A878]"><Calendar className="w-4 h-4" /></button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="bg-white p-2 rounded-lg border border-slate-200 text-center min-w-[50px]">
                <p className="text-xs font-bold text-rose-500">APR</p>
                <p className="text-lg font-black text-slate-900 -mt-1">12</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">CSI3* Eindhoven</p>
                <p className="text-xs text-slate-500">Luna & Maestro (1.40m)</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="bg-white p-2 rounded-lg border border-slate-200 text-center min-w-[50px]">
                <p className="text-xs font-bold text-emerald-500">MAY</p>
                <p className="text-lg font-black text-slate-900 -mt-1">05</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">NK Dressuur Ermelo</p>
                <p className="text-xs text-slate-500">Don Juan (Grand Prix)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 4: RECENT INVOICES, KANBAN, IOT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Recente Facturen */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm col-span-1">
          <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-emerald-500" /> Recente Betalingen
          </h3>
          <div className="space-y-4">
            {[
              { client: "Stal Jansen", amount: "+ €1.250", status: "Betaald", color: "text-emerald-500", bg: "bg-emerald-50" },
              { client: "Hoefsmid De Vries", amount: "- €450", status: "Afgeschreven", color: "text-rose-500", bg: "bg-rose-50" },
              { client: "Equivest B.V.", amount: "+ €3.400", status: "In Verwerking", color: "text-amber-500", bg: "bg-amber-50" },
            ].map((inv, i) => (
              <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-bold text-slate-800">{inv.client}</p>
                  <p className="text-xs text-slate-500">{inv.status}</p>
                </div>
                <div className={`px-2 py-1 rounded-md ${inv.bg}`}>
                  <p className={`text-xs font-bold ${inv.color}`}>{inv.amount}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-xs font-bold text-slate-400 hover:text-[#C2A878] transition-colors">
            Alle facturen bekijken &rarr;
          </button>
        </div>

        {/* Existing AI & IoT Blocks */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="h-[400px]">
            <KanbanBoard />
          </div>
        </div>

        <div className="col-span-1 space-y-6">
          <div className="h-[400px]">
             <IoTTracker />
          </div>
        </div>
        
      </div>
    </div>
  );
}
