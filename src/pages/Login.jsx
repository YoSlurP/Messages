import { Button, TextField } from '@mui/material';
import React from 'react'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login({auth,setUser}) {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const[loginError,setLoginError]=useState(false);
    const handleKeyDown = (e) => {
      // Az 'Enter' billentyű kódja 13
      if (e.key === 'Enter') {
        login();
      }
    };

    const navigate= useNavigate();

    async function login() {
      try {
        await signInWithEmailAndPassword(auth,email,password)
        setLoginError(false)
        setEmail("");setPassword("");
        navigate("/",{replace:true})
      } catch (error) {
        console.log(error.code)
      }
    }
    

  return (
    <div className='login'onKeyDown={handleKeyDown} >
        <TextField
        error={loginError}
        required
        label="Email"
        value={email}
        onChange={e=> {setEmail(e.target.value);setLoginError(false)}}
        />
        <TextField
        error={loginError}
        required
        label="Password"
        type='password'
        value={password}
        onChange={e=>setPassword(e.target.value)}
        helperText={loginError?"Hibásfelhasználónév vagy jelszó":" "}
        />
        <Button variant='outlined' color='success' onClick={login}>Login</Button>
    </div>
  )
}
