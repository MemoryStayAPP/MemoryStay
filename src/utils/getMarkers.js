export default function getMarkers(axios, setMarkers) {
axios.get(`localhost:10000/api/markers/get`)
.then(res => {
  const markers = res.data;
  setMarkers(markers);
})
}