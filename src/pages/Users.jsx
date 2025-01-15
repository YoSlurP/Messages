import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

function Users({db}) {

    const [users, setUsers]=useState([]);

    useEffect(()=>{
      async function getUsers() {
        const snap = await getDocs(query(collection(db, "users"),orderBy("nev")));
        setUsers(snap.docs.map(doc => ({ ...doc.data(), id:doc.id })));
      }
        getUsers();
    },[])

  return (
    <div className='users'>
        {users.map(x=> <li key={x.id}>{x.nev} ({x.email})</li>)}
    </div>
  )
}

export default Users
