import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const layout = () => {
  return (
    <div>
      <Sidebar />
      <main className="with-sidebar lg:mt-0 mt-10">
        <Outlet />
      </main>
    </div>
  )
}

export default layout