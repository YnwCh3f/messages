import { useState } from 'react'
import './App.css'
import Messages from "./pages/Messages/Messages.jsx";
import Users from  "./pages/Users/Users.jsx";
import About from "./pages/About/About.jsx";
import Notfound from "./pages/Notfound/Notfound.jsx";
import Login from "./pages/Login/Login.jsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../firebaseConfig.js";
import Layout from './Layout/Layout.jsx';
import { useEffect } from 'react';

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);



const logout = async () => {
  await signOut(auth);
}


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe;
  }, []);

  const router = createBrowserRouter([
    { path: "/", element: <Layout auth={auth} logout={logout} user={user} />, children:[
      { path: "/", element: <Messages user={user} db={db} /> },
      { path: "/users", element: <Users db={db} /> },
      { path: "/about", element: <About /> },
      { path: "/login", element: <Login auth={auth} /> },
      { path: "*", element: <Notfound /> }
    ] }
  ]);

  return (
    <div className='app'>
       <RouterProvider router={router} />
    </div>
  )
}

export default App
