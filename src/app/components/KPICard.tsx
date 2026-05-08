import { LucideIcon } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down';
  trendData?: number[];
  showChart?: boolean;
  children?: React.ReactNode;
}

export function KPICard({ title, value, subtitle, icon: Icon, trend, trendData, showChart, children }: KPICardProps) {
  const chartData = trendData?.map((value, index) => ({ id: index, value })) || [];

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm transition-all duration-300 magnetic-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Icon className="w-5 h-5 text-slate-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
          </div>
        </div>
        {trend && (
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
            {trend === 'up' ? '↑' : '↓'}
          </span>
        )}
      </div>

      {children ? (
        children
      ) : (
        <>
          <div className="mb-2">
            <h3 className="text-3xl font-serif font-bold text-slate-900">{value}</h3>
            {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
          </div>

          {showChart && trendData && chartData.length > 0 && (
            <div className="h-12 -mx-2" style={{ minHeight: '48px' }}>
              <ResponsiveContainer width="100%" height={48}>
                <LineChart data={chartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#C2A878"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
}
