const fs = require('fs');

// 1. Update supabase_master.sql
let sqlContent = fs.readFileSync('supabase_master.sql', 'utf8');
if (!sqlContent.includes('chip_number')) {
  sqlContent = sqlContent.replace(
    /age INTEGER,\n\s*date_of_birth DATE,/m,
    `age INTEGER,
  date_of_birth DATE,
  height TEXT, -- Hoogte (bijv 1.70m)
  chip_number TEXT, -- Chipnummer`
  );
  fs.writeFileSync('supabase_master.sql', sqlContent);
}

// 2. Update HorseListView.tsx
let tsxContent = fs.readFileSync('src/app/pages/HorseListView.tsx', 'utf8');

// Update Interface
if (!tsxContent.includes('chip_number?: string;')) {
  tsxContent = tsxContent.replace(
    /age\?: number;\n\s*date_of_birth\?: string;/,
    `age?: number;
  date_of_birth?: string;
  height?: string;
  chip_number?: string;`
  );
}

// Update Form
const oldFormFields = `                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-1">{t('horse_list.form.age')}</label>
                    <input type="number" value={editingHorse?.age || ''} onChange={e => setEditingHorse({...editingHorse, age: parseInt(e.target.value)})} className="w-full p-2 border border-slate-300 rounded-md text-slate-900 focus:ring-[#C2A878] focus:border-[#C2A878]" />
                  </div>`;

const newFormFields = `                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-1">{t('horse_list.form.age')}</label>
                    <input type="number" value={editingHorse?.age || ''} onChange={e => setEditingHorse({...editingHorse, age: parseInt(e.target.value)})} className="w-full p-2 border border-slate-300 rounded-md text-slate-900 focus:ring-[#C2A878] focus:border-[#C2A878]" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-1">Hoogte (bijv 1.70m)</label>
                    <input type="text" value={editingHorse?.height || ''} onChange={e => setEditingHorse({...editingHorse, height: e.target.value})} className="w-full p-2 border border-slate-300 rounded-md text-slate-900 focus:ring-[#C2A878] focus:border-[#C2A878]" placeholder="1.70m" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-900 mb-1">Chipnummer</label>
                    <input type="text" value={editingHorse?.chip_number || ''} onChange={e => setEditingHorse({...editingHorse, chip_number: e.target.value})} className="w-full p-2 border border-slate-300 rounded-md text-slate-900 focus:ring-[#C2A878] focus:border-[#C2A878]" placeholder="52821000..." />
                  </div>`;

if (!tsxContent.includes('Chipnummer')) {
  tsxContent = tsxContent.replace(oldFormFields, newFormFields);
  fs.writeFileSync('src/app/pages/HorseListView.tsx', tsxContent);
}

console.log("Success");
