import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProfileCard } from '../components/profileCard';
const Avatar = function() {
  const [toggle, setToggle] = useState(false);
const handleClick = () => {
  setToggle(!toggle);
  console.log(`ez`);
};
const [user, setUser] = useState({});
function GetUser() {
//   axios.post('http://localhost:80/api/auth/getuser',{
//     token: sessionStorage.getItem('token'),
//   },{
//     headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
// }).then(function (response) {

//     if(response.status === 200) {
//       console.log(response)
//       setUser(response.data.user);
// }})
//   .catch(function (error) {
//     console.log(error);
//   });
}
useEffect(() => {
GetUser()
}, []);
const firstletter = user.name?.charAt(0).toUpperCase();
  return (
    <><div onClick={() => handleClick()} className="w-10 h-10 bg-white rounded-full absolute z-50 top-4 right-4 shadow-2xl flex items-center justify-center cursor-pointer divide-solid  hover:outline-2 hover:outline-black">
      <span className="w-36 text-2xl font-bold text-center text-[#00a3ff] cursor-pointer hover:outline-2 hover:outline-black">{firstletter}</span>
    </div>
    {toggle && <ProfileCard user={user}/>}
</>
  );
}
export {Avatar}








