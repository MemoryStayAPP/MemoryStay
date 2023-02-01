import { useNavigate } from "react-router-dom";
const SigninButton = function() {
const navigate = useNavigate();
  return (
<div className="w-28 h-8 bg-white rounded-xl absolute z-50 top-4 right-4 shadow-2xl flex items-center justify-center">
  <span className="w-36 text-xl font-bold text-center text-[#00a3ff] truncate" onClick={() => {navigate(`/signin`)}}>Sign in</span>
</div>  
  );
}
export {SigninButton};