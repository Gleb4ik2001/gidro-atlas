import fs from 'fs';

// Загружаем GeoJSON
const raw = fs.readFileSync('./waterways.json', 'utf-8');
const geojson = JSON.parse(raw);

// Фильтруем только озёра
const lakes = geojson.features.filter(f => f.properties.water === 'reservoir');

// Создаём новый GeoJSON с озёрами
const lakesGeoJSON = {
  type: 'FeatureCollection',
  features: lakes
};

// Сохраняем в файл
fs.writeFileSync('waterWays_.json', JSON.stringify(lakesGeoJSON));
console.log(`Найдено ${lakes.length} озёр. Сохранили в waterWays_lakes.json`);

