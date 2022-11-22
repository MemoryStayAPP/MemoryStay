import { redirect, useNavigate , Navigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
export default function SignInForm() {
const navigate = useNavigate();
const { register, handleSubmit } = useForm();
const onSubmit = data => LogIn(data.username, data.password, navigate);
function LogIn(username, password, navigate) {
    axios.post('http://localhost:80/api/auth/login', {
      email: username.toLowerCase() || username,
      password: password
    })
    .then(function (response) {

      if(response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate(`/`);
  }})
    .catch(function (error) {
      console.log(error);
    });
  
  }
return (
  <>
  <div className="absolute flex h-[30rem] w-96 bg-white z-[200] top-0 right-0 bottom-0 rounded-xl left-0 m-auto items-center justify-center animate-SlideUp ">
      <div className="flex flex-col items-center justify-center animate-FadeIn">
        <span className="text-3xl font-bold text-center text-[#00a3ff]">Sign in</span>
        <form className="flex flex-col items-center justify-center mt-4 gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <input type="text" placeholder="username" id="username" className="placeholder:opacity-0 peer w-72 h-10 pt-2 bg-[#f2f2f2] rounded-lg border-black border-[1px] pl-4 text-[#00a3ff] font-bold text-lg focus:outline-none" {...register("username")} />
            <label htmlFor="username" className="text-[#6e7680] select-none placeholder-opacity-0 absolute left-4 peer-focus:top-0 peer-placeholder-shown:top-[0.44rem] peer-placeholder-shown:text-xl peer-focus:text-sm font-bold text-sm transition-all">Email</label>
          </div>
          <div className="relative">
            <input type="password" id="password" placeholder="Password" className="placeholder:opacity-0 peer w-72 h-10 pt-2 bg-[#f2f2f2] rounded-lg border-black border-[1px] pl-4 text-[#00a3ff] font-bold text-lg focus:outline-none" {...register("password")} />
            <label htmlFor="password" className="absolute text-[#6e7680] placeholder-opacity-0 left-4 peer-focus:top-0 peer-placeholder-shown:top-[0.44rem] peer-placeholder-shown:text-xl peer-focus:text-sm font-bold text-sm transition-all">Password</label>
          </div>
          <button className="w-72 h-10 bg-[#00a3ff] rounded-xl shadow-2xl pl-4 text-white font-bold text-xl focus:outline-none mt-4 hover:bg-[#0091e6] ">Sign in</button>
        </form>
        <span> Need an account?<u onClick={() => { navigate(`/signup`); } }>Sign up</u></span>
      </div>
    </div>
    <div className="absolute h-screen w-screen z-[100] top-0 right-0 bg-black animate-FadeIn"></div>
    </>
    );
}
