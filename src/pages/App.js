import { MapContainer, TileLayer, Marker, Popup, ZoomControl, LayersControl, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet-contextmenu';
import "leaflet/dist/leaflet.css";
import '../assets/css/customStyles.css';
import {  markerIcon  } from '../components/markerIcon';
import { SigninButton } from '../components/signInButton';
import { MapSearch } from '../components/mapSearch';
import { Avatar } from '../components/avatar';
import { Link, Outlet } from 'react-router-dom';
import React, { useRef, useEffect, useState } from 'react';
import getMarkers from '../utils/getMarkers';
import { AddMarkerButton } from '../components/addMarkerButton';
// import {ContextMenu} from '../components/contextmenu';
import ReactGA from 'react-ga4';
const TRACKING_ID = `G-31RYVSX1VS`;
ReactGA.initialize(TRACKING_ID);
function App() {  
const [lng, setLng] = useState(16.15);
const [lat, setLat] = useState(51.2);
const [zoom, setZoom] = useState(13);
const [markers, setMarkers] = useState([]); 
const token = sessionStorage.getItem("token");
useEffect(() => {
ReactGA.send({hitType: "pageview", page: window.location.pathname + window.location.search})
getMarkers(axios, setMarkers);
}, []);
const { BaseLayer } = LayersControl;
const mapRef = useRef(null);

const ContextMenu = ({ options, onMenuItemClick }) => {
  const mapRef = useMapEvents({
    contextmenu: (event) => {
      console.log('contextmenu event fired');
      L.DomEvent.stopPropagation(event);
      const latlng = event.latlng;
      console.log('mapRef.current:', mapRef.current);
      L.popup()
        .setLatLng(latlng)
        .setContent(
          options.contextmenuItems
            .map((item) => `<div class="context-menu-item">${item.text}</div>`)
            .join('')
        )
        .openOn(mapRef.current);

      const contextMenuItems = mapRef.current.getElementsByClassName('context-menu-item');
      for (let i = 0; i < contextMenuItems.length; i++) {
        contextMenuItems[i].addEventListener('click', () => {
          onMenuItemClick(i);
        });
      }
    },
  });

  return null;
};
  const contextMenuOptions = {
    contextmenu: true,
    contextmenuWidth: 140,
    contextmenuItems: [
      {
        text: 'Menu Item 1',
      },
      {
        text: 'Menu Item 2',
      },
    ],
  };

  const handleMenuItemClick = (index) => {
    console.log(`Menu item ${index + 1} clicked`);
  };
  
  return (
  <div className="h-screen">
  {token ? <Avatar/>: <SigninButton />}
  {token ? <AddMarkerButton /> : null}
<Outlet />
<MapContainer center={[lat, lng]} zoom={zoom} scrollWheelZoom={true} className="h-screen z-10" 
        dragging={true}
        doubleClickZoom={true}
        contextmenuItems={contextMenuOptions.contextmenuItems}
        attributionControl={false}
        zoomControl={false}
        contextmenu={true}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
          }}
          >
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
    {/* <useRightClick /> */}
    <ContextMenu options={contextMenuOptions} onMenuItemClick={handleMenuItemClick} />
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
