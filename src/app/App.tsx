import { Routes, Route } from "react-router";
import { useTranslation } from "react-i18next";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { InvoicesView } from "./pages/InvoicesView";
import { ProductsView } from "./pages/ProductsView";
import { AgendaView } from "./pages/AgendaView";
import { AdministrationView } from "./pages/AdministrationView";
import { BreedingView } from "./pages/BreedingView";
import { HorseListView } from "./pages/HorseListView";
import { HealthView } from "./pages/HealthView";
import { FeedingView } from "./pages/FeedingView";
import { CompetitionsView } from "./pages/CompetitionsView";
import { LocationsView } from "./pages/LocationsView";
import { ReportsView } from "./pages/ReportsView";
import { DocumentsView } from "./pages/DocumentsView";
import { PricingView } from "./pages/PricingView";
import { LandingPageView } from "./pages/LandingPageView";

// Placeholders for all the other routes
function Placeholder({ titleKey }: { titleKey: string }) {
  const { t } = useTranslation();
  return (
    <div className="p-8 bg-white rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800">{t(titleKey)}</h2>
      <p className="text-slate-500 mt-2">{t('app.placeholders.description')}</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPageView />} />
      <Route path="/app" element={<Layout />}>
        {/* STALBEHEER */}
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="horses" element={<HorseListView />} />
        <Route path="agenda" element={<AgendaView />} />
        <Route path="tasks" element={<Placeholder titleKey="app.placeholders.tasks" />} />

        {/* VERZORGING & SPORT */}
        <Route path="health" element={<HealthView />} />
        <Route path="feeding" element={<FeedingView />} />
        <Route path="competitions" element={<CompetitionsView />} />

        {/* ADMINISTRATIE & CRM */}
        <Route path="contacts" element={<AdministrationView />} />
        <Route path="invoices" element={<InvoicesView />} />
        <Route path="products" element={<ProductsView />} />
        <Route path="locations" element={<LocationsView />} />
        <Route path="documents" element={<DocumentsView />} />

        {/* FOKKERIJ */}
        <Route path="breeding">
          <Route path="mares" element={<BreedingView />} />
          <Route path="embryos" element={<BreedingView />} />
          <Route path="foals" element={<BreedingView />} />
          <Route path="stallions" element={<BreedingView />} />
        </Route>

        {/* SYSTEEM */}
        <Route path="reports" element={<ReportsView />} />
        <Route path="pricing" element={<PricingView />} />
        <Route path="settings" element={<Placeholder titleKey="app.placeholders.settings" />} />
      </Route>
    </Routes>
  );
}
