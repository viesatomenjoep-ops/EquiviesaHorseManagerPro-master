const fs = require('fs');

function patchHorseList() {
  const file = 'src/app/pages/HorseListView.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /const formData = new FormData\(\);[\s\S]*?if \(data\.error\) throw new Error\(data\.error\.message\);/m,
    `let formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'yibk3vns');
        formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dx21n2mbo');

        let response = await fetch(\`https://api.cloudinary.com/v1_1/\${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dx21n2mbo'}/auto/upload\`, {
          method: 'POST',
          body: formData,
        });

        let data = await response.json();

        if (data.error && data.error.message.includes('preset')) {
          formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'yibk3vns');
          formData.append('cloud_name', 'dx21n2mbo');
          response = await fetch('https://api.cloudinary.com/v1_1/dx21n2mbo/auto/upload', {
            method: 'POST',
            body: formData,
          });
          data = await response.json();
        }

        if (data.error) throw new Error(data.error.message);`
  );
  fs.writeFileSync(file, content);
}

function patchDocuments() {
  const file = 'src/app/pages/DocumentsView.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /const formData = new FormData\(\);[\s\S]*?const data = await res\.json\(\);/m,
    `let formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'yibk3vns');
      formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dx21n2mbo');

      try {
        let res = await fetch(\`https://api.cloudinary.com/v1_1/\${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dx21n2mbo'}/auto/upload\`, {
          method: 'POST',
          body: formData,
        });
        let data = await res.json();
        
        if (data.error && data.error.message.includes('preset')) {
          formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'yibk3vns');
          formData.append('cloud_name', 'dx21n2mbo');
          res = await fetch('https://api.cloudinary.com/v1_1/dx21n2mbo/auto/upload', {
            method: 'POST',
            body: formData,
          });
          data = await res.json();
        }`
  );
  fs.writeFileSync(file, content);
}

function patchBreeding() {
  const file = 'src/app/pages/BreedingView.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /const formData = new FormData\(\);[\s\S]*?const data = await res\.json\(\);/m,
    `let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'yibk3vns');
    formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dx21n2mbo');

    try {
      let res = await fetch(\`https://api.cloudinary.com/v1_1/\${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dx21n2mbo'}/auto/upload\`, {
        method: 'POST',
        body: formData,
      });
      let data = await res.json();
      
      if (data.error && data.error.message.includes('preset')) {
        formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'yibk3vns');
        formData.append('cloud_name', 'dx21n2mbo');
        res = await fetch('https://api.cloudinary.com/v1_1/dx21n2mbo/auto/upload', {
          method: 'POST',
          body: formData,
        });
        data = await res.json();
      }`
  );
  fs.writeFileSync(file, content);
}

patchHorseList();
patchDocuments();
patchBreeding();
