import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Portfolio() {
  return (
    <div>
      This is the portfolio page

      <Outlet />
    </div>
  )
}
