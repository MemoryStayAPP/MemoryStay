import { useNavigate } from "react-router-dom";
const AddMarkerButton = function() {
const navigate = useNavigate();
  return (
<div className="w-8 h-8 bg-white rounded-xl absolute z-50 bottom-4 right-16 shadow-2xl flex items-center justify-center">
  <span className="w-36 text-xl font-bold text-center text-[#00a3ff] truncate" onClick={() => {navigate(`/addmarker`)}}>+</span>
</div>  
  );
}
export { AddMarkerButton };