import { Button, ButtonGroup } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <div className='menu'>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Link to="/">;<Button>Messages</Button></Link>
        <Link to="/users">;<Button>Users</Button></Link>
        <Link to="/about">;<Button>About</Button></Link>
      </ButtonGroup>
      <Link to="/login"><Button variant="contained">Login</Button></Link>
    </div>
  )
}
