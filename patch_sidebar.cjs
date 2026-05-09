const fs = require('fs');

let content = fs.readFileSync('src/app/components/Sidebar.tsx', 'utf8');

// Add import
if (!content.includes('CreditCard')) {
  content = content.replace(
    /PieChart, Settings, X, ChevronDown, ChevronRight, Globe/g,
    'PieChart, Settings, X, ChevronDown, ChevronRight, Globe, CreditCard'
  );
}

// Add item
if (!content.includes('/pricing')) {
  content = content.replace(
    /{ name: t\('nav.settings'\), path: "\/settings", icon: Settings },/g,
    `{ name: t('nav.settings'), path: "/settings", icon: Settings },
        { name: "Abonnement (Upgrade)", path: "/pricing", icon: CreditCard },`
  );
}

fs.writeFileSync('src/app/components/Sidebar.tsx', content);
