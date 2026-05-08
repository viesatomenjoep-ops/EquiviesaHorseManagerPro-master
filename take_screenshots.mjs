import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = '/Users/tomvanbiene/Desktop/Equiviesa_Screenshots';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

const baseUrl = 'https://equiviesa-horse-manager.vercel.app';

const routes = [
  { path: '/', name: '01_Dashboard' },
  { path: '/horses', name: '02_Horses' },
  { path: '/agenda', name: '03_Agenda' },
  { path: '/tasks', name: '04_Tasks' },
  { path: '/health', name: '05_Health' },
  { path: '/feeding', name: '06_Feeding' },
  { path: '/competitions', name: '07_Competitions' },
  { path: '/contacts', name: '08_Contacts' },
  { path: '/invoices', name: '09_Invoices' },
  { path: '/products', name: '10_Products' },
  { path: '/locations', name: '11_Locations' },
  { path: '/documents', name: '12_Documents' },
  { path: '/breeding/mares', name: '13_Breeding_Mares' },
  { path: '/reports', name: '14_Reports' },
  { path: '/settings', name: '15_Settings' }
];

(async () => {
  console.log('Starting Playwright...');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  for (const route of routes) {
    const url = `${baseUrl}${route.path}`;
    console.log(`Navigating to ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      // Wait a moment for animations or dynamically loaded data
      await page.waitForTimeout(2000);
      
      const screenshotPath = path.join(outDir, `${route.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Saved screenshot: ${screenshotPath}`);
    } catch (e) {
      console.error(`Error capturing ${url}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('Done!');
})();
