import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useTranslation } from 'react-i18next';
import { Users, Edit2, CheckCircle, XCircle } from 'lucide-react';

interface Staff {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  active: boolean;
}

export function StaffWidget() {
  const { t } = useTranslation();
  const [staff, setStaff] = useState<Staff[]>([]);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  async function fetchStaff() {
    const { data } = await supabase.from('staff').select('*').order('created_at', { ascending: false });
    if (data) setStaff(data);
  }

  async function toggleActive(id: string, current: boolean) {
    await supabase.from('staff').update({ active: !current }).eq('id', id);
    fetchStaff();
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editingStaff) return;
    
    if (editingStaff.id) {
      await supabase.from('staff').update({
        first_name: editingStaff.first_name,
        last_name: editingStaff.last_name,
        role: editingStaff.role,
        email: editingStaff.email
      }).eq('id', editingStaff.id);
    } else {
      await supabase.from('staff').insert([{
        first_name: editingStaff.first_name,
        last_name: editingStaff.last_name,
        role: editingStaff.role,
        email: editingStaff.email,
        active: true
      }]);
    }
    setEditingStaff(null);
    fetchStaff();
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm magnetic-card h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-500" /> Personeel
        </h3>
        <button 
          onClick={() => setEditingStaff({ id: '', first_name: '', last_name: '', role: 'Groom', email: '', active: true })}
          className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100"
        >
          + Nieuw
        </button>
      </div>

      {editingStaff ? (
        <form onSubmit={handleSave} className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <input type="text" placeholder="Voornaam" value={editingStaff.first_name} onChange={e => setEditingStaff({...editingStaff, first_name: e.target.value})} className="w-full p-2 border rounded text-sm" required />
          <input type="text" placeholder="Achternaam" value={editingStaff.last_name} onChange={e => setEditingStaff({...editingStaff, last_name: e.target.value})} className="w-full p-2 border rounded text-sm" required />
          <input type="text" placeholder="Functie" value={editingStaff.role} onChange={e => setEditingStaff({...editingStaff, role: e.target.value})} className="w-full p-2 border rounded text-sm" />
          <input type="email" placeholder="Email (Gmail Planner)" value={editingStaff.email} onChange={e => setEditingStaff({...editingStaff, email: e.target.value})} className="w-full p-2 border rounded text-sm" />
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-indigo-600 text-white py-1.5 rounded text-sm font-bold">Opslaan</button>
            <button type="button" onClick={() => setEditingStaff(null)} className="flex-1 bg-white border border-slate-200 py-1.5 rounded text-sm font-bold text-slate-600">Annuleren</button>
          </div>
        </form>
      ) : (
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
          {staff.map(s => (
            <div key={s.id} className="flex justify-between items-center p-3 border border-slate-100 rounded-xl hover:border-slate-200 hover:shadow-sm transition-all bg-white">
              <div className="flex items-center gap-3">
                <button onClick={() => toggleActive(s.id, s.active)}>
                  {s.active ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-slate-300" />}
                </button>
                <div>
                  <p className={`text-sm font-bold ${s.active ? 'text-slate-900' : 'text-slate-400 line-through'}`}>{s.first_name} {s.last_name}</p>
                  <p className="text-xs text-slate-500">{s.role}</p>
                </div>
              </div>
              <button onClick={() => setEditingStaff(s)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
