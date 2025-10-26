import React from 'react';
import { NavLink } from 'react-router-dom';
import { menuItemsData } from '../assets/assets';

const MenuItems = ({ onItemClick }) => {
  // Ensure the feed route points to /feed to match App.jsx
  const items = menuItemsData.map((it) => (
    {...it}
  ));

  return (
    <nav className="menu">
      {items.map(({ to, label, Icon }) => (
        <NavLink
          key={label}
          to={to}
          className={({ isActive }) =>
            `menu-item ${isActive ? 'menu-item-active' : ''}`
          }
          onClick={onItemClick}
        >
          <span className="menu-icon">{Icon ? <Icon size={18} /> : null}</span>
          <span className="menu-label">{label}</span>
        </NavLink>
      ))}
      <NavLink to="/create-post" className="create-post-btn" onClick={onItemClick}>
        <span className="create-post-icon">+</span>
        <span>Create Post</span>
      </NavLink>
    </nav>
  );
};

export default MenuItems;
