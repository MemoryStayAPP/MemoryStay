import serverLaravel from "../configs/general.config";
export default function getMarkers(axios, setMarkers) {
axios.get(`${serverLaravel.url}/api/markers/get`)
.then(res => {
  const markers = res.data;
  setMarkers(markers);
})
}