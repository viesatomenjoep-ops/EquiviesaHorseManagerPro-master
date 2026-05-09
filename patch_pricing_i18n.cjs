const fs = require('fs');

function updateTranslation(langPath, keys) {
  let content = JSON.parse(fs.readFileSync(langPath, 'utf8'));
  content.pricing = keys;
  fs.writeFileSync(langPath, JSON.stringify(content, null, 2));
}

const nlKeys = {
  title: "Paardenmanager App",
  pro: "Pro",
  subtitle: "Beheer letterlijk alles vanaf één plek. Kies een compleet pakket of stel je eigen gepersonaliseerde abonnement samen. Start vandaag met een <1>gratis 30-dagen free trial</1>.",
  tabs: {
    presets: "Vaste Pakketten",
    custom: "Bouw Je Eigen Abonnement"
  },
  plans: {
    most_popular: "Meest Gekozen",
    month: "/ maand",
    trial_btn: "Start 30-Dagen Free Trial",
    basic: {
      name: "Basis",
      desc: "Perfect voor kleine stallen.",
      horses: "Tot 5 paarden",
      features: [
        "Standaard EHR (Gezondheid)",
        "Basis Agenda & Taken",
        "Locatie & Boxbeheer",
        "Email Support (48u reactie)",
        "Standaard Formulieren"
      ]
    },
    premium: {
      name: "Premium",
      desc: "Voor professionele stallen & fokkerij.",
      horses: "Tot 10 paarden",
      features: [
        "Alles uit Basis, plus:",
        "Volledig ERP (Facturen & Offertes)",
        "Geavanceerd CRM Systeem",
        "Uitgebreide Fokkerij Module",
        "Lokale SEO Dominantie",
        "Klantportaal (Client Portal)",
        "Priority Support (24u reactie)"
      ]
    },
    ultra: {
      name: "Ultra",
      desc: "Voor de ultieme paardenonderneming.",
      horses: "Vanaf 20 paarden",
      features: [
        "Alles uit Premium, plus:",
        "Compleet CMS (Website Manager)",
        "Custom Website Development",
        "Custom App Development Opties",
        "AI Klantenservice Bots (24/7)",
        "Logo & Branding Design",
        "Ondersteuning meerdere vestigingen",
        "24/7 VIP Telefoon Support"
      ]
    }
  },
  custom: {
    title: "Bouw Jouw Custom Plan",
    subtitle: "Selecteer alleen de modules die jouw paardenbedrijf nodig heeft.",
    total_label: "Jouw Custom Plan Totaal",
    start_btn: "Start Custom Abonnement",
    modules: {
      ehr: "EHR (Gezondheidsdossier)",
      erp: "ERP (Facturatie & Offertes)",
      crm: "CRM (Klantrelaties)",
      cms: "CMS & Website Development",
      css: "CSS & Custom Styling",
      branding: "Branding & Logo Design",
      ai: "AI Automations & Bots",
      breeding: "Fokkerij Manager"
    }
  }
};

const enKeys = {
  title: "Horse Manager App",
  pro: "Pro",
  subtitle: "Manage literally everything from one place. Choose a complete package or build your own personalized subscription. Start today with a <1>free 30-day trial</1>.",
  tabs: {
    presets: "Fixed Packages",
    custom: "Build Your Own Plan"
  },
  plans: {
    most_popular: "Most Popular",
    month: "/ month",
    trial_btn: "Start 30-Day Free Trial",
    basic: {
      name: "Basic",
      desc: "Perfect for small stables.",
      horses: "Up to 5 horses",
      features: [
        "Standard EHR (Health)",
        "Basic Calendar & Tasks",
        "Location & Box Management",
        "Email Support (48h response)",
        "Standard Forms"
      ]
    },
    premium: {
      name: "Premium",
      desc: "For professional stables & breeding.",
      horses: "Up to 10 horses",
      features: [
        "Everything in Basic, plus:",
        "Full ERP (Invoices & Quotes)",
        "Advanced CRM System",
        "Extended Breeding Module",
        "Local SEO Dominance",
        "Client Portal",
        "Priority Support (24h response)"
      ]
    },
    ultra: {
      name: "Ultra",
      desc: "For the ultimate equestrian enterprise.",
      horses: "20+ horses",
      features: [
        "Everything in Premium, plus:",
        "Complete CMS (Website Manager)",
        "Custom Website Development",
        "Custom App Development Options",
        "AI Customer Service Bots (24/7)",
        "Logo & Branding Design",
        "Multi-location Support",
        "24/7 VIP Phone Support"
      ]
    }
  },
  custom: {
    title: "Build Your Custom Plan",
    subtitle: "Select only the modules your equine business needs.",
    total_label: "Your Custom Plan Total",
    start_btn: "Start Custom Subscription",
    modules: {
      ehr: "EHR (Health Records)",
      erp: "ERP (Invoices & Quotes)",
      crm: "CRM (Client Relations)",
      cms: "CMS & Website Development",
      css: "CSS & Custom Styling",
      branding: "Branding & Logo Design",
      ai: "AI Automations & Bots",
      breeding: "Breeding Manager"
    }
  }
};

updateTranslation('src/i18n/locales/nl/translation.json', nlKeys);
updateTranslation('src/i18n/locales/en/translation.json', enKeys);
console.log('Translations updated.');
