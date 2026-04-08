import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div>
      This is the app layout

      <Outlet />
    </div>
  )
}
