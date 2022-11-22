import { useNavigate } from "react-router-dom";
const SigninButton = function() {
const navigate = useNavigate();
  return (
    <div className="w-36 h-10 bg-white rounded-full absolute z-50 top-4 right-4 shadow-2xl flex items-center justify-center">
  <span className="w-36 text-2xl font-bold text-center text-[#00a3ff] truncate" onClick={() => {navigate(`/lista`)}}>Sign in</span>
</div>  
  );
}
export {SigninButton};