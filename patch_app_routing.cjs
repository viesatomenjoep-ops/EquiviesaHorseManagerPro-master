const fs = require('fs');

let content = fs.readFileSync('src/app/App.tsx', 'utf8');

// Import LandingPageView
if (!content.includes('LandingPageView')) {
  content = content.replace(
    'import { PricingView } from "./pages/PricingView";',
    'import { PricingView } from "./pages/PricingView";\nimport { LandingPageView } from "./pages/LandingPageView";'
  );
}

// Change Root path
const oldRoutes = `<Route path="/" element={<Layout />}>
        {/* STALBEHEER */}
        <Route index element={<Dashboard />} />`;

const newRoutes = `<Route path="/" element={<LandingPageView />} />
      <Route path="/app" element={<Layout />}>
        {/* STALBEHEER */}
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />`;

content = content.replace(oldRoutes, newRoutes);

// Fix links in LandingPageView to point to /app/pricing, /app/dashboard, etc.
fs.writeFileSync('src/app/App.tsx', content);

// Update LandingPageView links
let landingContent = fs.readFileSync('src/app/pages/LandingPageView.tsx', 'utf8');
landingContent = landingContent.replace(/navigate\('\/pricing'\)/g, "navigate('/app/pricing')");
landingContent = landingContent.replace(/navigate\('\/dashboard'\)/g, "navigate('/app')");
fs.writeFileSync('src/app/pages/LandingPageView.tsx', landingContent);
