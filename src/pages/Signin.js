import mapboxgl from 'mapbox-gl';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet' 
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "leaflet/dist/leaflet.css";
import {  myIcon  } from '../components/icon';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { data } from 'autoprefixer';
mapboxgl.accessToken = 'pk.eyJ1Ijoia2FjcGVyaGFoYSIsImEiOiJjbGFodzVvNncwOTRiM29ud2FzN2hycjFlIn0.ryq7YA88KOqgXPsbBXozng';

function LogIn(username, password) {
  axios.post('http://localhost:80/api/auth/login', {
    email: username.toLowerCase() || username,
    password: password
  })
  .then(function (response) {
    response.data.status ? console.log(`ez`) : console.log(`ez2`);
  })
  .catch(function (error) {
    console.log(error);
  });

}

function Signin() {
const navigate = useNavigate();
const [lng, setLng] = useState(16.15);
const [lat, setLat] = useState(51.2);
const [zoom, setZoom] = useState(13);
const [markers, setMarkers] = useState([]);
useEffect(() =>{
axios.get(`http://localhost:80/api/markers/get`)
.then(res => {
  const markers = res.data;
  setMarkers(markers);
})
}, []);
const { register, handleSubmit } = useForm();
const onSubmit = data => LogIn(data.username, data.password);
  return (
  <div className="h-screen">
<div className="flex h-[30rem] w-96 bg-white absolute z-[200] top-0 right-0 bottom-0 rounded-xl left-0 m-auto items-center justify-center animate-SlideUp ">
  <div className="flex flex-col items-center justify-center">
    <span className="text-3xl font-bold text-center text-[#00a3ff]">Sign in</span>
    <form className="flex flex-col items-center justify-center mt-4 gap-2" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Username" className="w-72 h-10 bg-[#f2f2f2] rounded-lg border-black border-[1px] pl-4 text-[#00a3ff] font-bold text-xl focus:outline-none"  {...register("username")} />
      <input type="password" placeholder="Password" className="w-72 h-10 bg-[#f2f2f2] border-black rounded-lg border-[1px] pl-4 text-[#00a3ff] font-bold text-xl focus:outline-none mt-4" {...register("password")} />
      <button className="w-72 h-10 bg-[#00a3ff] rounded-xl shadow-2xl pl-4 text-white font-bold text-xl focus:outline-none mt-4 hover:bg-[#0091e6] " >Sign in</button>
    </form>
    <span> Need an account? <u onClick={() => {navigate(`/signup`)}}>Sign up</u></span>
  </div>
</div>
  <div className="h-screen w-screen absolute z-[100] top-0 right-0 bg-black animate-FadeIn"></div>
<div className="w-36 h-10 bg-white rounded-full absolute z-50 top-4 right-4 shadow-2xl flex items-center justify-center">
  <span className="w-36 text-2xl font-bold text-center text-[#00a3ff] truncate" onClick={() => {navigate(`/lista`)}}>Sign in</span>
</div>
<MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={true} className="h-screen z-10" dragging={true} doubleClickZoom={true} attributionControl={false} zoomControl={true}>        
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
    />
    {markers.map(marker =>
              <Marker position={[marker.lat, marker.lng]} icon={myIcon}>
                <Popup>
                  {marker.name}
                </Popup>
              </Marker>
            )}
</MapContainer>
  </div>
  );
}

export default Signin;
