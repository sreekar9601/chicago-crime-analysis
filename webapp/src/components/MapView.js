// src/components/MapView.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25,41],
  iconAnchor: [12,41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapView({ crimes }) {
  const center = [41.8781, -87.6298]; // Chicago coords
  const zoom = 12;

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {crimes.map(crime => (
        <Marker key={crime.id} position={[crime.latitude, crime.longitude]}>
          <Popup>
            <div>
              <strong>Type:</strong> {crime.primary_type}<br/>
              <strong>Year:</strong> {crime.year}<br/>
              <strong>ID:</strong> {crime.id}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
