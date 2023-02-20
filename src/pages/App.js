import { MapContainer, TileLayer, Marker, Popup, ZoomControl, LayersControl } from 'react-leaflet' 
import axios from 'axios';
import "leaflet/dist/leaflet.css";
import '../assets/css/customStyles.css';
import {  markerIcon  } from '../components/markerIcon';
import { SigninButton } from '../components/signInButton';
import { MapSearch } from '../components/mapSearch';
import { Avatar } from '../components/avatar';
import { Link, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import getMarkers from '../utils/getMarkers';
import { AddMarkerButton } from '../components/addMarkerButton';
// import {ContextMenu} from '../components/contextmenu';
function App() {  
const [lng, setLng] = useState(16.15);
const [lat, setLat] = useState(51.2);
const [zoom, setZoom] = useState(13);
const [markers, setMarkers] = useState([]); 
const token = sessionStorage.getItem("token");
useEffect(() => {
getMarkers(axios, setMarkers);
}, []);
const { BaseLayer } = LayersControl;
  return (
  <div className="h-screen">
  {token ? <Avatar/>: <SigninButton />}
  {token ? <AddMarkerButton /> : null}
<Outlet />
<MapContainer center={[lat, lng]} zoom={zoom} scrollWheelZoom={true} className="h-screen z-10" 
        dragging={true}
        doubleClickZoom={true}
        attributionControl={false}
        zoomControl={false}>
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
    <useRightClick />
    {markers.map(marker =>
              <Marker position={[marker.lat, marker.lng]} icon={markerIcon}>
                <Popup>
                  <Link to = {`/place/${marker.uuid}`}><h1>{marker.name}</h1></Link>
                </Popup>
              </Marker>
            )}
</MapContainer>
  </div>
  );
}

export default App;
