const fs = require('fs');

function patch(file, dataObj) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.horse_list.card = { ...data.horse_list.card, ...dataObj };
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

patch('src/i18n/locales/nl/translation.json', {
  "edit": "Bewerk",
  "no_discipline": "Geen discipline",
  "years": "Jaar"
});

patch('src/i18n/locales/en/translation.json', {
  "edit": "Edit",
  "no_discipline": "No discipline",
  "years": "Years"
});
