const fs = require('fs');

let content = fs.readFileSync('src/app/pages/Dashboard.tsx', 'utf8');

content = content.replace(
  'return (\n    <div className="space-y-6">',
  'return (\n    <>\n    <div className="space-y-6">'
);

content = content.replace(
  '      )}\n  );\n}',
  '      )}\n    </>\n  );\n}'
);

fs.writeFileSync('src/app/pages/Dashboard.tsx', content);
