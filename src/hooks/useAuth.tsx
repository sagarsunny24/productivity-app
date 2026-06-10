// import { useEffect, useState } from "react";
// import { type Credential } from "../types/index";

// export default function useAuth() {
// const [accessToken, setAccessToken] = useState<string>("");

// useEffect(()=>{
//   console.log("Inside useEffect",accessToken)
// },[accessToken]) // this is also not working
//   async function login({ username, password }:Credential) : Promise<number | true>{
//     try {
//       const res = await fetch("http://localhost:3000/auth", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ user: username, pwd: password }),
//       });

//       if (!res.ok) {
//         setAccessToken('');
//         return res.status;
//         // if(res.status === 404){

//         // }
//       } else {
//         const data = await res.json();
//         console.log(data.accessToken); // this is working
//           setAccessToken(data.accessToken);
//           console.log(accessToken) // this is not working , i think some typescript issue is happening
//           localStorage.setItem("rtoken", data.refreshToken);
//         return true;
//       }
//     } catch (err) {
//       console.log(err)
//       return 500
//     }
//   }
//   async function logout() {
//     setAccessToken('');
//     localStorage.removeItem('rtoken')
//   }

//   async function register({ username, password }:Credential) : Promise<number | true> {
//     try {
//       const res = await fetch("http://localhost:3000/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ user: username, pwd: password }),
//       });
//       if (!res.ok) {
//         return res.status;
//       } else {
//         return true;
//       }
//     } catch (error) {
//       console.log(error)
//       return 500;
//     }
//   }
//   return { accessToken, register, login, logout };
// }
