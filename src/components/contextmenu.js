import {  useMap } from "react-leaflet";
import { useEffect } from "react";
import { popup } from "leaflet";

//create context menu on right click 
 export function ContextMenu() {
  const map = useMap()
  useEffect(() => {
  map.on('contextmenu', (e) => {
  console.log(e);
  popup()
  .setLatLng(e.latlng)
  .setContent('<pre>Hello</pre>')
  .addTo(map)
  .openOn(map);

  })
  }, []);
}
export default  {ContextMenu}