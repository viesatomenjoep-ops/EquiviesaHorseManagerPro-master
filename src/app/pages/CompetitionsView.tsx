import { useState } from 'react';
import { 
  Trophy, 
  Calendar, 
  Video, 
  Star,
  Award,
  TrendingUp,
  MapPin,
  PlayCircle,
  Plus
} from 'lucide-react';

export function CompetitionsView() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'ranking' | 'video'>('calendar');

  const stats = [
    { label: 'Gewonnen Prijzengeld', value: '€ 45.200', icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'FEI Punten (YTD)', value: '1.240', icon: Star, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Aankomende Concours', value: '3', icon: Calendar, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Clear Rounds', value: '68%', icon: Award, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[#C2A878]" />
            Wedstrijdsport & Prestaties
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Beheer concoursplanning, FEI-punten, en bekijk rit-video's.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#C2A878] text-white rounded-xl text-sm font-medium hover:bg-[#B0986A] transition-colors">
          <Plus className="w-4 h-4" />
          Nieuwe Inschrijving
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Calendar List */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <h2 className="font-bold text-slate-900">Wedstrijdkalender (CSI & Nationaal)</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { name: 'CSI3* Valkenswaard', date: '12 - 15 Aug', location: 'Tops International Arena', horses: ['Luna', 'Don Juan'], status: 'entered' },
                { name: 'CSI5* CHIO Aachen', date: '28 Jun - 02 Jul', location: 'Aachen, GER', horses: ['Zangersheide Z'], status: 'completed' },
                { name: 'Subtop Dressuur', date: '10 Sep', location: 'Ermelo, NED', horses: ['Bella'], status: 'planned' }
              ].map((comp, idx) => (
                <div key={idx} className="p-5 hover:bg-slate-50 transition-colors flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-[#C2A878]">
                      <span className="text-xs font-bold uppercase">{comp.date.split(' ')[2] || comp.date.split(' ')[1]}</span>
                      <span className="text-lg font-black leading-none">{comp.date.split(' ')[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{comp.name}</h3>
                      <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" /> {comp.location}
                      </p>
                      <div className="flex gap-2 mt-2">
                        {comp.horses.map((horse, hIdx) => (
                          <span key={hIdx} className="px-2 py-0.5 bg-[#C2A878]/10 text-[#C2A878] rounded-md text-xs font-medium">
                            {horse}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      comp.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                      comp.status === 'entered' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {comp.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          
          {/* Video Archive Block */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden text-white">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
              <h2 className="font-bold flex items-center gap-2">
                <Video className="w-5 h-5 text-red-500" />
                ClipMyHorse Integratie
              </h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="relative rounded-xl overflow-hidden group cursor-pointer aspect-video bg-slate-800">
                <img src="https://images.unsplash.com/photo-1598974357801-cbca100e65d3?w=800&auto=format&fit=crop" alt="Jumping" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white/80 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute bottom-3 left-3">
                  <p className="font-bold text-sm">Luna - 1.45m Grand Prix</p>
                  <p className="text-xs text-white/70">CSI3* Valkenswaard</p>
                </div>
              </div>
              <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors">
                Bekijk alle ritten &rarr;
              </button>
            </div>
          </div>

          {/* FEI Ranking Tracker */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Top Paarden (Ranking)
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Don Juan', points: 450, rank: 124 },
                { name: 'Luna', points: 380, rank: 215 },
                { name: 'Zangersheide Z', points: 210, rank: 540 }
              ].map((horse, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-bold text-sm">#{horse.rank}</span>
                    <span className="font-medium text-slate-900">{horse.name}</span>
                  </div>
                  <span className="text-[#C2A878] font-bold text-sm">{horse.points} pts</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
