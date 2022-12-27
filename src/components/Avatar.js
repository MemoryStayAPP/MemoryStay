import axios from 'axios';
const Avatar = function() {
function GetUser() {
  axios.post('http://localhost:80/api/auth/getuser',{
    token: localStorage.getItem('token'),
  },{
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
}).then(function (response) {

    if(response.status === 200) {
      console.log(response)
}})
  .catch(function (error) {
    console.log(error);
  });
}
  return (
<div onClick={() => GetUser()} className="w-10 h-10 bg-white rounded-full absolute z-50 top-4 right-4 shadow-2xl flex items-center justify-center">
  <span className="w-36 text-2xl font-bold text-center text-[#00a3ff]"></span>
</div>  
  );
}
export {Avatar}








