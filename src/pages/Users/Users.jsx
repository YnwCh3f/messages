import React from 'react'
import "./Users.css";
import { useState } from 'react';
import { useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

const Users = ({ db }) => {
const [users, setUsers] = useState([]);

useEffect(() => {
  const getUsers = async () => {
    const snap = await getDocs(query(collection(db, "users"), orderBy("nev")));
    setUsers(snap.docs.map(doc => ({ ...doc.data(), id : doc.id })));
  }
  getUsers();
}, []);

  return (
    <div className='users'>
      <ul>
        {users.map(x => <li key={x.id}>{x.nev} ({x.email})</li>)}
      </ul>
    </div>
  )
}

export default Users
