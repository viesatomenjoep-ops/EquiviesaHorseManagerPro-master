import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      greeting: { morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening' },
      header: { helpText: 'How can I help you today?', searchPlaceholder: 'Search horses, invoices, tasks...' }
    }
  },
  nl: {
    translation: {
      greeting: { morning: 'Goedemorgen', afternoon: 'Goedemiddag', evening: 'Goedenavond' },
      header: { helpText: 'Waar kan ik je vandaag mee helpen?', searchPlaceholder: 'Zoek paarden, facturen, taken...' }
    }
  },
  es: {
    translation: {
      greeting: { morning: 'Buenos días', afternoon: 'Buenas tardes', evening: 'Buenas noches' },
      header: { helpText: '¿En qué puedo ayudarte hoy?', searchPlaceholder: 'Buscar caballos, facturas, tareas...' }
    }
  },
  zh: {
    translation: {
      greeting: { morning: '早上好', afternoon: '下午好', evening: '晚上好' },
      header: { helpText: '今天我能帮您什么？', searchPlaceholder: '搜索马匹，发票，任务...' }
    }
  },
  hi: {
    translation: {
      greeting: { morning: 'सुप्रभात', afternoon: 'शुभ दोपहर', evening: 'शुभ संध्या' },
      header: { helpText: 'आज मैं आपकी कैसे मदद कर सकता हूँ?', searchPlaceholder: 'घोड़े, चालान, कार्य खोजें...' }
    }
  },
  ar: {
    translation: {
      greeting: { morning: 'صباح الخير', afternoon: 'طاب مساؤك', evening: 'مساء الخير' },
      header: { helpText: 'كيف يمكنني مساعدتك اليوم؟', searchPlaceholder: 'ابحث عن الخيول، الفواتير، المهام...' }
    }
  },
  pt: {
    translation: {
      greeting: { morning: 'Bom dia', afternoon: 'Boa tarde', evening: 'Boa noite' },
      header: { helpText: 'Como posso ajudar você hoje?', searchPlaceholder: 'Buscar cavalos, faturas, tarefas...' }
    }
  },
  ru: {
    translation: {
      greeting: { morning: 'Доброе утро', afternoon: 'Добрый день', evening: 'Добрый вечер' },
      header: { helpText: 'Чем я могу помочь вам сегодня?', searchPlaceholder: 'Поиск лошадей, счетов, задач...' }
    }
  },
  ja: {
    translation: {
      greeting: { morning: 'おはようございます', afternoon: 'こんにちは', evening: 'こんばんは' },
      header: { helpText: '今日はどのようなご用件ですか？', searchPlaceholder: '馬、請求書、タスクを検索...' }
    }
  },
  fr: {
    translation: {
      greeting: { morning: 'Bonjour', afternoon: 'Bon après-midi', evening: 'Bonsoir' },
      header: { helpText: 'Comment puis-je vous aider aujourd\'hui?', searchPlaceholder: 'Rechercher chevaux, factures, tâches...' }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'nl', // Standaard taal
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
