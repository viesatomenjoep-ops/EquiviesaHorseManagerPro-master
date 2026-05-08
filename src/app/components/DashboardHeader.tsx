import { Search, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';

export function DashboardHeader() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setRotation(window.scrollY * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 bg-white/95 backdrop-blur-sm border-b border-slate-200 gap-4 md:gap-0 shadow-sm">
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
          <h1 className="text-xl md:text-2xl font-serif font-bold text-slate-900">{greeting}, Thomas</h1>
          <p className="text-xs md:text-sm text-slate-500 font-medium tracking-wide">Equiviesa Stable Manager Pro</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search horses, invoices, tasks..."
            className="w-full md:w-96 pl-9 md:pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm md:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-shadow"
          />
        </div>

        <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200">
          <Bell className="w-5 h-5 md:w-6 md:h-6 text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </div>
    </header>
  );
}
