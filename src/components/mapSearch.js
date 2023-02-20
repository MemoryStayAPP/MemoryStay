import {  useMap } from "react-leaflet";
import { useEffect } from "react";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import "../assets/css/mapSearch.css"
export function MapSearch() {
const map = useMap()
const searchControl = new GeoSearchControl({
    provider: new OpenStreetMapProvider(),
    style: 'bar',
    position: 'topleft',
    showMarker: false,
    showPopup: true,
    autoClose: false,
    retainZoomLevel: false,
    animateZoom: true,
    keepResult: false,
    searchLabel: 'Enter Address',   
});
useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

}

