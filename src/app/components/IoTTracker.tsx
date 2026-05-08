import { useState, useEffect } from 'react';
import { Activity, Wifi } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function IoTTracker() {
  const data = [
    { time: '10:00', activity: 45 },
    { time: '10:15', activity: 72 },
    { time: '10:30', activity: 85 },
    { time: '10:45', activity: 68 },
    { time: '11:00', activity: 91 },
    { time: '11:15', activity: 78 },
    { time: '11:30', activity: 65 },
    { time: '11:45', activity: 82 },
  ];

  const [activeDevices, setActiveDevices] = useState<any[]>([
    { id: 'dev-1', horse: 'Equinox', device: 'Smart Girth', activity: 'Treadmill', duration: '23 min', status: 'active' },
    { id: 'dev-2', horse: 'Eclipse', device: 'IoT Halter', activity: 'Solarium', duration: '15 min', status: 'active' },
    { id: 'dev-3', horse: 'Thunder', device: 'Smart Girth', activity: 'Rest', duration: '45 min', status: 'idle' },
  ]);

  useEffect(() => {
    async function fetchIoT() {
      try {
        const { data, error } = await supabase.from('iot_devices').select('*').limit(4);
        if (!error && data && data.length > 0) {
          setActiveDevices(data);
        }
      } catch (e) {
        console.error('Failed to load IoT devices, using fallback data');
      }
    }
    fetchIoT();
  }, []);

  const maxActivity = Math.max(...data.map(d => d.activity));
  const width = 400;
  const height = 120;
  const padding = { top: 10, right: 10, bottom: 20, left: 30 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - (d.activity / maxActivity) * chartHeight;
    return { x, y, activity: d.activity, time: d.time };
  });

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${pathData} L ${points[points.length - 1].x} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 h-full flex flex-col relative overflow-hidden group shadow-sm">
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full blur-3xl group-hover:bg-teal-100 transition-all"></div>
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 bg-slate-100 rounded-lg border border-slate-200">
          <Activity className="w-5 h-5 text-slate-700" />
        </div>
        <h2 className="text-xl font-serif font-bold text-slate-900 tracking-wide">Live IoT Tracker</h2>
        <div className="ml-auto flex items-center gap-2 bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-sm">
          <Wifi className="w-3 h-3 text-teal-600 animate-pulse" />
          <span className="text-xs text-slate-600 font-medium">{activeDevices.length} Connected</span>
        </div>
      </div>

      <div className="mb-6 bg-slate-50 rounded-lg p-4 border border-slate-200 relative z-10">
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
          <defs>
            <linearGradient id="activityGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0F766E" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#0F766E" stopOpacity={0.01} />
            </linearGradient>
          </defs>

          {[0, 25, 50, 75, 100].map((tick) => (
            <line
              key={`grid-${tick}`}
              x1={padding.left}
              y1={padding.top + chartHeight * (1 - tick / 100)}
              x2={width - padding.right}
              y2={padding.top + chartHeight * (1 - tick / 100)}
              stroke="#E2E8F0"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
          ))}

          <path d={areaPath} fill="url(#activityGrad)" />
          <path d={pathData} stroke="#0F766E" strokeWidth="2" fill="none" />

          {points.map((p, i) => (
            <circle key={`point-${i}`} cx={p.x} cy={p.y} r="3" fill="#0F766E" />
          ))}

          {data.map((d, i) => {
            if (i % 2 === 0) {
              return (
                <text
                  key={`label-${i}`}
                  x={points[i].x}
                  y={height - 5}
                  textAnchor="middle"
                  fill="#64748B"
                  fontSize="10"
                  fontWeight="500"
                >
                  {d.time}
                </text>
              );
            }
            return null;
          })}
        </svg>
      </div>

      <div className="flex-1 space-y-2">
        {activeDevices.map((device) => (
          <div
            key={device.id}
            className="p-3 bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${device.status === 'active' ? 'bg-teal-500' : 'bg-slate-300'}`}></div>
                <span className="text-sm font-medium text-slate-900">{device.horse}</span>
              </div>
              <span className="text-xs font-medium text-slate-500">{device.duration}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">{device.device}</span>
              <span className={`px-2 py-0.5 rounded-full font-medium ${
                device.status === 'active'
                  ? 'bg-teal-50 text-teal-700 border border-teal-100'
                  : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}>
                {device.activity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
