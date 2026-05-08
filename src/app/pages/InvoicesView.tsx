import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, FileText, Download, CheckCircle, Search, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Invoice {
  id: string;
  document_number: string;
  date: string;
  total_amount: number;
  status: string;
  client_id?: string;
  client_name?: string; // We'll compute this if we can, else mock
}

export function InvoicesView() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // New Invoice State
  const [newInvoiceAmount, setNewInvoiceAmount] = useState<string>('');
  const [newInvoiceClient, setNewInvoiceClient] = useState<string>('Standard Client');
  const [newInvoiceStatus, setNewInvoiceStatus] = useState<string>('concept');

  useEffect(() => {
    fetchInvoices();
  }, []);

  async function fetchInvoices() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const mapped = (data || []).map(inv => ({
        id: inv.id,
        document_number: inv.document_number,
        date: inv.date,
        total_amount: inv.total_amount,
        status: inv.status,
        client_name: 'Stal Van Dijk' // We're mocking the client name because we don't have a reliable CRM link setup yet in the UI
      }));

      setInvoices(mapped);
    } catch (err) {
      console.error('Error fetching invoices:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateInvoice(e: React.FormEvent) {
    e.preventDefault();
    if (!newInvoiceAmount) return;

    try {
      const docNum = `FACT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const { error } = await supabase.from('invoices').insert({
        document_number: docNum,
        type: 'invoice',
        date: new Date().toISOString().split('T')[0],
        total_amount: parseFloat(newInvoiceAmount),
        status: newInvoiceStatus
      });

      if (!error) {
        setShowNewInvoice(false);
        setNewInvoiceAmount('');
        fetchInvoices();
      } else {
        alert("Failed to create invoice.");
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Filter invoices based on active tab
  const filteredInvoices = invoices.filter(inv => {
    if (activeTab === 'all') return true;
    return inv.status === activeTab;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('invoices.title')}</h1>
          <p className="text-slate-500">{t('invoices.subtitle')}</p>
        </div>
        <button 
          onClick={() => setShowNewInvoice(!showNewInvoice)}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          {t('invoices.new_invoice')}
        </button>
      </div>

      {showNewInvoice ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-in fade-in slide-in-from-top-4">
           <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-4">{t('invoices.create_title')}</h2>
           <p className="text-slate-500 mb-6">{t('invoices.create_desc')}</p>
           
           <form onSubmit={handleCreateInvoice} className="space-y-6 max-w-2xl">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('invoices.form.client_name')}</label>
                  <input type="text" value={newInvoiceClient} onChange={e => setNewInvoiceClient(e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('invoices.form.total_amount')}</label>
                  <input type="number" step="0.01" required value={newInvoiceAmount} onChange={e => setNewInvoiceAmount(e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-[#C2A878] focus:border-[#C2A878]" placeholder={t('invoices.form.amount_placeholder')} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('invoices.form.status')}</label>
                  <select value={newInvoiceStatus} onChange={e => setNewInvoiceStatus(e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-[#C2A878]">
                    <option value="concept">{t('invoices.tabs.concept')}</option>
                    <option value="sent">{t('invoices.tabs.sent')}</option>
                    <option value="paid">{t('invoices.tabs.paid')}</option>
                  </select>
                </div>
             </div>

             <div className="flex gap-4 pt-4 border-t border-slate-100">
               <button type="submit" className="bg-[#C2A878] hover:bg-[#B09665] text-white px-6 py-2.5 rounded-lg font-bold transition-colors">
                 {t('invoices.form.submit')}
               </button>
               <button type="button" onClick={() => setShowNewInvoice(false)} className="px-6 py-2.5 rounded-lg font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                 {t('invoices.cancel')}
               </button>
             </div>
           </form>
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
                  {tab === 'all' ? t('invoices.tabs.all') : t(`invoices.tabs.${tab}`)}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder={t('invoices.search')}
                className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-[#C2A878] focus:border-[#C2A878] w-full sm:w-64"
              />
            </div>
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="p-12 text-center text-slate-500">Laden van facturen...</div>
          ) : filteredInvoices.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center text-slate-500">
              <FileText className="w-12 h-12 text-slate-300 mb-3" />
              <p>{t('invoices.no_invoices')}</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm font-medium">
                  <th className="p-4">{t('invoices.table.number')}</th>
                  <th className="p-4">{t('invoices.table.client')}</th>
                  <th className="p-4">{t('invoices.table.date')}</th>
                  <th className="p-4">{t('invoices.table.amount')}</th>
                  <th className="p-4">{t('invoices.table.status')}</th>
                  <th className="p-4 text-right">{t('invoices.table.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4 font-medium text-slate-900 flex items-center gap-3">
                      <FileText className="w-4 h-4 text-slate-400" />
                      {invoice.document_number}
                    </td>
                    <td className="p-4 text-slate-700">{invoice.client_name}</td>
                    <td className="p-4 text-slate-500">{invoice.date}</td>
                    <td className="p-4 font-medium text-slate-900">€ {Number(invoice.total_amount).toFixed(2)}</td>
                    <td className="p-4">
                      {invoice.status === 'paid' && <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium"><CheckCircle className="w-3 h-3"/> {t('invoices.table.status_paid')}</span>}
                      {invoice.status === 'concept' && <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-medium">{t('invoices.table.status_concept')}</span>}
                      {invoice.status === 'sent' && <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">Verzonden</span>}
                      {invoice.status === 'overdue' && <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 text-xs rounded-full font-medium">{t('invoices.table.status_overdue')}</span>}
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-slate-400 hover:text-[#A88D5A] p-1 opacity-0 group-hover:opacity-100 transition-opacity" title="Download PDF"><Download className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
