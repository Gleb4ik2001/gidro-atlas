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


function InfoControl({ info }) {
  return (
    <div className="info">
      <h4>Kazakhstan Regions</h4>
      {info ? <b>{info.name}</b> : 'Hover over a region'}
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

      layer.on('click', () => {
        setInfo(feature.properties);
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
        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        minZoom={0}
        maxZoom={20}
        attribution='&copy; Stadia Maps &copy; OpenMapTiles &copy; OpenStreetMap contributors'
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

