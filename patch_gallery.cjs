const fs = require('fs');

let content = fs.readFileSync('src/app/pages/HorseListView.tsx', 'utf8');

// Add state
content = content.replace(
  'const [pendingMedia, setPendingMedia] = useState<string[]>([]);',
  'const [pendingMedia, setPendingMedia] = useState<string[]>([]);\n  const [deletedMediaIds, setDeletedMediaIds] = useState<string[]>([]);'
);

// Reset state on Add
content = content.replace(
  /setPendingMedia\(\[\]\); setHorseMedia\(\[\]\); setShowHorseModal\(true\);/g,
  'setPendingMedia([]); setHorseMedia([]); setDeletedMediaIds([]); setShowHorseModal(true);'
);

// Reset state on Edit
content = content.replace(
  /setPendingMedia\(\[\]\); setHorseMedia\(\[\]\); fetchHorseMedia\(horse\.id\); setShowHorseModal\(true\);/g,
  'setPendingMedia([]); setHorseMedia([]); setDeletedMediaIds([]); fetchHorseMedia(horse.id); setShowHorseModal(true);'
);

// Delete SQL
content = content.replace(
  /setShowHorseModal\(false\);\n\s*setEditingHorse\(null\);/g,
  `if (deletedMediaIds.length > 0) {
        await supabase.from('media_assets').delete().in('id', deletedMediaIds);
      }
      setShowHorseModal(false);
      setEditingHorse(null);`
);

// Gallery UI
const oldGallery = `                {(editingHorse?.image_url || horseMedia.length > 0 || pendingMedia.length > 0) && (
                  <div className="flex gap-2 flex-wrap mb-2">
                    {editingHorse?.image_url && (
                      <div className="relative w-20 h-20 rounded-xl border-2 border-[#C2A878] overflow-hidden bg-slate-100" title="Hoofdfoto">
                        {editingHorse.image_url.includes('.mp4') || editingHorse.image_url.includes('video') ? (
                          <video src={editingHorse.image_url} className="w-full h-full object-cover" />
                        ) : (
                          <img src={editingHorse.image_url} alt="Preview" className="w-full h-full object-cover" />
                        )}
                      </div>
                    )}
                    {horseMedia.map(m => (
                      <div key={m.id} className="relative w-20 h-20 rounded-xl border border-slate-200 overflow-hidden bg-slate-100">
                        {m.url.includes('.mp4') || m.url.includes('video') ? (
                          <video src={m.url} className="w-full h-full object-cover" />
                        ) : (
                          <img src={m.url} alt="Media" className="w-full h-full object-cover" />
                        )}
                      </div>
                    ))}
                    {pendingMedia.map((url, i) => (
                      <div key={i} className="relative w-20 h-20 rounded-xl border border-slate-200 overflow-hidden bg-slate-100 opacity-70">
                        {url.includes('.mp4') || url.includes('video') ? (
                          <video src={url} className="w-full h-full object-cover" />
                        ) : (
                          <img src={url} alt="Nieuw" className="w-full h-full object-cover" />
                        )}
                      </div>
                    ))}
                  </div>
                )}`;

const newGallery = `                {(editingHorse?.image_url || horseMedia.length > 0 || pendingMedia.length > 0) && (
                  <div className="flex gap-3 flex-wrap mb-4">
                    {/* Primary Image */}
                    {editingHorse?.image_url && (
                      <div className="relative w-24 h-24 rounded-xl border-2 border-[#C2A878] overflow-hidden bg-slate-100 group shadow-sm" title="Hoofdfoto">
                        {editingHorse.image_url.includes('.mp4') || editingHorse.image_url.includes('video') ? (
                          <video src={editingHorse.image_url} className="w-full h-full object-cover" />
                        ) : (
                          <img src={editingHorse.image_url} alt="Preview" className="w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                           <span className="text-white text-xs font-bold w-full text-center pointer-events-none absolute bottom-1">Hoofdfoto</span>
                           <button type="button" onClick={() => setEditingHorse(prev => prev ? { ...prev, image_url: null } : null)} className="p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                           </button>
                        </div>
                      </div>
                    )}
                    {/* Saved Media */}
                    {horseMedia.map(m => (
                      <div key={m.id} className="relative w-24 h-24 rounded-xl border border-slate-200 overflow-hidden bg-slate-100 group shadow-sm">
                        {m.url.includes('.mp4') || m.url.includes('video') ? (
                          <video src={m.url} className="w-full h-full object-cover" />
                        ) : (
                          <img src={m.url} alt="Media" className="w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                           <button type="button" onClick={() => setEditingHorse(prev => prev ? { ...prev, image_url: m.url } : null)} className="p-1.5 bg-[#C2A878] rounded-full text-white hover:bg-yellow-600" title="Maak Hoofdfoto">
                             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                           </button>
                           <button type="button" onClick={() => { setDeletedMediaIds(prev => [...prev, m.id]); setHorseMedia(prev => prev.filter(item => item.id !== m.id)); }} className="p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600" title="Verwijder">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                           </button>
                        </div>
                      </div>
                    ))}
                    {/* Pending Media */}
                    {pendingMedia.map((url, i) => (
                      <div key={i} className="relative w-24 h-24 rounded-xl border border-indigo-200 overflow-hidden bg-indigo-50 group shadow-sm opacity-90">
                        {url.includes('.mp4') || url.includes('video') ? (
                          <video src={url} className="w-full h-full object-cover" />
                        ) : (
                          <img src={url} alt="Nieuw" className="w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                           <span className="text-white text-[10px] font-bold w-full text-center pointer-events-none absolute top-1 uppercase tracking-wider">Nieuw</span>
                           <button type="button" onClick={() => setEditingHorse(prev => prev ? { ...prev, image_url: url } : null)} className="p-1.5 bg-[#C2A878] rounded-full text-white hover:bg-yellow-600" title="Maak Hoofdfoto">
                             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                           </button>
                           <button type="button" onClick={() => setPendingMedia(prev => prev.filter((_, index) => index !== i))} className="p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600" title="Verwijder">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}`;

if (content.includes(oldGallery)) {
  content = content.replace(oldGallery, newGallery);
  fs.writeFileSync('src/app/pages/HorseListView.tsx', content);
  console.log("Success");
} else {
  console.log("Old gallery not found!");
}

