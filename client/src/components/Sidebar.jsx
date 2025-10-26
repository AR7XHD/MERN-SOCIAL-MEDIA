import React, { useState } from 'react'
import { UserButton, useUser, useClerk } from '@clerk/clerk-react'
import { LogOut } from 'lucide-react'
import { assets } from '../assets/assets'
import MenuItems from './MenuItems'
import '../css/sidebar.css'
import Loading from './Loading'

const Sidebar = () => {
  const {signOut} = useClerk()
  const [open, setOpen] = useState(false)
  const { isLoaded, user } = useUser()

  const closeIfMobile = () => {
    // Close the drawer on small screens after navigation
    setOpen(false)
  }

  // Show a purple spinner sized to the sidebar while Clerk loads or user is missing
  if (!isLoaded || !user) {
    return (
      <>
        <aside className="sidebar">
          <Loading />
        </aside>
      </>
    )
  }

  return (
    <>
    {/* Hamburger button (mobile only) */}
    <button
      className={`hamburger ${open ? 'active' : ''}`}
      aria-label={open ? 'Close menu' : 'Open menu'}
      onClick={() => setOpen(!open)}
    >
      <span className="bar bar1" />
      <span className="bar bar2" />
      <span className="bar bar3" />
    </button>

    {/* Overlay for mobile */}
    <div className={`sidebar-overlay ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />

    <aside className={`sidebar ${open ? 'open' : ''}`}>
      {/* Header */}
      <div className="sidebar-header">
        <img src={assets.favicon} alt="Linkora" style={{ height: 24, width: 24 }} />
        <span className="sidebar-brand">Linkora</span>
      </div>
      <div className="sidebar-sep" />

      {/* Menu */}
      <MenuItems onItemClick={closeIfMobile} />

      {/* Footer / User */}
      <div className="sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: { width: 32, height: 32 },
              },
            }}
          />
          <div className="user-meta">
            <div className="user-name">{user?.fullName || user?.firstName || 'User'}</div>
            <div className="user-username">@{user?.username || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || 'user'}</div>
          </div>
        </div>
        <button className="signout-btn" title="Sign out" onClick={() => signOut()}> 
          <LogOut size={18} />
        </button>
      </div>
    </aside>
    </>
  )
}

export default Sidebar