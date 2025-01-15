import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button, ButtonGroup, Chip } from '@mui/material'
import "../Menu/Menu.css";
import "./Layout.css";


const Layout = ({ user, logout, admin }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className='layout'>
        <div className='menu'>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button color={pathname == "/" ? "success" : "error"} onClick={() => navigate("/")}>Messages</Button>
        <Button color={pathname == "/users" ? "success" : "error"} onClick={() => navigate("/users")}>Users</Button>
        <Button color={pathname == "/about" ? "success" : "error"} onClick={() => navigate("/about")}>About</Button>
      </ButtonGroup>
      {admin ? "Admin" : ""}
      <div className='us'>

      {user 
        ? <>
        <img src={user.PhotoURL}/>
        <Chip label={user.email} variant="contained" />
            <Button 
            color={pathname == "/login" ? "success" : "error"}
            onClick={logout}
            variant='contained'>Logout</Button>
          </>
        : <Button 
        color={pathname == "/login" ? "success" : "error"}
        onClick={() => navigate("/login")} 
        variant='contained'>Login</Button>}
        </div>
    </div>
        <div className='page'>
            <Outlet user={user} />
        </div>
    </div>
  )
}

export default Layout
