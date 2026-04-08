import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Profile() {
  return (
    <div>
      This is the profile page

      <Outlet />
    </div>
  )
}
