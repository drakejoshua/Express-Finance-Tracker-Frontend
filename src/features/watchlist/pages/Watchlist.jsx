import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Watchlist() {
  return (
    <div>
      This is the watchlist page

      <Outlet />
    </div>
  )
}
