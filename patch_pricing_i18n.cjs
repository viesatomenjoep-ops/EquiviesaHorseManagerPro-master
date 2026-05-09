const fs = require('fs');

// Add translation keys for pricing modal
const nlPath = 'src/i18n/locales/nl/translation.json';
const enPath = 'src/i18n/locales/en/translation.json';

const nl = JSON.parse(fs.readFileSync(nlPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Inject new keys
nl.pricing.checkout = {
  title: "Start je 22-Dagen Trial",
  company: "Bedrijfsnaam / Stalnaam",
  company_ph: "Stal de Muze",
  firstname: "Voornaam",
  firstname_ph: "Jan",
  lastname: "Achternaam",
  lastname_ph: "Jansen",
  email: "E-mailadres",
  password: "Wachtwoord",
  payment_method: "Betaalmethode (Wordt pas na 22 dagen belast)",
  creditcard: "Creditcard",
  ideal: "iDEAL",
  submit: "Bevestig & Start Proefperiode",
  submitting: "Even geduld...",
  guarantee: "Je zit nergens aan vast. Annuleer op elk moment tijdens je proefperiode.",
  summary_title: "Jouw Abonnement",
  plan_suffix: "Pakket",
  custom_plan: "Custom Plan",
  pay_today: "Vandaag te betalen",
  pay_after: "Daarna per maand",
  success: "Welkom bij Equiviesa Pro! Je account is succesvol aangemaakt."
};

en.pricing.checkout = {
  title: "Start your 22-Day Trial",
  company: "Company / Stable Name",
  company_ph: "Stal de Muze",
  firstname: "First Name",
  firstname_ph: "John",
  lastname: "Last Name",
  lastname_ph: "Doe",
  email: "Email Address",
  password: "Password",
  payment_method: "Payment Method (Will be charged after 22 days)",
  creditcard: "Credit Card",
  ideal: "iDEAL",
  submit: "Confirm & Start Trial",
  submitting: "Please wait...",
  guarantee: "No commitments. Cancel anytime during your trial period.",
  summary_title: "Your Subscription",
  plan_suffix: "Package",
  custom_plan: "Custom Plan",
  pay_today: "To pay today",
  pay_after: "Then per month",
  success: "Welcome to Equiviesa Pro! Your account has been successfully created."
};

fs.writeFileSync(nlPath, JSON.stringify(nl, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

// Now update PricingView.tsx to use these keys
let content = fs.readFileSync('src/app/pages/PricingView.tsx', 'utf8');

content = content.replace(
  /<h2 className="text-2xl font-extrabold text-slate-900">Start je 22-Dagen Trial<\/h2>/g,
  '<h2 className="text-2xl font-extrabold text-slate-900">{t(\'pricing.checkout.title\')}</h2>'
);

content = content.replace(
  /alert\('Welkom bij Equiviesa Pro! Je account is succesvol aangemaakt.'\)/g,
  "alert(t('pricing.checkout.success'))"
);

content = content.replace(
  /<label className="block text-sm font-bold text-slate-700 mb-1">Bedrijfsnaam \/ Stalnaam<\/label>/g,
  '<label className="block text-sm font-bold text-slate-700 mb-1">{t(\'pricing.checkout.company\')}</label>'
);
content = content.replace(
  /placeholder="Stal de Muze"/g,
  'placeholder={t(\'pricing.checkout.company_ph\')}'
);

content = content.replace(
  /<label className="block text-sm font-bold text-slate-700 mb-1">Voornaam<\/label>/g,
  '<label className="block text-sm font-bold text-slate-700 mb-1">{t(\'pricing.checkout.firstname\')}</label>'
);
content = content.replace(
  /placeholder="Jan"/g,
  'placeholder={t(\'pricing.checkout.firstname_ph\')}'
);

content = content.replace(
  /<label className="block text-sm font-bold text-slate-700 mb-1">Achternaam<\/label>/g,
  '<label className="block text-sm font-bold text-slate-700 mb-1">{t(\'pricing.checkout.lastname\')}</label>'
);
content = content.replace(
  /placeholder="Jansen"/g,
  'placeholder={t(\'pricing.checkout.lastname_ph\')}'
);

content = content.replace(
  /<label className="block text-sm font-bold text-slate-700 mb-1">E-mailadres<\/label>/g,
  '<label className="block text-sm font-bold text-slate-700 mb-1">{t(\'pricing.checkout.email\')}</label>'
);

content = content.replace(
  /<label className="block text-sm font-bold text-slate-700 mb-1">Wachtwoord<\/label>/g,
  '<label className="block text-sm font-bold text-slate-700 mb-1">{t(\'pricing.checkout.password\')}</label>'
);

content = content.replace(
  /<label className="block text-sm font-bold text-slate-700 mb-3">Betaalmethode \(Wordt pas na 22 dagen belast\)<\/label>/g,
  '<label className="block text-sm font-bold text-slate-700 mb-3">{t(\'pricing.checkout.payment_method\')}</label>'
);

content = content.replace(
  /<span className="font-bold text-slate-900 text-sm">Creditcard<\/span>/g,
  '<span className="font-bold text-slate-900 text-sm">{t(\'pricing.checkout.creditcard\')}</span>'
);

content = content.replace(
  /\{isSubmitting \? <Sparkles className="w-5 h-5 animate-spin" \/> : 'Bevestig & Start Proefperiode'\}/g,
  "{isSubmitting ? <Sparkles className=\"w-5 h-5 animate-spin\" /> : t('pricing.checkout.submit')}"
);

content = content.replace(
  /<p className="text-xs text-center text-slate-500 mt-4">Je zit nergens aan vast. Annuleer op elk moment tijdens je proefperiode.<\/p>/g,
  '<p className="text-xs text-center text-slate-500 mt-4">{t(\'pricing.checkout.guarantee\')}</p>'
);

content = content.replace(
  /<h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Jouw Abonnement<\/h3>/g,
  '<h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">{t(\'pricing.checkout.summary_title\')}</h3>'
);

content = content.replace(
  /<span className="font-bold text-slate-900 text-lg">\{t\(\`pricing.plans.\$\{checkoutData.plan.id\}.name\`\)\} Pakket<\/span>/g,
  '<span className="font-bold text-slate-900 text-lg">{t(`pricing.plans.${checkoutData.plan.id}.name`)} {t(\'pricing.checkout.plan_suffix\')}</span>'
);

content = content.replace(
  /<span className="font-bold text-slate-900 text-lg">Custom Plan<\/span>/g,
  '<span className="font-bold text-slate-900 text-lg">{t(\'pricing.checkout.custom_plan\')}</span>'
);

content = content.replace(
  /<span className="text-slate-500">Vandaag te betalen<\/span>/g,
  '<span className="text-slate-500">{t(\'pricing.checkout.pay_today\')}</span>'
);

content = content.replace(
  /<span className="text-slate-500">Daarna per maand<\/span>/g,
  '<span className="text-slate-500">{t(\'pricing.checkout.pay_after\')}</span>'
);

fs.writeFileSync('src/app/pages/PricingView.tsx', content);

