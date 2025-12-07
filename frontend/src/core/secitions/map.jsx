import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import kazakhstanRegions from '../data/region.json';
import  kazakhstanBorder from '../data/country.json';
import kazakhstanLakes from '../data/waterWays_lakes_cleaned.json';
import kazakhstaRivers from '../data/waterWays_rivers_cleaned.json';
import kazakhstanCanals from '../data/waterWays_canals_cleaned.json';
import kazakhstanReservoirs from '../data/waterWays_reservoir_cleaned.json';


function InfoControl({ info, onClose }) {
  const technicalConditionText = {
  1: "Состояние отличное! полностью функционально и не требует дополнительного вмешательства.",
  2: "Состояние хорошее, имеются незначительные дефекты или мелкие работы по обслуживанию.",
  3: "Состояние удовлетворительное, требует небольшой текущей доработки и контроля.",
  4: "Состояние плохое, необходимо проведение значительного ремонта и модернизации.",
  5: "Состояние критическое, нуждается в полной реконструкции или замене отдельных частей."
};
  const technicalConditionStyle = {
    1:'bg-green-500/20 dark:bg-green-500/20 border-green-500',
    2:'bg-green-300',
    3:'bg-yellow-500',
    4: 'bg-orange-500',
    5: 'bg-red-300'
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center z-[8000] bg-blue-800/40">
      <div className="bg-white dark:bg-black min-w-1/3 min-h-1/3 p-5 rounded-xl cursor-default">
        <div className="flex justify-between">
          <h1 className="text-3xl">{info.name}</h1>
          <button className="closeBtn px-2" onClick={onClose}>X</button>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-5">
          <h1 className="text-2xl flex items-end gap-2">Регион : <p className='font-normal'>{info.region}</p></h1>
          <h1 className="text-2xl flex items-end gap-2">Наличие фауны : <p className='font-normal'>{info.fauna ? 'есть': 'нету'}</p></h1>
          <h1 className="text-2xl flex items-end gap-2">Тип ресурса : <p className='font-normal'>{info.resource_type}</p></h1>
          <h1 className="text-2xl flex items-end gap-2">Дата : <p className='font-normal'>{info.passport_date}</p></h1>
          <h1 className="text-2xl flex items-end gap-2">Тип воды : <p className='font-normal'>{info.water_type}</p></h1>
          <h1 className="text-2xl flex items-end gap-2">Координаты: <p className='font-normal'>{info.coordinates[0]} - {info.coordinates[1]}</p></h1>
        </div>
        <div className={`flex flex-col gap-2 text-xl p-2 mt-10 mb-5 rounded border ${technicalConditionStyle[info.technical_condition]}`}>
          <h1 className="text-2xl">Состояние </h1>
          <p className='font-normal'>{technicalConditionText[info.technical_condition]}</p>
        </div>
        {info.pdf ? (
          <a
            href={info.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="iconBtn text-2xl"
          >
            Passport
          </a>) : (<span className="text-gray-400 text-2xl">No Passport</span>)}
      </div>
    </div>
  );
}

function expertControl({ info, onClose }) {
  const technicalConditionText = {
  1: "Состояние отличное! полностью функционально и не требует дополнительного вмешательства.",
  2: "Состояние хорошее, имеются незначительные дефекты или мелкие работы по обслуживанию.",
  3: "Состояние удовлетворительное, требует небольшой текущей доработки и контроля.",
  4: "Состояние плохое, необходимо проведение значительного ремонта и модернизации.",
  5: "Состояние критическое, нуждается в полной реконструкции или замене отдельных частей."
};
  return (
    <div className="absolute inset-0 flex items-center justify-center z-[8000] bg-blue-800/40">
      <div className="bg-white dark:bg-black w-1/2 h-1/3 p-5 rounded-xl">
        <div className="flex justify-between">
          <h1 className="text-3xl">{info.name}</h1>
          <button className="iconBtn p-3" onClick={onClose}>X</button>
        </div>
        <h1 className="mt-2 font-bold">{info.id}</h1>
        <p>{info.region}</p>
        <p>{info.fauna ? 'да': 'нет'}</p>
        <p>{info.passport_date}</p>
        <p>{info.resource_type}</p>
        <p>{info.water_type}</p>
        <p>{technicalConditionText[info.technical_condition]}</p>
      </div>
    </div>
  );
}




function CountryBorder({ data }) {
  return <GeoJSON data={data} style={{ color: 'black', weight: 2, fillOpacity: 0 }} />;
}


function RiversLayer({ data }) {
  const map = useMap();

  const style = feature => ({
    fillColor: '#3388ff',
    weight: 1,
    color: 'blue',
    fillOpacity: 0.5
  });

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindTooltip(feature.properties.name, {
        permanent: false, 
        direction: 'top',
        offset: [0, -5]
      });

      layer.on('mouseover', e => {
        e.target.setStyle({
          fillOpacity: 0.7,
          color: 'blue'
        });
      });
      layer.on('mouseout', e => {
        e.target.setStyle({
          fillOpacity: 0.5,
          color: 'blue'
        });
      });
    }
  };

  return <GeoJSON data={data} style={style} onEachFeature={onEachFeature} />;
}

function LabelsLayer({ data, propertyName , clsName}) {
  const map = useMap();

  useEffect(() => {
    map.createPane('labels');
    const labelsPane = map.getPane('labels');
    labelsPane.style.zIndex = 650;
    labelsPane.style.pointerEvents = 'none';
  }, [map]);

  useEffect(() => {
    data.features.forEach(feature => {
      if (feature.properties && feature.properties[propertyName]) {
        let center;
        if (feature.geometry.type === 'Point') {
          center = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
        } else {
          const bounds = L.geoJSON(feature).getBounds();
          center = bounds.getCenter();
        }

        L.marker(center, {
          icon: L.divIcon({
            className: clsName,
            html: feature.properties[propertyName],
            iconSize: [100, 20]
          }),
          pane: 'labels'
        }).addTo(map);
      }
    });
  }, [data, propertyName, map]);

  return null;
}

const makeCssIcon = (cls) =>
    L.divIcon({
      className: `marker ${cls}`,
      html: ``,
      iconSize: [18, 18],
      iconAnchor: [9, 9]
    });

const getIconByCategory = (category) => {
  switch(category) {
    case 1: return makeCssIcon('marker-green');
    case 2: return makeCssIcon('marker-lightgreen');
    case 3: return makeCssIcon('marker-yellow');
    case 4: return makeCssIcon('marker-orange');
    case 5: return makeCssIcon('marker-red');
    default: return makeCssIcon('marker-default');
  }
};

export default function TerrainMap({showLakes, showCanals, showReserviors, markers}) {
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
  <>
  {selectedMarker && (
  <InfoControl 
    info={selectedMarker} 
    onClose={() => setSelectedMarker(null)} 
  />
)}
    <MapContainer
      center={[48.0, 68.0]}
      zoom={5}
      minZoom={4}
      maxZoom={8}
      maxBounds={[
        [40.5, 46.5],
        [55.5, 87.5]
      ]}
      style={{ height: '100vh', width: '100%' }}
    >
    
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}"
        minZoom={0}
        maxZoom={20}
        ext="png"
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />


      <CountryBorder data={kazakhstanBorder} />

      {showLakes ? 
        <>
          <RiversLayer data={kazakhstanLakes} />
          <RiversLayer data={kazakhstaRivers} />
        </>
        : ''}
      {showReserviors ? 
        <>
          <RiversLayer data={kazakhstanReservoirs} />
        </>
        : ''}
      {showCanals ? 
        <>
          <RiversLayer data={kazakhstanCanals} />
        </>
        : ''}

      {markers && markers.map((marker, i) => (
        <Marker
          key={`marker-${i}`}
          position={[marker.coordinates[0] , marker.coordinates[1]] }
          icon={getIconByCategory(marker.technical_condition)}
          eventHandlers={{
            mouseover: (e) => e.target.openPopup(),
            mouseout: (e) => e.target.closePopup(),
            click: (e) => setSelectedMarker(marker) 
          }}
        >
          <Popup>
            <h1 className='font-black text-xl'>
              {marker.name}
            </h1>
            <h1>{marker.region}</h1>
          </Popup>
        </Marker>
      ))}

    
    </MapContainer>

  </>
  );
}

