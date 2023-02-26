import { useNavigate , Navigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState, useEffect } from "react";
import { ReactComponent as CloseIcon } from '../assets/svg/close-icon.svg'; 
import ErrorStatusMessage from "../utils/ErrorStatusCSS";
import serverLaravel from "../configs/general.config";
import { ReactComponent as ErrorIcon } from '../assets/svg/errors-icon.svg';
export default function SignInForm() {
const navigate = useNavigate();
const { register, handleSubmit, getValues, watch } = useForm();
const [errors, Seterror] = useState()
const [datavalues, setValues] = useState("")
useEffect(() => {
  const subscription = watch((data) => {
  // console.log(errors?.status)
  // console.log(data)
  if(datavalues != data) Seterror()
  })
  return () => {
  subscription.unsubscribe();
  }
  }, [watch])
const onSubmit = (data) => {
  setValues(data)
  LogIn(data.username, data.password, navigate);
}
function LogIn(username, password, navigate) {

    axios.post(`${serverLaravel.url}/api/auth/login`,{
      username: username.toLowerCase() || username,
      password: password  
    }, {headers: { 'Content-Type': 'application/json'}}
)
    .then(function (response) {
      if(response.status === 200) {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        navigate(`/`);
  }
})
    .catch(function (reqerror) {
      console.log(reqerror.response.data.message);
      let obj = {};
      if(reqerror.response.data.status === false && reqerror.response.data.message == "User Failed to login") { 
        Object.assign(obj,{user:{message:reqerror.response.data.message,
          status:reqerror.response.status}})
      }
      if(reqerror.response.data?.data?.hasOwnProperty('username')){
        Object.assign(obj,{username:{message:reqerror.response.data.data.username,
          status:reqerror.response.status}})
        }
        if(reqerror.response.data?.data?.hasOwnProperty('password')){
          Object.assign(obj,{password:{message:reqerror.response.data.data.password,
            status:reqerror.response.status}})
        }
        console.log(obj)
        Seterror(obj)
    });
  }
return (
  <>
  <div className="absolute flex h-[30rem] w-96 bg-white z-[200] top-0 right-0 bottom-0 rounded-xl left-0 m-auto items-center justify-center animate-SlideUp ">
  <div className="absolute top-0 right-0 m-4">
    <CloseIcon onClick={() => {navigate(`/`)}} className="cursor-pointer w-6 h-6 transition-all hover:scale-110" />
  </div>
      <div className="flex flex-col items-center justify-center animate-FadeIn">
        <span className="text-3xl font-bold text-center text-[#00a3ff]">Sign in</span>
        <form className="flex flex-col items-center justify-center mt-4 gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <input type="text" id="username" placeholder="username" className={`${errors?.username ? '!border-red-500' : ''} placeholder:opacity-0 peer w-72 h-10 pt-4 bg-[#f2f2f2] rounded-lg border-black border-[1px] pl-4 pr-4 text-[#00a3ff] font-bold text-base leading-5 pb-1 focus:outline-none`} {...register("username")} />
            <label htmlFor="username" className={`${errors?.username ? '!text-red-500' : ''} absolute text-[#6e7680] select-none placeholder-opacity-0 top-1 left-4 peer-focus:top-1 peer-placeholder-shown:top-[0.44rem] peer-placeholder-shown:text-xl peer-focus:text-xs font-bold text-xs transition-all`}>Email</label>
            {errors?.username && <div className="rounded-xl flex items-center justify-start w-full pl-2 pt-1 ">
            <ErrorIcon className="h-4 w-4 fill-red-500"/>
            {errors?.username && <span className="text-red-500 text-xs font-bold">{errors.username.message}</span>}
          </div>}
          </div>
         
          <div className="relative">
            <input type="password" id="password" placeholder="Password" className={`${errors?.password ? '!border-red-500' : ''} placeholder:opacity-0 peer w-72 h-10 pt-4 bg-[#f2f2f2] rounded-lg border-black border-[1px] pl-4 pr-4 text-[#00a3ff] font-bold text-base leading-5 pb-1 focus:outline-none`} {...register("password")} />
            <label htmlFor="password" className={`${errors?.password ? '!text-red-500' : ''} absolute text-[#6e7680] select-none placeholder-opacity-0 top-1 left-4 peer-focus:top-1 peer-placeholder-shown:top-[0.44rem] peer-placeholder-shown:text-xl peer-focus:text-xs font-bold text-xs transition-all`}>Password</label>
            {errors?.password && <div className="rounded-xl flex items-center justify-start w-full pl-2 pt-1 ">
            <ErrorIcon className="h-4 w-4 fill-red-500"/>
            {errors?.password && <span className="text-red-500 text-xs font-bold">{errors.password.message}</span>}
          </div>}
          </div>
          {errors?.user && <div className="bg-red-400 w-72 rounded-xl flex items-center justify-center p-2">
          <ErrorIcon className="h-4 w-4 fill-white"/>
            {errors?.user && <span className="text-white text-sm font-bold">{errors.user.message}</span>}
          </div>}
          <button className="w-72 h-10 bg-[#00a3ff] rounded-xl shadow-2xl pl-4 text-white font-bold text-xl focus:outline-none mt-2 hover:bg-[#0091e6] transition-all">Sign in</button>
        </form>
        <span> Need an account? <u onClick={() => { navigate(`/signup`); } }>Sign up</u></span>
      </div>
    </div>
    <div className="absolute h-screen w-screen z-[100] top-0 right-0 bg-black animate-FadeIn"></div>
    </>
    );
}