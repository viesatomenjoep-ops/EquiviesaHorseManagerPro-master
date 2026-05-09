const fs = require('fs');

let content = fs.readFileSync('src/app/pages/HorseListView.tsx', 'utf8');

// Add horseMedia state
content = content.replace(
  "const [isUploading, setIsUploading] = useState(false);",
  "const [isUploading, setIsUploading] = useState(false);\n  const [horseMedia, setHorseMedia] = useState<any[]>([]);\n  const [pendingMedia, setPendingMedia] = useState<string[]>([]);"
);

// Add fetchHorseMedia
content = content.replace(
  "async function fetchData() {",
  `async function fetchHorseMedia(horseId: string) {
    if (!horseId || horseId.startsWith('mock')) return;
    const { data } = await supabase.from('media_assets').select('*').eq('horse_id', horseId);
    if (data) setHorseMedia(data);
  }

  async function fetchData() {`
);

// Update Edit button onClick
content = content.replace(
  /onClick=\{\(\) => \{ setEditingHorse\(horse\); setShowHorseModal\(true\); \}\}/g,
  "onClick={() => { setEditingHorse(horse); setPendingMedia([]); setHorseMedia([]); fetchHorseMedia(horse.id); setShowHorseModal(true); }}"
);

// Update Add button onClick
content = content.replace(
  "setEditingHorse({ \n                discipline: selectedCategory === 'sales' ? 'Sales' : \n                            (selectedCategory === 'dressage' ? 'Dressage' : 'Jumpers'),\n                sex: 'Mare'\n              }); \n              setShowHorseModal(true);",
  "setEditingHorse({ discipline: selectedCategory === 'sales' ? 'Sales' : (selectedCategory === 'dressage' ? 'Dressage' : 'Jumpers'), sex: 'Mare' }); setPendingMedia([]); setHorseMedia([]); setShowHorseModal(true);"
);

// Update handleImageUpload to handle multiple
content = content.replace(
  /const handleImageUpload = async[^{]*\{([\s\S]*?)finally \{\s*setIsUploading\(false\);\s*\}\s*\};/,
  `const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'equiviesa_upload');
        formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'daj1lyfgk');

        const response = await fetch(\`https://api.cloudinary.com/v1_1/\${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'daj1lyfgk'}/auto/upload\`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data.secure_url;
      });

      const urls = await Promise.all(uploadPromises);
      const validUrls = urls.filter(url => url);
      
      if (validUrls.length > 0) {
        // First image becomes primary image_url if not set
        setEditingHorse(prev => {
           if (!prev) return prev;
           if (!prev.image_url) return { ...prev, image_url: validUrls[0] };
           return prev;
        });
        // Add all to pending media to insert later
        setPendingMedia(prev => [...prev, ...validUrls]);
      }
    } catch (error: any) {
      console.error('Upload failed', error);
      alert('Upload mislukt: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };`
);

// Update handleSaveHorse
content = content.replace(
  /async function handleSaveHorse[\s\S]*?fetchData\(\);\n    \} catch \(err\) \{/m,
  `async function handleSaveHorse(e: React.FormEvent) {
    e.preventDefault();
    if (!editingHorse) return;

    try {
      let currentHorseId = editingHorse.id;
      
      if (currentHorseId && !currentHorseId.startsWith('mock')) {
        const { error } = await supabase.from('horses').update(editingHorse).eq('id', currentHorseId);
        if (error) { alert("Fout bij opslaan: " + error.message); return; }
      } else {
        const { id, ...newHorseData } = editingHorse as any;
        const { data, error } = await supabase.from('horses').insert([newHorseData]).select();
        if (error) { alert("Fout bij toevoegen: " + error.message); return; }
        if (data && data[0]) currentHorseId = data[0].id;
      }

      // Save pending media
      if (pendingMedia.length > 0 && currentHorseId) {
        const mediaInserts = pendingMedia.map(url => ({
          horse_id: currentHorseId,
          url: url,
          document_category: 'Foto/Video'
        }));
        await supabase.from('media_assets').insert(mediaInserts);
      }

      setShowHorseModal(false);
      setEditingHorse(null);
      setPendingMedia([]);
      setHorseMedia([]);
      fetchData();
    } catch (err) {`
);

// Add multiple to file input and show media
content = content.replace(
  '<input type="file" accept="image/*,video/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={isUploading} title={t(\'horse_list.form.photo_video\')} />',
  `<input type="file" multiple accept="image/*,video/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={isUploading} title={t('horse_list.form.photo_video')} />`
);

fs.writeFileSync('src/app/pages/HorseListView.tsx', content);
