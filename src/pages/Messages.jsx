import React from 'react'
import { useState } from 'react';
import { onSnapshot,collection, query, where, orderBy, or, addDoc, Timestamp } from 'firebase/firestore';
import { useEffect } from 'react';
import { Button, TextField } from '@mui/material';

export default function Messages({user,db}) {

  const[messages,setMessages]=useState([]);
  const[kinek,setKinek]=useState("");
  const[uzenet,setUzenet]=useState("");
  const handleKeyDown = (e) => {
    // Az 'Enter' billentyű kódja 13
    if (e.key === 'Enter') {
      ujUzenet();
    }
  };

  useEffect(() => {
    if(user){
      const unsub = onSnapshot(query(collection(db, 'messages'),or(where("ki","==",user.email),where("kinek","==",user.email)),orderBy("mikor")), (snap) => {
        setMessages(snap.docs.map(doc => ({ ...doc.data(), id:doc.id })));
      });
      return unsub;
      
    }else{
      setMessages([]);
    }
  },[user]);

  async function ujUzenet() {
    await addDoc(collection(db,"messages"),{ki:user.email,kinek:kinek,uzenet:uzenet,mikor:Timestamp.now().toDate()})
    setKinek("");setUzenet("");
  }

  return (
    <div className='messages' onKeyDown={handleKeyDown}>
      {user?<><div className='uzenet'>
        <TextField
        required
        label="Címzett email"
        size='small'
        value={kinek}
        onChange={e=>setKinek(e.target.value)}
        />
        <TextField
        required
        label="Üzenet"
        size='small'
        value={uzenet}
        onChange={e=>setUzenet(e.target.value)}
      
        />
        <Button variant='contained' color='success'onClick={ujUzenet} >Küldés</Button>
        </div>
      
        {messages.map(x=><p key={x.id}>{x.ki} - {x.kinek} : {x.uzenet} ({x.mikor.toDate().toDateString()})</p>)}
      </>:"Jelentkezz be!"}
      
    </div>
  )
}

