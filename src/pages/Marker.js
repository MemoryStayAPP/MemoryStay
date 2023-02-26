import { MapContainer, TileLayer, Marker, Popup, ZoomControl, LayersControl} from 'react-leaflet' 
import axios from 'axios';
import "leaflet/dist/leaflet.css";
import '../assets/css/customStyles.css';
import {  markerIcon  } from '../components/markerIcon';
import { SigninButton } from '../components/signInButton';
import { MapSearch } from '../components/mapSearch';
import { Avatar } from '../components/avatar';
import { Navigate, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {Center} from '../components/center.js';
import getMarkers from '../utils/getMarkers';
import { AddMarkerButton } from '../components/addMarkerButton';
// import {ContextMenu} from '../components/contextmenu';
import { useParams } from 'react-router-dom';
function MarkerPage() {  
const [lng, setLng] = useState(16.15);
const [lat, setLat] = useState(51.2);
const [zoom, setZoom] = useState(13);
const [markers, setMarkers] = useState([]); 
const token = sessionStorage.getItem("token");
const { uid } = useParams();
const [marker, setMarker] = useState({});
useEffect(() => {
getMarkers(axios, setMarkers);
function SetCenter([lat, lng]) {
  console.log(lat, lng)
  setLat(lat);                                          
  setLng(lng);             
}                                                                                                                                                               
markers.forEach(marker => marker.uuid === uid ? setMarker(marker) : null);
console.log(uid)
if(!uid) Navigate('/');
console.log(markers)
}, []);
const { BaseLayer } = LayersControl;
  return (
  <div className="h-screen">
  {token ? <Avatar/>: <SigninButton />}
  {token ? <AddMarkerButton /> : null}
  <div className="absolute left-0 top-0 h-3/4 w-1/4 mt-14 ml-4 rounded-2xl bg-gray-700 z-50">
  <div className="p-4">
  <div className="flex items-center">
  <img className="h-12 w-12 rounded-full" src={marker.image} alt="marker" />
  <div className="ml-4">
  <h2 className="text-xl font-bold">{marker.name}</h2>
  <p className="text-sm font-medium text-gray-500">{marker.description}</p>
  </div>
  </div>
  </div>
  </div>
<Outlet />
<MapContainer center={[lat, lng]} zoom={zoom} scrollWheelZoom={true} className="h-screen z-10" 
        dragging={true}
        doubleClickZoom={true}
        attributionControl={false}
        zoomControl={false}>
          {/* <Center markers={markers}/> */}
  <LayersControl position="bottomright">
    <BaseLayer checked name='Default'>
      <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png?api_key=be029f88-592e-41cc-ab7c-83e68e11b144"
      />
    </BaseLayer>
    <BaseLayer name='Dark'>
      <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=be029f88-592e-41cc-ab7c-83e68e11b144"
      />
    </BaseLayer>
    <BaseLayer name='Light'>
      <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=be029f88-592e-41cc-ab7c-83e68e11b144"
      />
    </BaseLayer>
  </LayersControl>
    <ZoomControl position="bottomright" />
    <MapSearch />
    {/* <ContextMenu /> */}
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

export default MarkerPage;
