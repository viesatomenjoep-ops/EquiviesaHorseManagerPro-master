import { Routes, Route } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { InvoicesView } from "./pages/InvoicesView";
import { ProductsView } from "./pages/ProductsView";
import { AgendaView } from "./pages/AgendaView";

// Placeholders for all the other routes
function Placeholder({ title }: { title: string }) {
  return (
    <div className="p-8 bg-white rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      <p className="text-slate-500 mt-2">Deze module wordt momenteel ontwikkeld en is binnenkort beschikbaar.</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* STALBEHEER */}
        <Route index element={<Dashboard />} />
        <Route path="horses" element={<Placeholder title="Mijn Paarden" />} />
        <Route path="agenda" element={<AgendaView />} />
        <Route path="tasks" element={<Placeholder title="Takenbord" />} />

        {/* VERZORGING & SPORT */}
        <Route path="health" element={<Placeholder title="Gezondheid & Medisch" />} />
        <Route path="feeding" element={<Placeholder title="Voedingsschema's" />} />
        <Route path="competitions" element={<Placeholder title="Wedstrijdsport" />} />

        {/* ADMINISTRATIE & CRM */}
        <Route path="contacts" element={<Placeholder title="Relaties & Contacten" />} />
        <Route path="invoices" element={<InvoicesView />} />
        <Route path="products" element={<ProductsView />} />
        <Route path="locations" element={<Placeholder title="Stallen & Locaties" />} />
        <Route path="documents" element={<Placeholder title="Documenten & Media (Cloudinary)" />} />

        {/* FOKKERIJ */}
        <Route path="mares" element={<Placeholder title="Merrie Lijnen" />} />
        <Route path="embryos" element={<Placeholder title="Embryo Tracking" />} />
        <Route path="foals" element={<Placeholder title="Veulen Opfok" />} />

        {/* SYSTEEM */}
        <Route path="reports" element={<Placeholder title="Rapporten & Analytics" />} />
        <Route path="settings" element={<Placeholder title="Systeem Instellingen" />} />
      </Route>
    </Routes>
  );
}
