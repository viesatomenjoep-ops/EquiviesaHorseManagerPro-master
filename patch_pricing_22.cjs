const fs = require('fs');

let content = fs.readFileSync('src/app/pages/PricingView.tsx', 'utf8');

// Replace 30 with 22
content = content.replace(/30-dagen free trial/g, '22-dagen free trial');
content = content.replace(/Start je 30-Dagen Trial/g, 'Start je 22-Dagen Trial');
content = content.replace(/Wordt pas na 30 dagen belast/g, 'Wordt pas na 22 dagen belast');

fs.writeFileSync('src/app/pages/PricingView.tsx', content);

let landing = fs.readFileSync('src/app/pages/LandingPageView.tsx', 'utf8');
landing = landing.replace(/30 Dagen Gratis/g, '22 Dagen Gratis');
fs.writeFileSync('src/app/pages/LandingPageView.tsx', landing);

