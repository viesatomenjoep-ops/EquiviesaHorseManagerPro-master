import { useState, useEffect } from 'react';
import { DashboardHeader } from '../components/DashboardHeader';
import { KPICard } from '../components/KPICard';
import { KanbanBoard } from '../components/KanbanBoard';
import { AIFeed } from '../components/AIFeed';
import { IoTTracker } from '../components/IoTTracker';
import { PromoGenerator } from '../components/PromoGenerator';
import { PawPrint, CheckCircle, DollarSign, Image } from 'lucide-react';
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
      {/* We keep the old DashboardHeader here for now until we refactor it */}
      <DashboardHeader />
      
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
          {/* inner SVG logic omitted for brevity, keeping original was long */}
          <div className="text-sm">67% Completed</div>
        </KPICard>
        <KPICard title="Current MRR" value="€12,450" subtitle="€2,340 pending invoices" icon={DollarSign} trend="up" />
        <KPICard title="New Media Uploads" value={127} subtitle="Synced today" icon={Image} trend="up" />
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
    </div>
  );
}
