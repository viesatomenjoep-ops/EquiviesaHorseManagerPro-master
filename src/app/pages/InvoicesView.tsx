import { useState, useEffect } from 'react';
import { Plus, FileText, Download, CheckCircle, Search } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function InvoicesView() {
  const [activeTab, setActiveTab] = useState('all');
  const [showNewInvoice, setShowNewInvoice] = useState(false);

  // Mock data for initial render if Supabase tables are empty/missing
  const mockInvoices = [
    { id: '1', number: 'FACT-2026-001', client: 'Stal de Vries', date: '2026-05-01', amount: 1450.00, status: 'paid' },
    { id: '2', number: 'FACT-2026-002', client: 'Jansen Sportpaarden', date: '2026-05-05', amount: 350.50, status: 'concept' },
    { id: '3', number: 'FACT-2026-003', client: 'Manege de Hoef', date: '2026-04-20', amount: 890.00, status: 'overdue' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Facturatie Systeem</h1>
          <p className="text-slate-500">Beheer facturen, betalingen en openstaande posten.</p>
        </div>
        <button 
          onClick={() => setShowNewInvoice(!showNewInvoice)}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Nieuwe Factuur
        </button>
      </div>

      {showNewInvoice ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
           <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-4">Nieuwe Factuur Aanmaken</h2>
           <p className="text-slate-500 mb-6">Selecteer een klant en voeg producten/diensten toe aan de factuur.</p>
           
           {/* Placeholder for actual invoice editor logic */}
           <div className="bg-slate-50 p-8 rounded-lg text-center border-2 border-dashed border-slate-200">
             <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
             <h3 className="text-slate-700 font-medium">Factuur Editor (In Ontwikkeling)</h3>
             <p className="text-sm text-slate-500 mt-1">Hier komt het formulier om regels uit de Producten catalogus te selecteren.</p>
             <button onClick={() => setShowNewInvoice(false)} className="mt-4 text-teal-600 font-medium hover:underline">Annuleren</button>
           </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg self-start">
              {['all', 'concept', 'sent', 'paid'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-colors ${
                    activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab === 'all' ? 'Alle' : tab}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Zoek op factuurnr of klant..." 
                className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500 w-full sm:w-64"
              />
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm font-medium">
                <th className="p-4">Factuurnummer</th>
                <th className="p-4">Klant</th>
                <th className="p-4">Datum</th>
                <th className="p-4">Bedrag</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4 font-medium text-slate-900 flex items-center gap-3">
                    <FileText className="w-4 h-4 text-slate-400" />
                    {invoice.number}
                  </td>
                  <td className="p-4 text-slate-700">{invoice.client}</td>
                  <td className="p-4 text-slate-500">{invoice.date}</td>
                  <td className="p-4 font-medium text-slate-900">€ {invoice.amount.toFixed(2)}</td>
                  <td className="p-4">
                    {invoice.status === 'paid' && <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium"><CheckCircle className="w-3 h-3"/> Betaald</span>}
                    {invoice.status === 'concept' && <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-medium">Concept</span>}
                    {invoice.status === 'overdue' && <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 text-xs rounded-full font-medium">Te laat</span>}
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-slate-400 hover:text-teal-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity" title="Download PDF"><Download className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
