import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
function RegisterAccount(email, username, password) {
axios.post('http://localhost:80/api/auth/register', {
    email: email,
    name: username,
    password: password
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

}


export default function SignUpForm() {
const navigate = useNavigate();
const { register, handleSubmit } = useForm();
const onSubmit = data => RegisterAccount(data.email, data.username, data.password);
    return (
        <>
<div className="flex h-[30rem] w-96 bg-white absolute z-[200] top-0 right-0 bottom-0 rounded-xl left-0 m-auto items-center justify-center animate-SlideUp ">
  <div className="flex flex-col items-center justify-center animate-FadeIn">
    <span className="text-3xl font-bold text-center text-[#00a3ff]">Sign up</span>
    <form className="flex flex-col items-center justify-center mt-4 gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <input type="text" name="email" placeholder="email" id="email" className="placeholder:opacity-0 peer w-72 h-10 pt-2 bg-[#f2f2f2] rounded-lg border-black border-[1px] pl-4 text-[#00a3ff] font-bold text-lg focus:outline-none"  {...register("email")} />
        <label htmlFor="email" className="text-[#6e7680] placeholder-opacity-0 absolute left-4 peer-focus:top-0 peer-placeholder-shown:top-[0.44rem] peer-placeholder-shown:text-xl peer-focus:text-sm font-bold text-sm transition-all">Email</label>
      </div>
      <div className="relative">
        <input type="text" placeholder="username" id="username" className="placeholder:opacity-0 peer w-72 h-10 pt-2 bg-[#f2f2f2] rounded-lg border-black border-[1px] pl-4 text-[#00a3ff] font-bold text-lg focus:outline-none"  {...register("username")} />
        <label htmlFor="username" className="text-[#6e7680] select-none placeholder-opacity-0 absolute left-4 peer-focus:top-0 peer-placeholder-shown:top-[0.44rem] peer-placeholder-shown:text-xl peer-focus:text-sm font-bold text-sm transition-all">Username</label>
      </div>
      <div className="relative">
        <input type="password" id="password" placeholder="Password" className="placeholder:opacity-0 peer w-72 h-10 pt-2 bg-[#f2f2f2] rounded-lg border-black border-[1px] pl-4 text-[#00a3ff] font-bold text-lg focus:outline-none"  {...register("password")} />
        <label htmlFor="password" className="text-[#6e7680] placeholder-opacity-0 absolute left-4 peer-focus:top-0 peer-placeholder-shown:top-[0.44rem] peer-placeholder-shown:text-xl peer-focus:text-sm font-bold text-sm transition-all">Password</label>
      </div>
      <button className="w-72 h-10 bg-[#00a3ff] rounded-xl shadow-2xl pl-4 text-white font-bold text-xl focus:outline-none mt-4 hover:bg-[#0091e6]">Sign up</button>
    </form>
    <span> Already have an account? <u onClick={() => {navigate(`/signin`)}}>Sing in</u></span>
  </div>
</div>
  <div className="h-screen w-screen absolute z-[100] top-0 right-0 bg-black animate-FadeIn"></div>
  </>
    )}
