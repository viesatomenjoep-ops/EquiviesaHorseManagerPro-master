const fs = require('fs');

let content = fs.readFileSync('src/app/pages/LandingPageView.tsx', 'utf8');

content = content.replace(
  "import { HummingbirdLogo } from '../components/HummingbirdLogo';",
  "import { Tent } from 'lucide-react';"
);

content = content.replace(
  '<HummingbirdLogo />',
  '<Tent className="w-6 h-6 text-white" />'
);

fs.writeFileSync('src/app/pages/LandingPageView.tsx', content);
