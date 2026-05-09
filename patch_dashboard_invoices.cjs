const fs = require('fs');

let content = fs.readFileSync('src/app/pages/Dashboard.tsx', 'utf8');

// Add edit invoice state
content = content.replace(
  /const \[recentInvoices, setRecentInvoices\] = useState<RecentInvoice\[\]>\(\[/g,
  `const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [recentInvoices, setRecentInvoices] = useState<any[]>([`
);

const oldInvoicesRender = `<div className="space-y-4">
            {recentInvoices.map((inv, i) => (
              <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-bold text-slate-800">{inv.client}</p>
                  <p className="text-xs text-slate-500">{inv.status}</p>
                </div>
                <div className={\`px-2 py-1 rounded-md \${inv.bg}\`}>
                  <p className={\`text-xs font-bold \${inv.color}\`}>{inv.amount}</p>
                </div>
              </div>
            ))}
          </div>`;

const newInvoicesRender = `<div className="space-y-4">
            {recentInvoices.map((inv, i) => (
              <div key={i} onClick={() => setSelectedInvoice(inv)} className="flex justify-between items-center border-b border-slate-50 pb-3 last:border-0 last:pb-0 cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors group">
                <div>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-[#C2A878] transition-colors">{inv.client}</p>
                  <p className="text-xs text-slate-500">{inv.status}</p>
                </div>
                <div className={\`px-2 py-1 rounded-md \${inv.bg}\`}>
                  <p className={\`text-xs font-bold \${inv.color}\`}>{inv.amount}</p>
                </div>
              </div>
            ))}
          </div>`;

content = content.replace(oldInvoicesRender, newInvoicesRender);

const invoiceModal = `
      {/* EDIT INVOICE MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Factuur Bewerken</h2>
              <button onClick={() => setSelectedInvoice(null)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Klant / Relatie</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl" value={selectedInvoice.client} onChange={e => setSelectedInvoice({...selectedInvoice, client: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Bedrag</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl" value={selectedInvoice.amount} onChange={e => setSelectedInvoice({...selectedInvoice, amount: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl" value={selectedInvoice.status} onChange={e => setSelectedInvoice({...selectedInvoice, status: e.target.value})}>
                  <option value="Betaald">Betaald</option>
                  <option value="Afgeschreven">Afgeschreven</option>
                  <option value="In Verwerking">In Verwerking</option>
                </select>
              </div>
              <button onClick={() => {
                setRecentInvoices(prev => prev.map(inv => inv.client === selectedInvoice.client ? selectedInvoice : inv));
                setSelectedInvoice(null);
              }} className="w-full py-3 bg-[#C2A878] hover:bg-[#b09665] text-white rounded-xl font-bold transition-colors mt-2">
                Opslaan in SQL
              </button>
            </div>
          </div>
        </div>
      )}
`;

content = content.replace('      )}\n    </>\n  );\n}', '      )}\n' + invoiceModal + '    </>\n  );\n}');

fs.writeFileSync('src/app/pages/Dashboard.tsx', content);
