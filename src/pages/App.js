import mapboxgl from 'mapbox-gl';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet' 
import axios from 'axios';
import "leaflet/dist/leaflet.css";
import {  markerIcon  } from '../components/icon';
import { useNavigate } from "react-router-dom";
import React, { useRef, useEffect, useState, useMemo } from 'react';
mapboxgl.accessToken = 'pk.ey J1Ijoia2FjcGVyaGFoYSIsImEiOiJjbGFodzVvNncwOTRiM29ud2FzN2hycjFlIn0.ryq7YA88KOqgXPsbBXozng';


function App() {
const navigate = useNavigate();
const [lng, setLng] = useState(16.15);
const [lat, setLat] = useState(51.2);
const [zoom, setZoom] = useState(13);
const [markers, setMarkers] = useState([]);
useEffect(() => {
axios.get(`http://localhost:80/api/markers/get`)
.then(res => {
  const markers = res.data;
  setMarkers(markers);
})
}, []);

  return (
  <div className="h-screen">
<div className="w-36 h-10 bg-white rounded-full absolute z-50 top-4 right-4 shadow-2xl flex items-center justify-center">
  <span className="w-36 text-2xl font-bold text-center text-[#00a3ff] truncate" onClick={() => {navigate(`/signin`)}}>Sign in</span>
</div>
<MapContainer center={[lat, lng]} zoom={35} scrollWheelZoom={true} className="h-screen z-10" dragging={true}
        doubleClickZoom={true}
        attributionControl={false}
        zoomControl={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
    />
    {markers.map(marker =>
              <Marker position={[marker.lat, marker.lng]} icon={markerIcon}>
                <Popup>
                  {marker.name}
                </Popup>
              </Marker>
            )}
</MapContainer>
  </div>
  );
}

export default App;
