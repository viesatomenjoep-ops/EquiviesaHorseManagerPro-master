const fs = require('fs');

function updateFile(file, translations) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.horse_list = data.horse_list || {};
  data.horse_list.form = translations;
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

updateFile('src/i18n/locales/nl/translation.json', {
  "edit_horse": "Bewerk Paard",
  "photo_video": "Profielfoto / Video",
  "name": "Naam",
  "sex_type": "Geslacht / Type",
  "mare": "Merrie",
  "gelding": "Ruin",
  "stallion": "Hengst",
  "pony": "Pony",
  "discipline": "Discipline",
  "jumpers": "Springen",
  "hunters": "Hunters",
  "equitation": "Equitation",
  "dressage": "Dressuur",
  "sales": "Verkoop",
  "allround": "Allround",
  "age": "Leeftijd",
  "sire": "Vader (Sire)",
  "dam": "Moeder (Dam)",
  "select": "Selecteer...",
  "cancel": "Annuleren",
  "save": "Opslaan"
});

updateFile('src/i18n/locales/en/translation.json', {
  "edit_horse": "Edit Horse",
  "photo_video": "Profile Photo / Video",
  "name": "Name",
  "sex_type": "Sex / Type",
  "mare": "Mare",
  "gelding": "Gelding",
  "stallion": "Stallion",
  "pony": "Pony",
  "discipline": "Discipline",
  "jumpers": "Jumpers",
  "hunters": "Hunters",
  "equitation": "Equitation",
  "dressage": "Dressage",
  "sales": "Sales",
  "allround": "Allround",
  "age": "Age",
  "sire": "Sire",
  "dam": "Dam",
  "select": "Select...",
  "cancel": "Cancel",
  "save": "Save"
});
