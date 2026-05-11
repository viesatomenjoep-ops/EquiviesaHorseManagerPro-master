const fs = require('fs');
const path = require('path');

const nlPath = path.join(__dirname, 'src/i18n/locales/nl/translation.json');
const enPath = path.join(__dirname, 'src/i18n/locales/en/translation.json');
const esDir = path.join(__dirname, 'src/i18n/locales/es');
const esPath = path.join(esDir, 'translation.json');

const landingNl = {
  "landing": {
    "nav": {
      "solutions": "Oplossingen",
      "pricing": "Prijzen",
      "contact": "Contact",
      "login": "Inloggen",
      "start_free": "Start 22 Dagen Gratis"
    },
    "hero": {
      "badge": "The Global Equestrian Ecosystem",
      "title_1": "Van Chaos Naar",
      "title_2": "Controle",
      "subtitle": "Vervang gefragmenteerde tools door het meest complete, schaalbare alles-in-één platform voor moderne stallen.",
      "start_trial": "Start Je Proefperiode",
      "login_direct": "Direct Inloggen"
    },
    "features": {
      "title": "Alles Wat Je Stal Nodig Heeft",
      "subtitle": "Vier krachtige modules die naadloos samenwerken op één overzichtelijk platform.",
      "f1_title": "Stable & Horse Management",
      "f1_desc": "Digitaal gezondheidsdossier, interactieve stalborden en taakdelegatie voor grooms via de mobiele app.",
      "f2_title": "IoT Tracker & Billing Engine",
      "f2_desc": "Automatische facturatie: paard in de stapmolen = automatische toevoeging op de maandfactuur via Stripe.",
      "f3_title": "Equine Media Vault",
      "f3_desc": "Ongelimiteerde cloudopslag voor 4K trainingsvideo's, auto-tagging op paardnaam, en geïntegreerde watermerken.",
      "f4_title": "Social CMS & SEO Tools",
      "f4_desc": "Plan en publiceer direct naar Instagram/Facebook en domineer zoekmachines met onze geautomatiseerde lokale SEO."
    },
    "cta": {
      "title": "Klaar Om Je Stal Te Moderniseren?",
      "subtitle": "Start direct met het stroomlijnen van je operatie. Geen creditcard nodig voor de proefperiode.",
      "btn": "Probeer Equiviesa Pro Gratis"
    },
    "footer": {
      "rights": "Alle rechten voorbehouden.",
      "privacy": "Privacy",
      "terms": "Voorwaarden"
    }
  }
};

const landingEn = {
  "landing": {
    "nav": {
      "solutions": "Solutions",
      "pricing": "Pricing",
      "contact": "Contact",
      "login": "Login",
      "start_free": "Start 22 Days Free"
    },
    "hero": {
      "badge": "The Global Equestrian Ecosystem",
      "title_1": "From Chaos To",
      "title_2": "Control",
      "subtitle": "Replace fragmented tools with the most comprehensive, scalable all-in-one platform for modern stables.",
      "start_trial": "Start Your Trial",
      "login_direct": "Login Directly"
    },
    "features": {
      "title": "Everything Your Stable Needs",
      "subtitle": "Four powerful modules working seamlessly together on one clear platform.",
      "f1_title": "Stable & Horse Management",
      "f1_desc": "Digital health records, interactive stable boards, and task delegation for grooms via the mobile app.",
      "f2_title": "IoT Tracker & Billing Engine",
      "f2_desc": "Automatic billing: horse in the walker = automatic addition to the monthly invoice via Stripe.",
      "f3_title": "Equine Media Vault",
      "f3_desc": "Unlimited cloud storage for 4K training videos, auto-tagging by horse name, and integrated watermarks.",
      "f4_title": "Social CMS & SEO Tools",
      "f4_desc": "Plan and publish directly to Instagram/Facebook and dominate search engines with our automated local SEO."
    },
    "cta": {
      "title": "Ready To Modernize Your Stable?",
      "subtitle": "Start streamlining your operation immediately. No credit card required for the trial.",
      "btn": "Try Equiviesa Pro Free"
    },
    "footer": {
      "rights": "All rights reserved.",
      "privacy": "Privacy",
      "terms": "Terms"
    }
  }
};

const landingEs = {
  "landing": {
    "nav": {
      "solutions": "Soluciones",
      "pricing": "Precios",
      "contact": "Contacto",
      "login": "Iniciar Sesión",
      "start_free": "Empieza 22 Días Gratis"
    },
    "hero": {
      "badge": "El Ecosistema Ecuestre Global",
      "title_1": "Del Caos Al",
      "title_2": "Control",
      "subtitle": "Reemplaza las herramientas fragmentadas con la plataforma todo en uno más completa y escalable para establos modernos.",
      "start_trial": "Inicia tu prueba",
      "login_direct": "Ingresar Directamente"
    },
    "features": {
      "title": "Todo lo que tu establo necesita",
      "subtitle": "Cuatro potentes módulos que trabajan juntos a la perfección en una plataforma clara.",
      "f1_title": "Gestión de Establos y Caballos",
      "f1_desc": "Historiales de salud digitales, tableros interactivos y delegación de tareas para mozos a través de la app móvil.",
      "f2_title": "Rastreador IoT y Motor de Facturación",
      "f2_desc": "Facturación automática: caballo en el caminador = adición automática a la factura mensual vía Stripe.",
      "f3_title": "Bóveda de Medios Ecuestres",
      "f3_desc": "Almacenamiento en la nube ilimitado para videos 4K, etiquetado automático y marcas de agua integradas.",
      "f4_title": "CMS Social y Herramientas SEO",
      "f4_desc": "Planifica y publica directamente en Instagram/Facebook y domina los motores de búsqueda con nuestro SEO local."
    },
    "cta": {
      "title": "¿Listo para modernizar tu establo?",
      "subtitle": "Empieza a optimizar tu operación hoy. No se requiere tarjeta de crédito.",
      "btn": "Prueba Equiviesa Pro Gratis"
    },
    "footer": {
      "rights": "Todos los derechos reservados.",
      "privacy": "Privacidad",
      "terms": "Términos"
    }
  }
};

// NL
let nlData = JSON.parse(fs.readFileSync(nlPath, 'utf8'));
nlData.landing = landingNl.landing;
fs.writeFileSync(nlPath, JSON.stringify(nlData, null, 2));

// EN
let enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
enData.landing = landingEn.landing;
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));

// ES
if (!fs.existsSync(esDir)) {
  fs.mkdirSync(esDir, { recursive: true });
}
// For ES, we just use the EN base and override landing for now, or just empty base.
let esData = { ...enData };
esData.landing = landingEs.landing;
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2));

console.log("Translations updated!");
