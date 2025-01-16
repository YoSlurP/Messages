import './App.css'
import { useState } from 'react'

import Messages from './pages/Messages.jsx'
import Users from './pages/Users.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import Notfound from './pages/Notfound.jsx'
import Admin from './pages/Admin.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseConfig } from "../firebaseConfig.js";
import Layout from './Layout.jsx'
import { getFirestore } from 'firebase/firestore'
import { useEffect } from 'react'




export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth=getAuth(app);


export default function App() {
  const [user,setUser]=useState(null);
  const [admin,setAdmin]=useState(false)

  useEffect(()=>{
    const unsubscribe= onAuthStateChanged(auth,(currentUser)=> {
      setUser(currentUser)
      if(currentUser &&currentUser.email== "bela@gmail.com")setAdmin(true); else setAdmin(false);
    });
    return()=>unsubscribe
  },[]);
  async function logout() {
      await signOut(auth)
  }

  const router=createBrowserRouter([
    {path:"/", element:<Layout user={user} admin={admin} logout={logout}/>,children:[
      {path:"/",element: <Messages user={user} db={db}/>},
      {path:"/users",element: <Users db={db}/>},
      {path:"/about",element: <About/>},
      {path:"*",element: <Notfound/>},
      {path:"/admin", element:<Admin admin={admin}/>},
      {path:"/login",element: <Login auth={auth} setUser={setUser}/>}
    ]}
  ],{basename:"/messages/"})
  return (
    <div className='app'>
        <RouterProvider router={router}/>
    </div>
    
    
  )
}

