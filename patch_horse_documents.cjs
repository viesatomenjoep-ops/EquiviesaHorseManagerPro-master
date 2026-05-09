const fs = require('fs');

// 1. Update supabase_master.sql
let sqlContent = fs.readFileSync('supabase_master.sql', 'utf8');
if (!sqlContent.includes('wffs_result_url')) {
  sqlContent = sqlContent.replace(
    /chip_number TEXT, -- Chipnummer/m,
    `chip_number TEXT, -- Chipnummer
  wffs_result_url TEXT, -- WFFS uitslag Cloudinary link
  fei_result_url TEXT, -- FEI document Cloudinary link`
  );
  fs.writeFileSync('supabase_master.sql', sqlContent);
}

// 2. Update HorseListView.tsx
let tsxContent = fs.readFileSync('src/app/pages/HorseListView.tsx', 'utf8');

// Update Interface
if (!tsxContent.includes('wffs_result_url?: string;')) {
  tsxContent = tsxContent.replace(
    /chip_number\?: string;/,
    `chip_number?: string;
  wffs_result_url?: string;
  fei_result_url?: string;`
  );
}

// Add Upload Handlers
if (!tsxContent.includes('handleDocumentUpload')) {
  tsxContent = tsxContent.replace(
    /const handleImageUpload = async/m,
    `const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'wffs_result_url' | 'fei_result_url') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '');
      formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '');
      const response = await fetch(\`https://api.cloudinary.com/v1_1/\${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload\`, { method: 'POST', body: formData });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      setEditingHorse(prev => prev ? { ...prev, [field]: data.secure_url } : null);
    } catch (err: any) {
      console.error(err);
      alert("Upload mislukt: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUpload = async`
  );
}

// Update Form
const oldFormFields = `<div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-900 mb-1">Chipnummer</label>
                    <input type="text" value={editingHorse?.chip_number || ''} onChange={e => setEditingHorse({...editingHorse, chip_number: e.target.value})} className="w-full p-2 border border-slate-300 rounded-md text-slate-900 focus:ring-[#C2A878] focus:border-[#C2A878]" placeholder="52821000..." />
                  </div>`;

const newFormFields = `<div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-900 mb-1">Chipnummer</label>
                    <input type="text" value={editingHorse?.chip_number || ''} onChange={e => setEditingHorse({...editingHorse, chip_number: e.target.value})} className="w-full p-2 border border-slate-300 rounded-md text-slate-900 focus:ring-[#C2A878] focus:border-[#C2A878]" placeholder="52821000..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-1">WFFS Resultaat Document</label>
                    {editingHorse?.wffs_result_url && <a href={editingHorse.wffs_result_url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 underline block mb-2 truncate">Bekijk WFFS Document</a>}
                    <div className="relative">
                      <input type="file" accept=".pdf,image/*" onChange={e => handleDocumentUpload(e, 'wffs_result_url')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={isUploading} />
                      <button type="button" className="px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-900 text-sm font-bold w-full truncate pointer-events-none">
                        Upload WFFS
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-1">FEI Document / Paspoort</label>
                    {editingHorse?.fei_result_url && <a href={editingHorse.fei_result_url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 underline block mb-2 truncate">Bekijk FEI Document</a>}
                    <div className="relative">
                      <input type="file" accept=".pdf,image/*" onChange={e => handleDocumentUpload(e, 'fei_result_url')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={isUploading} />
                      <button type="button" className="px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-900 text-sm font-bold w-full truncate pointer-events-none">
                        Upload FEI
                      </button>
                    </div>
                  </div>`;

if (!tsxContent.includes('WFFS Resultaat Document')) {
  tsxContent = tsxContent.replace(oldFormFields, newFormFields);
  fs.writeFileSync('src/app/pages/HorseListView.tsx', tsxContent);
}

console.log("Success");
