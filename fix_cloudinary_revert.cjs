const fs = require('fs');

function patchHorseList() {
  const file = 'src/app/pages/HorseListView.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /let formData = new FormData\(\);[\s\S]*?if \(data\.error\) throw new Error\(data\.error\.message\);/m,
    `const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '');
        formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '');

        const response = await fetch(\`https://api.cloudinary.com/v1_1/\${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload\`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);`
  );
  fs.writeFileSync(file, content);
}

function patchDocuments() {
  const file = 'src/app/pages/DocumentsView.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /let formData = new FormData\(\);[\s\S]*?let data = await res\.json\(\);[\s\S]*?if \(data\.error\)[^{]*\{[^}]*\}[^}]*\}[^}]*\}/m,
    `const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '');
      formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '');

      try {
        const res = await fetch(\`https://api.cloudinary.com/v1_1/\${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload\`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);`
  );
  fs.writeFileSync(file, content);
}

function patchBreeding() {
  const file = 'src/app/pages/BreedingView.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /let formData = new FormData\(\);[\s\S]*?let data = await res\.json\(\);[\s\S]*?if \(data\.error\)[^{]*\{[^}]*\}[^}]*\}[^}]*\}/m,
    `const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '');
    formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '');

    try {
      const res = await fetch(\`https://api.cloudinary.com/v1_1/\${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload\`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);`
  );
  fs.writeFileSync(file, content);
}

patchHorseList();
patchDocuments();
patchBreeding();
