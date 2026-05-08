import { Link, useLocation } from "react-router";
import { 
  LayoutDashboard, Hexagon, CalendarDays, ListTodo,
  HeartPulse, Apple, Trophy,
  Users, Calculator, Package, MapPin, FolderOpen,
  Dna, Microscope, Baby,
  PieChart, Settings 
} from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";

const sidebarSections = [
  {
    title: "STALBEHEER",
    items: [
      { name: "Dashboard", path: "/", icon: LayoutDashboard },
      { name: "Mijn Paarden", path: "/horses", icon: Hexagon },
      { name: "Agenda & Planning", path: "/agenda", icon: CalendarDays },
      { name: "Takenbord", path: "/tasks", icon: ListTodo },
    ]
  },
  {
    title: "VERZORGING & SPORT",
    items: [
      { name: "Gezondheid & Medisch", path: "/health", icon: HeartPulse },
      { name: "Voedingsschema's", path: "/feeding", icon: Apple },
      { name: "Wedstrijdsport", path: "/competitions", icon: Trophy },
    ]
  },
  {
    title: "ADMINISTRATIE & CRM",
    items: [
      { name: "Relaties & Contacten", path: "/contacts", icon: Users },
      { name: "Facturatie", path: "/invoices", icon: Calculator },
      { name: "Producten Catalogus", path: "/products", icon: Package },
      { name: "Stallen & Locaties", path: "/locations", icon: MapPin },
      { name: "Documenten & Media", path: "/documents", icon: FolderOpen },
    ]
  },
  {
    title: "FOKKERIJ",
    items: [
      { name: "Merrie Lijnen", path: "/mares", icon: Dna },
      { name: "Embryo Tracking", path: "/embryos", icon: Microscope },
      { name: "Veulen Opfok", path: "/foals", icon: Baby },
    ]
  },
  {
    title: "SYSTEEM",
    items: [
      { name: "Rapporten & Analytics", path: "/reports", icon: PieChart },
      { name: "Systeem Instellingen", path: "/settings", icon: Settings },
    ]
  }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-72 bg-[#111111] text-white min-h-screen flex flex-col shadow-2xl">
      <div className="p-6 flex items-center justify-center border-b border-white/10">
        <div className="flex flex-col items-center">
          <img src="/viesa-logo.png" alt="Logo" className="w-20 h-20 object-contain mb-3 drop-shadow-xl" />
          <h1 className="text-sm font-bold tracking-widest text-[#C2A878] uppercase">Equiviesa Pro</h1>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        <div className="space-y-8">
          {sidebarSections.map((section, idx) => (
            <div key={idx}>
              <h2 className="px-6 mb-3 text-xs font-bold text-[#8C7345] tracking-wider uppercase">
                {section.title}
              </h2>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
                  
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-4 px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
                          isActive 
                            ? "bg-white/5 border-r-4 border-[#C2A878] text-[#C2A878]" 
                            : "text-slate-400 hover:text-white hover:bg-white/5 border-r-4 border-transparent"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-[#C2A878]' : 'text-slate-500'}`} />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>
      
      <div className="p-6 border-t border-white/10 flex justify-center bg-[#0a0a0a]">
        <LanguageSelector />
      </div>
    </aside>
  );
}
