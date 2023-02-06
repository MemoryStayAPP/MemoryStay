
export default function errorStatusMessage(error, Seterror, prevdata) {
let email;
let password;
console.log(error)
console.log(prevdata)
// if(error.hasOwnProperty('email')){
//     Seterror({...prevdata, emailcss:"!text-red-500 border-red-500"})
// }
// if(error.hasOwnProperty('password')){
//     Seterror({...prevdata, passwordcss:"!text-red-500 border-red-500"})
//     console.log(prevdata)
//     password = "text-red-500 border-red-500"
// }
return {email, password}
}

