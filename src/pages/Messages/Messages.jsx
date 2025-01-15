import React from 'react'
import "./Messages.css";
import { addDoc, collection, onSnapshot, or, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, TextField } from '@mui/material';

const Messages = ({ user, db }) => {

  const [messages, setMessages] = useState([]);
  const [kinek, setKinek] = useState("");
  const [uzenet, setUzenet] = useState("");

  useEffect(() => {
    if (user) {
    const unsub = onSnapshot(query(collection(db, "messages"), or(where("ki", "==", user.email), where("kinek", "==", user.email)), orderBy("mikor")), (snap) => {
      setMessages(snap.docs.map(doc => ({ ...doc.data(), id:doc.id })));
    });
    return unsub;
  }else setMessages([])
  },[user]);


  const send = async () => {
    await addDoc(collection(db, "messages"), {ki : user.email, kinek : kinek, uzenet : uzenet, mikor : Timestamp.now().toDate()});
  }

  return (
    <div className='messages'>
      {user ? <>
      <div className='uzenet'>
        <TextField
            size='small'
            required
            label="Címzett email"
            value={kinek}
            onChange={e => setKinek(e.target.value)}
          /><TextField
          size='small'
          required
          value={uzenet}
          onChange={e => setUzenet(e.target.value)}
          label="Üzenet"
        />
        <Button onClick={send} color='warning' variant="contained">Send</Button>
      </div>
      {messages.map(x => <p key={x.id}>{x.ki} - {x.kinek} : {x.uzenet} ({x.mikor.toDate().toDateString("hu-HU")})</p>)}
      </>
      : "Jelentkezz be!"}
    </div>
  )
}

export default Messages
