import React, { useState } from 'react';
import { dummyUserData, dummyPostsData } from '../assets/assets';
import { MapPin, Calendar, Verified, Edit } from 'lucide-react';
import Post from '../components/Post';
import ProfileEdit from '../components/ProfileEdit';
import '../css/profile-modern.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: dummyUserData.full_name,
    username: dummyUserData.username,
    bio: '🌍 Dreamer | 📚 Learner | 🚀 Doer Exploring life one step at a time. ✨ Staying curious. Creating with purpose.',
    location: 'New York, NY',
    profilePicture: dummyUserData.profile_picture,
    coverPhoto: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg"
  });

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveProfile = (updatedData) => {
    setProfileData(updatedData);
  };
  
  // Filter posts by type for different tabs
  const getFilteredPosts = () => {
    switch (activeTab) {
      case 'posts':
        return dummyPostsData;
      case 'media':
        return dummyPostsData.filter(post => post.image_urls && post.image_urls.length > 0);
      case 'likes':
        return dummyPostsData.filter(post => post.likes_count && post.likes_count.length > 0);
      default:
        return dummyPostsData;
    }
  };

  return (
    <div className="profile-page-container">
      {/* Profile Header Card */}
      <div className="profile-header-card">
        {/* Cover Photo */}
        <div className="profile-cover">
          <img 
            src={profileData.coverPhoto} 
            alt="Cover" 
            className="profile-cover-image"
          />
        </div>
        
        {/* Profile Info Section */}
        <div className="profile-info-section">
          {/* Profile Avatar */}
          <div className="profile-avatar-container">
            <img 
              src={profileData.profilePicture} 
              alt={`${profileData.name}'s avatar`}
              className="profile-avatar"
            />
          </div>
          
          {/* Profile Header Info */}
          <div className="profile-header-info">
            <div className="profile-name-section">
              <h1 className="profile-name">
                {profileData.name}
                {dummyUserData.is_verified && <Verified size={24} className="verified-badge" />}
              </h1>
              <p className="profile-handle">@{profileData.username}</p>
            </div>
            
            <button className="profile-edit-btn" onClick={handleEditProfile}>
              <Edit size={16} />
              Edit
            </button>
          </div>
          
          {/* Profile Bio */}
          <p className="profile-bio">
            {profileData.bio}
          </p>
          
          {/* Profile Meta Info */}
          <div className="profile-meta">
            <div className="profile-meta-item">
              <MapPin size={16} />
              <span>{profileData.location}</span>
            </div>
            <div className="profile-meta-item">
              <Calendar size={16} />
              <span>Joined 16 days ago</span>
            </div>
          </div>
          
          {/* Profile Stats */}
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="profile-stat-number">6</span>
              <span className="profile-stat-label">Posts</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-number">2</span>
              <span className="profile-stat-label">Followers</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-number">2</span>
              <span className="profile-stat-label">Following</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Navigation */}
      <div className="profile-navigation">
        <button 
          className={`profile-nav-btn ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
        <button 
          className={`profile-nav-btn ${activeTab === 'media' ? 'active' : ''}`}
          onClick={() => setActiveTab('media')}
        >
          Media
        </button>
        <button 
          className={`profile-nav-btn ${activeTab === 'likes' ? 'active' : ''}`}
          onClick={() => setActiveTab('likes')}
        >
          Likes
        </button>
      </div>
      
      {/* Posts Section */}
      <div className="profile-posts-section">
        {getFilteredPosts().map(post => (
          <Post key={post._id} post={post} />
        ))}
        
        {getFilteredPosts().length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#6A7282',
            fontFamily: 'Outfit, sans-serif'
          }}>
            No {activeTab} to show yet.
          </div>
        )}
      </div>

      {/* Profile Edit Modal */}
      <ProfileEdit 
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default Profile