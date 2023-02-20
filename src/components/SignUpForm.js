import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState, useEffect } from "react";
import { ReactComponent as CloseIcon } from '../assets/svg/close-icon.svg';
import ServerLaravel from "../configs/general.config";
function RegisterAccount(email, username, password, navigate, Seterror) {
axios.post(`${ServerLaravel.url}/api/auth/register`, {
    email: email,
    username: username,
    password: password
  }, {headers: { 'Content-Type': 'application/json'}})
  .then(function (response) {
    console.log(response);
    if(response.status === 200) {
      console.log(response)
      sessionStorage.setItem('token', response.data.token);
      navigate(`/`);
}
  })
  .catch(function (error) {
    console.log(error)
    Seterror({status:error.response.status, message:error.response.data.message, css:"text-red-500"})
  });

}
export default function SignUpForm() {
const navigate = useNavigate();
const { register, handleSubmit, watch} = useForm();
const [error, Seterror] = useState()
const [datavalues, setValues] = useState("")
useEffect(() => {
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
  RegisterAccount(data.email, data.username, data.password, navigate, Seterror);
}

    return (
        <>
<div className="flex h-[30rem] w-96 bg-white absolute z-[200] top-0 right-0 bottom-0 rounded-xl left-0 m-auto items-center justify-center animate-SlideUp ">
  <div className="absolute top-0 right-0 m-4">
    <CloseIcon onClick={() => {navigate(`/`)}} className="cursor-pointer w-6 h-6" />
  </div>
  <div className="flex flex-col items-center justify-center animate-FadeIn">
    <span className="text-3xl font-bold text-center text-[#00a3ff]">Sign up</span>
    <form className="flex flex-col items-center justify-center mt-4 gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <input type="text" name="email" placeholder="email" id="email" className="placeholder:opacity-0 peer w-72 h-10 pt-4 bg-[#f2f2f2] rounded-lg border-black border-[1px] pl-4 pr-4 text-[#00a3ff] font-bold text-base leading-5 pb-1 focus:outline-none"  {...register("email")} />
        <label htmlFor="email" className="absolute text-[#6e7680] select-none placeholder-opacity-0 top-1 left-4 peer-focus:top-1 peer-placeholder-shown:top-[0.44rem] peer-placeholder-shown:text-xl peer-focus:text-xs font-bold text-xs transition-all">Email</label>
      </div>
      <div className="relative">
        <input type="text" placeholder="username" id="username" className="placeholder:opacity-0 peer w-72 h-10 pt-4 bg-[#f2f2f2] rounded-lg border-black border-[1px] pl-4 pr-4 text-[#00a3ff] font-bold text-base leading-5 pb-1 focus:outline-none"  {...register("username")} />
        <label htmlFor="username" className="absolute text-[#6e7680] select-none placeholder-opacity-0 top-1 left-4 peer-focus:top-1 peer-placeholder-shown:top-[0.44rem] peer-placeholder-shown:text-xl peer-focus:text-xs font-bold text-xs transition-all">Username</label>
      </div>
      <div className="relative">
        <input type="password" id="password" placeholder="Password" className="placeholder:opacity-0 peer w-72 h-10 pt-4 bg-[#f2f2f2] rounded-lg border-black border-[1px] pl-4 pr-4 text-[#00a3ff] font-bold text-base leading-5 pb-1 focus:outline-none"  {...register("password")} />
        <label htmlFor="password" className="absolute text-[#6e7680] select-none placeholder-opacity-0 top-1 left-4 peer-focus:top-1 peer-placeholder-shown:top-[0.44rem] peer-placeholder-shown:text-xl peer-focus:text-xs font-bold text-xs transition-all">Password</label>
      </div>
      {error?.css && <div className="bg-red-400 w-72 rounded-xl w-70 flex items-center justify-center p-2">
            {error?.css && <span className="text-white text-sm font-bold">{error.message}</span>}
          </div>}
      <button className="w-72 h-10 bg-[#00a3ff] rounded-xl shadow-2xl pl-4 text-white font-bold text-xl focus:outline-none mt-4 hover:bg-[#0091e6]">Sign up</button>
    </form>
    <span> Already have an account? <u onClick={() => {navigate(`/signin`)}}>Sign in</u></span>
  </div>
</div>
  <div className="h-screen w-screen absolute z-[100] top-0 right-0 bg-black animate-FadeIn"></div>
  </>
    )}
