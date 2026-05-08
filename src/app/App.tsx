import { useState, useEffect } from 'react';
import { DashboardHeader } from './components/DashboardHeader';
import { KPICard } from './components/KPICard';
import { KanbanBoard } from './components/KanbanBoard';
import { AIFeed } from './components/AIFeed';
import { IoTTracker } from './components/IoTTracker';
import { PromoGenerator } from './components/PromoGenerator';
import { PawPrint, CheckCircle, DollarSign, Image } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function App() {
  const [totalHorses, setTotalHorses] = useState<number>(42);
  const [isLoading, setIsLoading] = useState(true);
  const trendData = [45, 52, 48, 61, 58, 67, 72];

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Example: Fetch total active horses from your Supabase 'horses' table
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <DashboardHeader />

      <main className="p-6 space-y-6">
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

          <KPICard
            title="Pending Tasks Today"
            value="8/12"
            subtitle="Completed"
            icon={CheckCircle}
          >
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-semibold text-slate-900">8</span>
                  <span className="text-lg text-slate-500">/12</span>
                </div>
                <p className="text-sm text-slate-500">Completed</p>
              </div>
              <div className="relative w-20 h-20">
                <svg className="transform -rotate-90 w-20 h-20">
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    stroke="#E2E8F0"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    stroke="#0F766E"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(8 / 12) * 188.4} 188.4`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-medium text-[#0F766E]">67%</span>
                </div>
              </div>
            </div>
          </KPICard>

          <KPICard
            title="Current MRR"
            value="€12,450"
            subtitle="€2,340 pending invoices"
            icon={DollarSign}
            trend="up"
          />

          <KPICard
            title="New Media Uploads"
            value={127}
            subtitle="Synced today"
            icon={Image}
            trend="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PromoGenerator />
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
      </main>
    </div>
  );
}
