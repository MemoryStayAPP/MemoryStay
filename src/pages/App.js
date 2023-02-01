import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet' 
import axios from 'axios';
import "leaflet/dist/leaflet.css";
import '../assets/css/customStyles.css';
import {  markerIcon  } from '../components/markerIcon';
import { SigninButton } from '../components/signInButton';
import { MapSearch } from '../components/mapSearch';
import { Avatar } from '../components/avatar';
import { useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


function App() {
const [lng, setLng] = useState(16.15);
const [lat, setLat] = useState(51.2);
const [zoom, setZoom] = useState(13);
const [markers, setMarkers] = useState([]); 
const token = sessionStorage.getItem("token");
useEffect(() => {
axios.get(`http://localhost:80/api/markers/get`)
.then(res => {
  const markers = res.data;
  setMarkers(markers);
})
}, []);

  return (
  <div className="h-screen">
  {token ? <Avatar />: <SigninButton />}
<Outlet />
<MapContainer center={[lat, lng]} zoom={zoom} scrollWheelZoom={true} className="h-screen z-10" 
        dragging={true}
        doubleClickZoom={true}
        attributionControl={false}
        zoomControl={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
    />
    <ZoomControl position="bottomright" />
    <MapSearch />
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
