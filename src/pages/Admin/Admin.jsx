import React from 'react'
import "./Admin.css";
import { Navigate } from 'react-router-dom';

const Admin = ({ admin }) => {
  return (
    <>    {admin
      ? <div className='admin'>
          Admin
        </div>
      : <Navigate to="/" />
    }
   </>
  )
}

export default Admin
