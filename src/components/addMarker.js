import { useNavigate , Navigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState, useEffect } from "react";
import ErrorStatusMessage from "../utils/ErrorStatusCSS";
import serverLaravel from '../configs/general.config';
export function AddMarker() {
const navigate = useNavigate();

const { register, handleSubmit, getValues, watch } = useForm();
const [error, Seterror] = useState()
const [datavalues, setValues] = useState("")
useEffect(() => {
  if(!sessionStorage.getItem('token')) {
    navigate('/signin')
  }
  const subscription = watch((data) => {
  console.log(error?.status)
  console.log(data)
  if(datavalues != data) Seterror()
  })
  return () => {
  subscription.unsubscribe();
  }
  }, [watch])
const onSubmit = (data) => {
  setValues(data)
  CreateMarker(data.name, data.latitude, data.longtitude, data.description, navigate);
}
function CreateMarker(name, latitude, longtitude, description, navigate) {

    axios.post(`${serverLaravel.url}/api/markers/create`,{
      name: name,
      lat: latitude,
      lng: longtitude,
      author: `kacperhaha`,
      description: description
    }, {headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.getItem('token')}`}}
)
    .then(function (response) {
      if(response.status === 200) {
        console.log(response)
        navigate(`/`);
  }
})
    .catch(function (reqerror) {
      console.log(reqerror);
        console.log(error)
    });
  }
return (
  <>
  <div className="absolute flex h-[44rem] w-[35rem] bg-white z-[200] top-0 right-0 bottom-0 rounded-xl left-0 m-auto items-center justify-center animate-SlideUp ">
  {/* add marker */}
  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-[75%]">
    <h1 className="text-3xl font-bold text-gray-700">Add Marker</h1>
    <div className="relative">
      <input type="text" placeholder="name" id="name" className={error?.css + " " + "placeholder:opacity-0 peer w-full h-10 pt-4 bg-[#f2f2f2] rounded-lg border-black border-[1px] pl-4 pr-4 text-[#00a3ff] font-bold text-base leading-5 pb-1 focus:outline-none"} {...register("name")} />
      <label htmlFor="username" className={error?.css + " " + "absolute text-[#6e7680] select-none placeholder-opacity-0 top-1 left-4 peer-focus:top-1 peer-placeholder-shown:top-[0.44rem] peer-placeholder-shown:text-xl peer-focus:text-xs font-bold text-xs transition-all"}>Name</label>
    </div>
    <div className="relative">
      <input type="text" placeholder="latitude" id="latitude" className={error?.css + " " + "placeholder:opacity-0 peer w-full h-10 pt-4 bg-[#f2f2f2] rounded-lg border-black border-[1px] pl-4 pr-4 text-[#00a3ff] font-bold text-base leading-5 pb-1 focus:outline-none"} {...register("latitude")} />
      <label htmlFor="username" className={error?.css + " " + "absolute text-[#6e7680] select-none placeholder-opacity-0 top-1 left-4 peer-focus:top-1 peer-placeholder-shown:top-[0.44rem] peer-placeholder-shown:text-xl peer-focus:text-xs font-bold text-xs transition-all"}>Latitude</label>
    </div>
    <div className="relative">
      <input type="text" placeholder="longtitude" id="longtitude" className={error?.css + " " + "placeholder:opacity-0 peer w-full h-10 pt-4 bg-[#f2f2f2] rounded-lg border-black border-[1px] pl-4 pr-4 text-[#00a3ff] font-bold text-base leading-5 pb-1 focus:outline-none"} {...register("longtitude")} />
      <label htmlFor="username" className={error?.css + " " + "absolute text-[#6e7680] select-none placeholder-opacity-0 top-1 left-4 peer-focus:top-1 peer-placeholder-shown:top-[0.44rem] peer-placeholder-shown:text-xl peer-focus:text-xs font-bold text-xs transition-all"}>Longtitude</label>
    </div>
    <div className="relative">
      <textarea type="text" placeholder="description" id="description" className={error?.css + " " + "placeholder:opacity-0 peer w-full h-24 pt-4 bg-[#f2f2f2] rounded-lg border-black border-[1px] pl-4 pr-4 text-[#00a3ff] font-bold text-base leading-5 pb-1 focus:outline-none"} {...register("description")} />
      <label htmlFor="username" className={error?.css + " " + "absolute text-[#6e7680] select-none placeholder-opacity-0 top-1 left-4 peer-focus:top-1 peer-placeholder-shown:top-[0.44rem] peer-placeholder-shown:text-xl peer-focus:text-xs font-bold text-xs transition-all resize-none bg-[#f2f2f2]"}>Description</label>
    </div>
    <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Add Marker</button>
  </form>
  </div>
    <div className="absolute h-screen w-screen z-[100] top-0 right-0 bg-black animate-FadeIn"></div>
    </>
    );
}