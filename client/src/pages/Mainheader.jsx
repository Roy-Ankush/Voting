import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

function Mainheader() {
  return (
    <div>
      <Navbar home="Home" candidate="Candidate" vote="Vote" result="Result" profile="Profile"/>
      <Outlet/>
    </div>
  )
}

export default Mainheader
