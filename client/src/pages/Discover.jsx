import React, { useState } from 'react';
import { dummyConnectionsData } from '../assets/assets';
import { Search, MapPin, UserPlus, MessageSquare, Plus } from 'lucide-react';
import '../css/discover-modern.css';

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [followingUsers, setFollowingUsers] = useState(new Set());

  const handleFollow = (userId) => {
    setFollowingUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const filteredUsers = dummyConnectionsData.filter(user =>
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.bio && user.bio.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="discover-page-container">
      <div className="discover-header">
        <h1 className="discover-title">Discover People</h1>
        <p className="discover-subtitle">Connect with amazing people and grow your network</p>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search people by name, username, bio, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* User Cards Grid */}
      <div className="discover-cards-grid">
        {filteredUsers.map(user => (
          <div key={user._id} className="discover-card">
            <img 
              src={user.profile_picture} 
              alt={`${user.full_name}'s avatar`}
              className="discover-avatar"
            />
            
            <div className="discover-user-info">
              <h3 className="discover-user-name">{user.full_name}</h3>
              <p className="discover-user-handle">@{user.username}</p>
              <p className="discover-user-bio">
                {user.bio ? user.bio.substring(0, 80) + '...' : '🌍 Dreamer | 📚 Learner | 🚀 Doer Exploring life one step at a time. ✨ Staying curious. Creating with purpose.'}
              </p>
            </div>

            <div className="discover-user-stats">
              <div className="discover-stat">
                <MapPin size={16} />
                <span>New York, NY</span>
              </div>
              <div className="discover-stat">
                <span>2</span>
                <span>Followers</span>
              </div>
            </div>

            <div className="discover-actions">
              <button 
                className={`discover-follow-btn ${followingUsers.has(user._id) ? 'following' : ''}`}
                onClick={() => handleFollow(user._id)}
              >
                <UserPlus size={16} />
                {followingUsers.has(user._id) ? 'Following' : 'Follow'}
              </button>
              <button className="discover-message-btn">
                {followingUsers.has(user._id) ? <MessageSquare size={20} /> : <Plus size={20} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover