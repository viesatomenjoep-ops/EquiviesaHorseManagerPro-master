import { useState } from 'react';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Activity, 
  HeartPulse,
  Wheat,
  Trophy,
  Download,
  Filter,
  Calendar
} from 'lucide-react';

export function ReportsView() {
  const [dateRange, setDateRange] = useState('YTD');

  // 10 Analytics Functions / Blocks
  const kpis = [
    { id: 1, title: 'Totale Omzet (YTD)', value: '€ 142.500', trend: '+14%', icon: DollarSign, color: 'text-emerald-500' },
    { id: 2, title: 'Winstmarge', value: '28.4%', trend: '+2.1%', icon: LineChart, color: 'text-blue-500' },
    { id: 3, title: 'Voerkosten per Paard', value: '€ 285 / mnd', trend: '-5%', icon: Wheat, color: 'text-amber-500' },
    { id: 4, title: 'Gem. Ziekteverzuim (Paarden)', value: '1.2 dagen', trend: 'Stabiel', icon: HeartPulse, color: 'text-rose-500' },
    { id: 5, title: 'FEI Punten Totaal', value: '3,450', trend: '+450', icon: Trophy, color: 'text-yellow-500' },
    { id: 6, title: 'Bezettingsgraad Stallen', value: '92%', trend: '+4%', icon: Users, color: 'text-indigo-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#C2A878]" />
            Rapporten & Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Financiële, medische en sportieve data-analyse op één plek.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C2A878]"
          >
            <option value="Q1">Q1 2026</option>
            <option value="Q2">Q2 2026</option>
            <option value="YTD">Year to Date</option>
            <option value="ALL">All Time</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors">
            <Download className="w-4 h-4" />
            PDF Export
          </button>
        </div>
      </div>

      {/* KPI Grid (Top 6 functions) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-[#C2A878] transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-slate-50 ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-bold ${kpi.trend.startsWith('+') ? 'text-emerald-500' : kpi.trend.startsWith('-') ? 'text-rose-500' : 'text-slate-400'}`}>
                {kpi.trend}
              </span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">{kpi.value}</h3>
            <p className="text-xs font-medium text-slate-500 mt-1">{kpi.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Function 7: Revenue vs Expenses Chart (Simulated) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900">Omzet vs Kosten Ontwikkeling</h3>
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="h-64 flex items-end gap-2 justify-between px-2">
            {[40, 60, 45, 80, 65, 90, 75, 100].map((h, i) => (
              <div key={i} className="w-full flex justify-center gap-1 group relative">
                {/* Simulated Chart Tooltip */}
                <div className="absolute -top-10 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  Mnd {i+1}: €{h}k
                </div>
                {/* Cost Bar */}
                <div className="w-1/2 bg-rose-200 rounded-t-sm" style={{ height: `${h * 0.6}%` }}></div>
                {/* Revenue Bar */}
                <div className="w-1/2 bg-[#C2A878] rounded-t-sm" style={{ height: `${h}%` }}></div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#C2A878]"></div>
              <span className="text-xs text-slate-500 font-medium">Omzet</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-200"></div>
              <span className="text-xs text-slate-500 font-medium">Kosten</span>
            </div>
          </div>
        </div>

        {/* Function 8: Kostencategorisatie */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-900 mb-6">Uitgaven per Categorie</h3>
          <div className="space-y-4">
            {[
              { label: 'Trainingskosten', value: 35, color: 'bg-indigo-500' },
              { label: 'Voer & Supplementen', value: 25, color: 'bg-amber-500' },
              { label: 'Dierenarts & Medisch', value: 20, color: 'bg-rose-500' },
              { label: 'Huisvesting & Stallen', value: 15, color: 'bg-emerald-500' },
              { label: 'Overig', value: 5, color: 'bg-slate-300' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span className="text-slate-700">{item.label}</span>
                  <span className="text-slate-900">{item.value}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Function 9: Fokkerij Succes Ratio */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-slate-800 shadow-sm p-6 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-48 h-48 bg-[#C2A878]/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#C2A878]" />
            Fokkerij Rendement
          </h3>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-white/50 mb-1">Drachtigheidspercentage</p>
              <p className="text-2xl font-bold text-[#C2A878]">84%</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-white/50 mb-1">Gem. Cyclus tot Dracht</p>
              <p className="text-2xl font-bold text-[#C2A878]">1.4</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-white/50 mb-1">Veulens Levend Geboren</p>
              <p className="text-2xl font-bold text-[#C2A878]">12</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-white/50 mb-1">ROI per Embryo (Est.)</p>
              <p className="text-2xl font-bold text-emerald-400">+ 315%</p>
            </div>
          </div>
        </div>

        {/* Function 10: Top Performing Horses Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden">
          <h3 className="font-bold text-slate-900 mb-6">Meest Rendabele Paarden</h3>
          <div className="-mx-6 px-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
                  <th className="pb-3 font-medium">Paard</th>
                  <th className="pb-3 font-medium">Omzet / Prijzengeld</th>
                  <th className="pb-3 font-medium">Kosten</th>
                  <th className="pb-3 font-medium">Netto Rendement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: 'Don Juan', revenue: '€ 120.000', cost: '€ 15.000', roi: '€ 105.000' },
                  { name: 'Luna', revenue: '€ 45.000', cost: '€ 12.000', roi: '€ 33.000' },
                  { name: 'Bella (Fokmerrie)', revenue: '€ 30.000', cost: '€ 8.000', roi: '€ 22.000' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 font-bold text-slate-900">{row.name}</td>
                    <td className="py-3 text-emerald-600 font-medium">{row.revenue}</td>
                    <td className="py-3 text-rose-500 font-medium">{row.cost}</td>
                    <td className="py-3 text-[#C2A878] font-bold">{row.roi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
