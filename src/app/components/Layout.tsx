import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Sidebar } from "./Sidebar";
import { Menu, Search, Bell } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const currentHour = new Date().getHours();
  const greetingKey = currentHour < 12 ? 'greeting_morning' : currentHour < 18 ? 'greeting_afternoon' : 'greeting_evening';
  const greeting = t(`dashboard.${greetingKey}`);

  // Close sidebar on route change on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-slate-50 font-sans">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <div className={`fixed inset-y-0 left-0 z-50 transform lg:static lg:translate-x-0 transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar (Desktop & Mobile) */}
        <header className="flex items-center justify-between px-4 lg:px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm gap-4">
          
          <div className="flex items-center gap-4 flex-shrink-0">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg flex-shrink-0"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:block">
              <h1 className="text-xl font-bold text-slate-900 leading-tight">{greeting}, Tom</h1>
              <p className="text-xs text-slate-500 font-medium">{t('dashboard.subtitle')}</p>
            </div>
            {/* Mobile Title Replacement */}
            <span className="lg:hidden font-bold text-[#C2A878] tracking-widest uppercase text-sm">Equiviesa Pro</span>
          </div>
          
          {/* Search Bar - Hidden on small mobile screens, visible on md+ */}
          <div className="hidden md:flex relative max-w-md w-full mx-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Zoek paarden, facturen, taken..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C2A878] transition-shadow"
            />
          </div>

          <div className="flex items-center gap-3 md:gap-4 ml-auto flex-shrink-0">
            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200 flex-shrink-0">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="hidden lg:block">
              <LanguageSelector />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
