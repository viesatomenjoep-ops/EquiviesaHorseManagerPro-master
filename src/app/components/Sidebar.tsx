import { Link, useLocation } from "react-router";
import { 
  Home, 
  Users, 
  BookOpen, 
  ClipboardList, 
  Image, 
  Trophy, 
  Calculator, 
  Package, 
  Heart, 
  LineChart, 
  Settings 
} from "lucide-react";

const navItems = [
  { name: "DASHBOARD", path: "/", icon: Home },
  { name: "PROFIELEN", path: "/profiles", icon: Users },
  { name: "DAGBOEK", path: "/diary", icon: BookOpen },
  { name: "TAKEN", path: "/tasks", icon: ClipboardList },
  { name: "MEDIA", path: "/media", icon: Image },
  { name: "WEDSTRIJD", path: "/competitions", icon: Trophy },
  { name: "FACTURATIE", path: "/invoices", icon: Calculator },
  { name: "PRODUCTEN", path: "/products", icon: Package },
  { name: "FOKKERIJ", path: "/breeding", icon: Heart },
  { name: "RAPPORTEN", path: "/reports", icon: LineChart },
  { name: "INSTELLINGEN", path: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      <div className="p-4 flex items-center justify-center border-b border-slate-800">
        <div className="flex flex-col items-center">
          <img src="/viesa-logo.png" alt="Logo" className="w-16 h-16 object-contain mb-2" />
          <h1 className="text-sm font-bold tracking-wider text-teal-400">EQUIVIESA</h1>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-teal-500 text-white" 
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
