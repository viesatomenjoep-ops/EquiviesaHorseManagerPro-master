import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { KPICard } from '../components/KPICard';
import { KanbanBoard } from '../components/KanbanBoard';
import { AIFeed } from '../components/AIFeed';
import { IoTTracker } from '../components/IoTTracker';
import { StaffWidget } from '../components/StaffWidget';
import { 
  PawPrint, CheckCircle, DollarSign, Image, Home, Activity, Briefcase, 
  Dna, Settings, CloudRain, Thermometer, Wind, AlertCircle, HeartPulse, 
  Trophy, Calendar, CreditCard, ChevronRight
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useTranslation } from 'react-i18next';

interface RecentInvoice {
  client: string;
  amount: string;
  status: string;
  color: string;
  bg: string;
}

export function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [totalHorses, setTotalHorses] = useState<number>(42);
  const [openTasks, setOpenTasks] = useState<string>("8/12");
  const [totalRevenue, setTotalRevenue] = useState<string>("€12.450");
  const [recentInvoices, setRecentInvoices] = useState<RecentInvoice[]>([
    { client: "Stal Jansen", amount: "+ €1.250", status: t('dashboard.invoices.status_paid'), color: "text-emerald-500", bg: "bg-emerald-50" },
    { client: "Hoefsmid De Vries", amount: "- €450", status: t('dashboard.invoices.status_debited'), color: "text-rose-500", bg: "bg-rose-50" },
    { client: "Stal Van Dijk", amount: "+ €3.400", status: t('dashboard.invoices.status_processing'), color: "text-amber-500", bg: "bg-amber-50" },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const trendData = [45, 52, 48, 61, 58, 67, 72];

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch horses count
        const { count: hCount, error: hError } = await supabase
          .from('horses')
          .select('*', { count: 'exact', head: true });
        if (!hError && hCount !== null) setTotalHorses(hCount);

        // Fetch tasks stats
        const { data: tData } = await supabase.from('tasks').select('status');
        if (tData) {
          const open = tData.filter(t => t.status !== 'done').length;
          const total = tData.length;
          setOpenTasks(`${open}/${total}`);
        }

        // Fetch invoices
        const { data: iData } = await supabase.from('invoices').select('total_amount, status').order('created_at', { ascending: false });
        if (iData) {
          const revenue = iData.reduce((acc, inv) => acc + Number(inv.total_amount || 0), 0);
          setTotalRevenue(`€${revenue.toLocaleString('nl-NL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`);

          const mappedInvoices = iData.slice(0, 3).map(inv => {
            let color = "text-amber-500";
            let bg = "bg-amber-50";
            let statusText = t('dashboard.invoices.status_processing');
            
            if (inv.status === 'paid') {
              color = "text-emerald-500";
              bg = "bg-emerald-50";
              statusText = t('dashboard.invoices.status_paid');
            } else if (inv.status === 'overdue') {
              color = "text-rose-500";
              bg = "bg-rose-50";
              statusText = t('invoices.table.status_overdue');
            }

            return {
              client: 'Stal Van Dijk', // Mock CRM relation
              amount: `€${Number(inv.total_amount).toLocaleString('nl-NL')}`,
              status: statusText,
              color,
              bg
            };
          });

          if (mappedInvoices.length > 0) {
            setRecentInvoices(mappedInvoices);
          }
        }

      } catch (err) {
        console.error('Error fetching from Supabase:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, [t]);

  return (
    <div className="space-y-6">
      
      {/* ROW 1: QUICK MODULE ACCESS BLOCKS */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">{t('dashboard.quick_menu_title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { title: t('dashboard.quick_menu.stable'), path: "/horses", icon: Home, color: "from-blue-600 to-blue-400" },
            { title: t('dashboard.quick_menu.care'), path: "/health", icon: HeartPulse, color: "from-rose-600 to-rose-400" },
            { title: t('dashboard.quick_menu.admin'), path: "/contacts", icon: Briefcase, color: "from-purple-600 to-purple-400" },
            { title: t('dashboard.quick_menu.breeding'), path: "/breeding/mares", icon: Dna, color: "from-pink-600 to-pink-400" },
            { title: t('dashboard.quick_menu.analytics'), path: "/reports", icon: Activity, color: "from-emerald-600 to-emerald-400" }
          ].map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <button 
                key={idx}
                onClick={() => navigate(mod.path)}
                className="relative overflow-hidden bg-[#111111] border border-slate-800 rounded-2xl p-5 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${mod.color} opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:opacity-20 transition-opacity`} />
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${mod.color} bg-opacity-20 mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white group-hover:text-[#C2A878] transition-colors">{mod.title}</h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">{t('dashboard.quick_menu.open')} <ChevronRight className="w-3 h-3" /></p>
              </button>
            )
          })}
        </div>
      </div>

      {/* ROW 2: KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title={t('dashboard.kpi.active_horses')} value={isLoading ? "..." : totalHorses} subtitle={t('dashboard.kpi.active_horses_sub')} icon={PawPrint} trend="up" showChart={true} trendData={trendData} />
        <KPICard title={t('dashboard.kpi.open_tasks')} value={isLoading ? "..." : openTasks} subtitle={t('dashboard.kpi.open_tasks_sub')} icon={CheckCircle}>
          <div className="text-sm">{t('dashboard.kpi.open_tasks_today')}</div>
        </KPICard>
        <KPICard title={t('dashboard.kpi.total_revenue')} value={isLoading ? "..." : totalRevenue} subtitle={t('dashboard.kpi.total_revenue_sub')} icon={DollarSign} trend="up" />
        <KPICard title={t('dashboard.kpi.media')} value={127} subtitle={t('dashboard.kpi.media_sub')} icon={Image} trend="up" />
      </div>

      {/* ROW 3: NEW BLOCKS (WEATHER, ALERTS, FINANCIALS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weer & Stal Klimaat */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-sm magnetic-card">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <h3 className="font-bold flex items-center gap-2 mb-6">
            <CloudRain className="w-5 h-5 text-blue-300" /> {t('dashboard.weather.title')}
          </h3>
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-5xl font-black mb-1">14°C</p>
              <p className="text-blue-200 text-sm">{t('dashboard.weather.desc')}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                <Thermometer className="w-4 h-4 text-rose-300" />
                <span className="text-sm">{t('dashboard.weather.stable')}: 18°C</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                <Wind className="w-4 h-4 text-emerald-300" />
                <span className="text-sm">{t('dashboard.weather.humidity')}: 45%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Urgente Gezondheids Alerts */}
        <div className="bg-white rounded-2xl border border-rose-100 p-6 shadow-sm relative overflow-hidden magnetic-card">
          <div className="absolute top-0 right-0 w-2 h-full bg-rose-500"></div>
          <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-rose-500" /> {t('dashboard.alerts.title')}
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5"></div>
              <div>
                <p className="text-sm font-bold text-slate-800">{t('dashboard.alerts.vaccine')}</p>
                <p className="text-xs text-slate-500">{t('dashboard.alerts.vaccine_desc')}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5"></div>
              <div>
                <p className="text-sm font-bold text-slate-800">{t('dashboard.alerts.farrier')}</p>
                <p className="text-xs text-slate-500">{t('dashboard.alerts.farrier_desc')}</p>
              </div>
            </li>
          </ul>
          <button className="w-full mt-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-sm font-semibold hover:bg-rose-100 transition-colors">
            {t('dashboard.alerts.btn')}
          </button>
        </div>

        {/* Komende Wedstrijden */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm magnetic-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#C2A878]" /> {t('dashboard.competitions.title')}
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
                <p className="text-sm font-bold text-slate-900">{t('dashboard.competitions.comp1')}</p>
                <p className="text-xs text-slate-500">{t('dashboard.competitions.comp1_desc')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="bg-white p-2 rounded-lg border border-slate-200 text-center min-w-[50px]">
                <p className="text-xs font-bold text-emerald-500">MAY</p>
                <p className="text-lg font-black text-slate-900 -mt-1">05</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{t('dashboard.competitions.comp2')}</p>
                <p className="text-xs text-slate-500">{t('dashboard.competitions.comp2_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 4: STABLE WORKFLOW (FULL WIDTH) */}
      <div className="w-full">
        <div className="min-h-[400px]">
          <KanbanBoard />
        </div>
      </div>

      {/* ROW 5: STAFF, INVOICES & IOT TRACKER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Personeel Management */}
        <div className="lg:col-span-1">
          <StaffWidget />
        </div>
        
        {/* Recente Facturen */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm magnetic-card">
          <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-emerald-500" /> {t('dashboard.invoices.title')}
          </h3>
          <div className="space-y-4">
            {recentInvoices.map((inv, i) => (
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
          <button onClick={() => navigate('/finance/invoices')} className="w-full mt-4 text-xs font-bold text-slate-400 hover:text-[#C2A878] transition-colors">
            {t('dashboard.invoices.btn_all')} &rarr;
          </button>
        </div>

        {/* IoT Tracker */}
        <div className="h-[400px] md:h-auto">
           <IoTTracker />
        </div>
        
      </div>
    </div>
  );
}
