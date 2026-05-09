const fs = require('fs');

function patchHorseList() {
  const file = 'src/app/pages/HorseListView.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /if \(data\.error && data\.error\.message\.includes\('preset'\)\) \{/m,
    `if (data.error) {`
  );
  fs.writeFileSync(file, content);
}

function patchDocuments() {
  const file = 'src/app/pages/DocumentsView.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /if \(data\.error && data\.error\.message\.includes\('preset'\)\) \{/m,
    `if (data.error) {`
  );
  fs.writeFileSync(file, content);
}

function patchBreeding() {
  const file = 'src/app/pages/BreedingView.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /if \(data\.error && data\.error\.message\.includes\('preset'\)\) \{/m,
    `if (data.error) {`
  );
  fs.writeFileSync(file, content);
}

patchHorseList();
patchDocuments();
patchBreeding();
