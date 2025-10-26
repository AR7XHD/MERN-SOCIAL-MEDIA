import React, { useState } from 'react';
import { 
  dummyConnectionsData, 
  dummyFollowersData, 
  dummyFollowingData, 
  dummyPendingConnectionsData 
} from '../assets/assets';
import { Users, UserPlus, Clock, UserCheck, MessageSquare } from 'lucide-react';
import '../css/connections.css';
import '../css/connection-actions.css';

const Connections = () => {
  const [activeTab, setActiveTab] = useState('followers');

  const stats = {
    followers: dummyFollowersData.length,
    following: dummyFollowingData.length,
    pending: dummyPendingConnectionsData.length,
    connections: dummyConnectionsData.length
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'followers':
        return dummyFollowersData;
      case 'following':
        return dummyFollowingData;
      case 'pending':
        return dummyPendingConnectionsData;
      case 'connections':
        return dummyConnectionsData;
      default:
        return dummyFollowersData;
    }
  };

  return (
    <div className="connections-page-container">
      <div className="connections-header">
        <h1 className="connections-title">Connections</h1>
        <p className="connections-subtitle">Manage your network and discover new connections</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <span className="stat-number">{stats.followers}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.following}</span>
          <span className="stat-label">Following</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.connections}</span>
          <span className="stat-label">Connections</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs-container">
        <button 
          className={`filter-tab ${activeTab === 'followers' ? 'active' : ''}`}
          onClick={() => setActiveTab('followers')}
        >
          <Users size={16} />
          Followers
        </button>
        <button 
          className={`filter-tab ${activeTab === 'following' ? 'active' : ''}`}
          onClick={() => setActiveTab('following')}
        >
          <UserCheck size={16} />
          Following
        </button>
        <button 
          className={`filter-tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          <Clock size={16} />
          Pending
        </button>
        <button 
          className={`filter-tab ${activeTab === 'connections' ? 'active' : ''}`}
          onClick={() => setActiveTab('connections')}
        >
          <UserPlus size={16} />
          Connections
        </button>
      </div>

      {/* Connection Cards */}
      <div className="connections-list">
        {getCurrentData().map(user => (
          <div key={user._id} className="connection-card">
            <div className="connection-header">
              <img 
                src={user.profile_picture} 
                alt={`${user.full_name}'s avatar`} 
                className="connection-avatar"
              />
              <div className="connection-details">
                <span className="connection-name">{user.full_name}</span>
                <span className="connection-handle">@{user.username}</span>
              </div>
            </div>
            <p className="connection-bio">
              {user.bio ? user.bio.substring(0, 50) + '...' : '🌍 Dreamer | 📚 Learner | 🚀 D...'}
            </p>
            <div className="connection-actions">
              <button className="view-profile-btn">
                View Profile
              </button>
              {activeTab === 'following' && (
                <button className="secondary-btn">
                  Unfollow
                </button>
              )}
              {activeTab === 'pending' && (
                <button className="secondary-btn">
                  Accept
                </button>
              )}
              {activeTab === 'connections' && (
                <button className="secondary-btn">
                  <MessageSquare size={16} />
                  Message
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections