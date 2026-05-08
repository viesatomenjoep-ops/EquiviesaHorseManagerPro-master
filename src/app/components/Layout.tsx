import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";

export function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* You could place DashboardHeader here if you want it globally, but for now we put it inside the layout */}
        {/* We can remove it from App.tsx and put it here if the header is always the same */}
        {/* But based on the screenshot, there is a top bar next to the sidebar. */}
        <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white border-b border-slate-200">
           <div className="flex gap-4">
              <span className="font-semibold text-slate-700">Week</span>
              <span className="font-semibold text-teal-500 border-b-2 border-teal-500">Dag</span>
              <span className="font-semibold text-slate-700">Ruiter Bord</span>
           </div>
           <div className="flex items-center gap-4">
              <span className="text-red-500 text-sm font-medium">Uw proefversie verloopt over 20 dagen!</span>
              <button className="bg-orange-400 hover:bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded">ABONNEER NU</button>
           </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
