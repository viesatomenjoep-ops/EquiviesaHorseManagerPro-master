import { useState } from "react";
import { Link, useLocation } from "react-router";
import { 
  LayoutDashboard, Hexagon, CalendarDays, ListTodo,
  HeartPulse, Apple, Trophy,
  Users, Calculator, Package, MapPin, FolderOpen,
  Dna, Microscope, Baby,
  PieChart, Settings, X, ChevronDown, ChevronRight, Globe
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const location = useLocation();
  const { t } = useTranslation();
  
  // Dynamic sidebar sections based on translations
  const sidebarSections = [
    {
      title: t('nav.categories.stable_management'),
      items: [
        { name: t('nav.dashboard'), path: "/", icon: LayoutDashboard },
        { name: t('nav.horses'), path: "/horses", icon: Hexagon },
        { name: t('nav.agenda'), path: "/agenda", icon: CalendarDays },
        { name: t('nav.tasks'), path: "/tasks", icon: ListTodo },
      ]
    },
    {
      title: t('nav.categories.care_support'),
      items: [
        { name: t('nav.health'), path: "/health", icon: HeartPulse },
        { name: t('nav.feeding'), path: "/feeding", icon: Apple },
        { name: t('nav.competitions'), path: "/competitions", icon: Trophy },
      ]
    },
    {
      title: t('nav.categories.administration'),
      items: [
        { name: t('nav.contacts'), path: "/contacts", icon: Users },
        { name: t('nav.invoices'), path: "/invoices", icon: Calculator },
        { name: t('nav.products'), path: "/products", icon: Package },
        { name: t('nav.locations'), path: "/locations", icon: MapPin },
        { name: t('nav.documents'), path: "/documents", icon: FolderOpen },
      ]
    },
    {
      title: t('nav.categories.breeding'),
      items: [
        { name: t('nav.breeding_items.mares'), path: "/breeding/mares", icon: Dna },
        { name: t('nav.breeding_items.embryos'), path: "/breeding/embryos", icon: Microscope },
        { name: t('nav.breeding_items.foals'), path: "/breeding/foals", icon: Baby },
        { name: t('nav.breeding_items.stallions'), path: "/breeding/stallions", icon: Trophy },
      ]
    },
    {
      title: t('nav.categories.system'),
      items: [
        { name: t('nav.reports'), path: "/reports", icon: PieChart },
        { name: t('nav.settings'), path: "/settings", icon: Settings },
      ]
    }
  ];

  // All sections expanded by default as requested
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "STABLE MANAGEMENT": true,
    "CARE SUPPORT": true,
    "ADMINISTRATION & CRM": true,
    "BREEDING": true,
    "SYSTEM": true
  });

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className="w-full md:w-72 bg-[#111111] text-white h-full flex flex-col shadow-2xl relative">
      {/* Mobile close button */}
      {onClose && (
        <button 
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-white/5 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="p-6 flex items-center justify-center border-b border-white/10">
        <div className="flex flex-col items-center">
          <img src="/viesa-logo.png" alt="Logo" className="w-20 h-20 object-contain mb-3 drop-shadow-xl" />
          <h1 className="text-sm font-bold tracking-widest text-[#C2A878] uppercase">Equiviesa Pro</h1>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        <div className="space-y-2">
          {sidebarSections.map((section, idx) => {
            const isOpen = openSections[section.title];
            
            return (
              <div key={idx} className="mb-2">
                <button 
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-6 py-2 group"
                >
                  <h2 className="text-sm font-bold text-[#8C7345] tracking-wide uppercase group-hover:text-[#C2A878] transition-colors">
                    {section.title}
                  </h2>
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-[#8C7345] group-hover:text-[#C2A878]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#8C7345] group-hover:text-[#C2A878]" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="mt-1">
                    <ul className="space-y-1">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
                        
                        return (
                          <li key={item.path}>
                            <Link
                              to={item.path}
                              onClick={onClose} // Auto close sidebar on mobile when an item is clicked
                              className={`flex items-center gap-4 px-6 py-3 md:py-2.5 text-base md:text-sm font-medium transition-all duration-200 ${
                                isActive 
                                  ? "bg-white/5 border-r-4 border-[#C2A878] text-[#C2A878]" 
                                  : "text-slate-400 hover:text-white hover:bg-white/5 border-r-4 border-transparent"
                              }`}
                            >
                              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#C2A878]' : 'text-slate-500'}`} />
                              <span className="truncate">{item.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
      
      {/* Footer area inside sidebar (Mobile Language Selector + extra info) */}
      <div className="p-6 border-t border-white/10 mt-auto">
        <div className="lg:hidden flex items-center justify-between">
          <span className="text-sm font-bold text-slate-400">{t('nav.language')}</span>
          <LanguageSelector />
        </div>
      </div>
    </aside>
  );
}
