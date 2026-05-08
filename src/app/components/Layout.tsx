import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";

export function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
