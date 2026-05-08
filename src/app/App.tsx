import { Routes, Route } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { InvoicesView } from "./pages/InvoicesView";
import { ProductsView } from "./pages/ProductsView";

// Placeholders for all the other routes
function Placeholder({ title }: { title: string }) {
  return (
    <div className="p-8 bg-white rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      <p className="text-slate-500 mt-2">Deze module wordt momenteel ontwikkeld.</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="profiles" element={<Placeholder title="Profielen Beheer" />} />
        <Route path="diary" element={<Placeholder title="Dagboek" />} />
        <Route path="tasks" element={<Placeholder title="Taken" />} />
        <Route path="media" element={<Placeholder title="Media & Cloudinary Uploads" />} />
        <Route path="competitions" element={<Placeholder title="Wedstrijden" />} />
        <Route path="invoices" element={<InvoicesView />} />
        <Route path="products" element={<ProductsView />} />
        <Route path="breeding" element={<Placeholder title="Fokkerij & Veulens" />} />
        <Route path="reports" element={<Placeholder title="Rapporten" />} />
        <Route path="settings" element={<Placeholder title="Instellingen" />} />
      </Route>
    </Routes>
  );
}
