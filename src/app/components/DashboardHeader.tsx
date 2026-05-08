import { Search, Bell, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const languages = [
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export function DashboardHeader() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Goedemorgen' : currentHour < 18 ? 'Goedemiddag' : 'Goedenavond';
  
  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  useEffect(() => {
    const handleScroll = () => {
      setRotation(window.scrollY * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white rounded-2xl border border-slate-200 gap-6 shadow-sm mb-6 z-10">
      {/* Dismiss Button for Mobile */}
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 rounded-full lg:hidden"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
        <div 
          className="w-12 h-12 flex-shrink-0 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center overflow-hidden transition-transform duration-75 ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <img 
            src="/viesa-logo.png" 
            alt="Equivest Logo" 
            className="w-full h-full object-contain p-1"
          />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">{greeting}, Thomas</h1>
          <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">Waar kan ik je vandaag mee helpen?</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Zoek paarden, facturen, taken..."
            className="w-full md:w-96 pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm md:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C2A878] transition-shadow"
          />
        </div>

        <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200">
          <Bell className="w-5 h-5 md:w-6 md:h-6 text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </div>
    </div>
  );
}
