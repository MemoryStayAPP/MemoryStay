import axios from 'axios';
import { useEffect, useState } from 'react';

const Avatar = function() {
const [user, setUser] = useState({});
function GetUser() {
  axios.post('localhost:10000/api/auth/getuser',{
    token: sessionStorage.getItem('token'),
  },{
    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
}).then(function (response) {

    if(response.status === 200) {
      console.log(response)
      setUser(response.data.user);
}})
  .catch(function (error) {
    console.log(error);
  });
}
useEffect(() => {
GetUser()
}, []);
const firstletter = user.name?.charAt(0).toUpperCase();
  return (
<div className="w-10 h-10 bg-white rounded-full absolute z-50 top-4 right-4 shadow-2xl flex items-center justify-center">
  <span className="w-36 text-2xl font-bold text-center text-[#00a3ff]">{firstletter}</span>
</div>  
  );
}
export {Avatar}








