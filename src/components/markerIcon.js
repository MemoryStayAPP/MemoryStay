import L from 'leaflet';
import marker from '../assets/svg/marker-icon.svg';
const markerIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [36,36],
});

export { markerIcon };