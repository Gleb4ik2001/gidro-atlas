import fs from 'fs';

// Загружаем файл с озёрами
const raw = fs.readFileSync('./waterWays_canal.json', 'utf-8');
const geojson = JSON.parse(raw);

// Оставляем только нужные поля
const cleanedFeatures = geojson.features.map(f => {
  return {
    type: 'Feature',
    properties: {
      name: f.properties.name,
      water: f.properties.water,
      osm_id: f.properties.osm_id
    },
    geometry: f.geometry
  };
});

// Создаём новый GeoJSON
const cleanedGeoJSON = {
  type: 'FeatureCollection',
  features: cleanedFeatures
};

// Сохраняем
fs.writeFileSync('waterWays_reservoir_cleaned.json', JSON.stringify(cleanedGeoJSON, null, 2));
console.log(`Файл очищен, осталось ${cleanedFeatures.length} озёр.`);
