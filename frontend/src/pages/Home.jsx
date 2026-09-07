import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'

export default function Home() {
  return (
    <div className='flex min-h-screen bg-creme'>
      <Sidebar />
      <div className='flex-1 overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  )
}