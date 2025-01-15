import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Admin({admin}) {
  return (
    <>
    {admin ?
      <div>
        
      </div>
    :<Navigate to="/" />}
    </>
    
  )
}


