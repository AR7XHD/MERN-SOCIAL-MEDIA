import React, { useState } from 'react';
import { dummyUserData } from '../assets/assets';
import '../css/profileedit-modern.css';

const ProfileEdit = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: dummyUserData.full_name,
    username: dummyUserData.username,
    bio: '🌍 Dreamer | 📚 Learner | 🚀 Doer Exploring life one step at a time. ✨ Staying curious. Creating with purpose.',
    location: 'New York, NY'
  });
  
  const [profilePicture, setProfilePicture] = useState(dummyUserData.profile_picture);
  const [coverPhoto, setCoverPhoto] = useState("https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call the onSave callback with updated data
      if (onSave) {
        onSave({
          ...formData,
          profilePicture,
          coverPhoto
        });
      }
      
      // Close the modal
      onClose();
      
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: dummyUserData.full_name,
      username: dummyUserData.username,
      bio: '🌍 Dreamer | 📚 Learner | 🚀 Doer Exploring life one step at a time. ✨ Staying curious. Creating with purpose.',
      location: 'New York, NY'
    });
    setProfilePicture(dummyUserData.profile_picture);
    setCoverPhoto("https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg");
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="profile-edit-overlay" onClick={handleOverlayClick}>
      <div className="profile-edit-modal">
        {/* Header */}
        <div className="profile-edit-header">
          <h1 className="profile-edit-title">Edit Profile</h1>
        </div>

        {/* Form */}
        <div className="profile-edit-form">
          {/* Profile Picture */}
          <div className="profile-edit-form-group">
            <label className="profile-edit-label">Profile Picture</label>
            <div className="profile-edit-picture-section">
              <img 
                src={profilePicture} 
                alt="Profile" 
                className="profile-edit-avatar"
              />
              <label htmlFor="profile-picture-input" className="profile-edit-picture-btn">
                Change Picture
              </label>
              <input
                id="profile-picture-input"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="profile-edit-file-input"
              />
            </div>
          </div>

          {/* Cover Photo */}
          <div className="profile-edit-form-group">
            <label className="profile-edit-label">Cover Photo</label>
            <div className="profile-edit-cover-section">
              <img 
                src={coverPhoto} 
                alt="Cover" 
                className="profile-edit-cover"
              />
              <label htmlFor="cover-photo-input" className="profile-edit-cover-btn">
                Change Cover
              </label>
              <input
                id="cover-photo-input"
                type="file"
                accept="image/*"
                onChange={handleCoverPhotoChange}
                className="profile-edit-file-input"
              />
            </div>
          </div>

          {/* Name */}
          <div className="profile-edit-form-group">
            <label className="profile-edit-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="profile-edit-input"
              placeholder="Enter your name"
            />
          </div>

          {/* Username */}
          <div className="profile-edit-form-group">
            <label className="profile-edit-label">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="profile-edit-input"
              placeholder="Enter your username"
            />
          </div>

          {/* Bio */}
          <div className="profile-edit-form-group">
            <label className="profile-edit-label">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="profile-edit-textarea"
              placeholder="Tell us about yourself..."
              rows={4}
            />
          </div>

          {/* Location */}
          <div className="profile-edit-form-group">
            <label className="profile-edit-label">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="profile-edit-input"
              placeholder="Enter your location"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="profile-edit-actions">
          <button 
            className="profile-edit-cancel-btn"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button 
            className="profile-edit-save-btn"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="profile-edit-loading">
                Saving...
              </div>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;