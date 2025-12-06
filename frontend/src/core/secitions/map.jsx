import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import kazakhstanRegions from '../data/region.json';
import  kazakhstanBorder from '../data/country.json';
import kazakhstanWaters from '../data/waterways.json';
import * as turf from '@turf/turf';

function InfoControl({ info }) {
  return (
    <div className="info">
      <h4>Kazakhstan Regions</h4>
      {info ? <b>{info.name}</b> : 'Hover over a region'}
    </div>
  );
}

// GeoJSON слой регионов
function RegionLayer({ data, setInfo }) {
  const map = useMap();

  const style = feature => ({
    fillColor: '#3388ff',
    weight: 1,
    color: 'purple',
    fillOpacity: 0
  });

  return <GeoJSON data={data} style={style} />;
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
    fillOpacity: 0
  });

  return <GeoJSON data={data} style={style} />;
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

export default function TerrainMap({showLakes, markers}) {
  const [info, setInfo] = useState(null);


  return (
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
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}"
        attribution="&copy; Esri"
      />

      <CountryBorder data={kazakhstanBorder} />

      <RegionLayer data={kazakhstanRegions} setInfo={setInfo} />
      <LabelsLayer data={kazakhstanRegions} propertyName="NAME_1" clsName='region-label'/>
      {showLakes ? 
        <>
          <RiversLayer data={kazakhstanWaters} />
        </>
        : ''}


      {markers && markers.map((marker, i) => (
        <Marker
          key={`marker-${i}`}
          position={marker.postion}
          icon={getIconByCategory(marker.category)}
          eventHandlers={{
            mouseover: (e) => e.target.openPopup(),
            mouseout: (e) => e.target.closePopup(),
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

      {/* информация о регионе */}
      <InfoControl info={info} />
    </MapContainer>
  );
}

