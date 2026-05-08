import { useState, useEffect } from 'react';
import { DashboardHeader } from '../components/DashboardHeader';
import { KPICard } from '../components/KPICard';
import { KanbanBoard } from '../components/KanbanBoard';
import { AIFeed } from '../components/AIFeed';
import { IoTTracker } from '../components/IoTTracker';
import { PawPrint, CheckCircle, DollarSign, Image, Home, Activity, Briefcase, Dna, Settings } from 'lucide-react';
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
      <DashboardHeader />
      
      {/* QUICK MODULE ACCESS BLOCKS - Moved to Top */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Snelmenu Modules</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { title: "Stable Management", path: "/horses", icon: Home, color: "from-blue-600 to-blue-400" },
            { title: "Care Support", path: "/agenda", icon: Activity, color: "from-emerald-600 to-emerald-400" },
            { title: "Administration", path: "/administration", icon: Briefcase, color: "from-purple-600 to-purple-400" },
            { title: "Breeding", path: "/breeding/mares", icon: Dna, color: "from-pink-600 to-pink-400" },
            { title: "System", path: "/settings", icon: Settings, color: "from-slate-600 to-slate-400" }
          ].map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <button 
                key={idx}
                onClick={() => window.location.href = mod.path}
                className="relative overflow-hidden bg-black/40 border border-white/10 rounded-2xl p-5 text-left transition-all duration-300 hover:scale-105 hover:bg-black/60 group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${mod.color} opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:opacity-20 transition-opacity`} />
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${mod.color} bg-opacity-20 mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white group-hover:text-[#D4AF37] transition-colors">{mod.title}</h3>
                <p className="text-xs text-white/50 mt-1">Open Module &rarr;</p>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Active Horses"
          value={isLoading ? "..." : totalHorses}
          subtitle="+3 this month"
          icon={PawPrint}
          trend="up"
          showChart={true}
          trendData={trendData}
        />
        <KPICard title="Pending Tasks Today" value="8/12" subtitle="Completed" icon={CheckCircle}>
          <div className="text-sm">67% Completed</div>
        </KPICard>
        <KPICard title="Current MRR" value="€12,450" subtitle="€2,340 pending invoices" icon={DollarSign} trend="up" />
        <KPICard title="New Media Uploads" value={127} subtitle="Synced today" icon={Image} trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <KanbanBoard />
        </div>
        <div className="space-y-6">
          <div className="h-[400px]">
            <AIFeed />
          </div>
          <div className="lg:col-span-1 h-[600px]">
            <IoTTracker />
          </div>
        </div>
      </div>
    </div>
  );
}
