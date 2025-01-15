import React from 'react'
import "./Login.css";
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ auth, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    try{
      await signInWithEmailAndPassword(auth, email, password);
      setLoginError(false);
      setEmail(""); setPassword("");
      navigate("/");
    } catch (error){
      console.log(error.code);
      setLoginError(true);
    }
  }

  return (
    <div className='login'>
      <TextField
          error={loginError}
          required
          id="Email"
          label="Email"
          value={email}
          onChange={x => setEmail(x.target.value)}
          helperText={loginError ? "Hibás felhasználónév vagy jelszó." : " "}
        />
        <TextField
          error={loginError}
          required
          id="Email"
          label="Password"
          type="password"
          value={password}
          onChange={x => setPassword(x.target.value)}
        />
        <Button variant="outlined" onClick={login}>Login</Button>
    </div>
  )
}

export default Login
