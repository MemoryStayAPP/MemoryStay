import L from 'leaflet';
import marker from '../assets/marker-icon.png';
const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [48,48],     
});

export { myIcon };