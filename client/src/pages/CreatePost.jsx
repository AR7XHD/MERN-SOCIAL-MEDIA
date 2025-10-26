import React, { useState } from 'react';
import { dummyUserData } from '../assets/assets';
import { Image, X } from 'lucide-react';
import '../css/createpost-modern.css';

const CreatePost = () => {
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  const maxCharacters = 280;
  const remainingChars = maxCharacters - postContent.length;

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById('image-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handlePublish = async () => {
    if (!postContent.trim() && !selectedImage) return;
    
    setIsPosting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form after successful post
      setPostContent('');
      setSelectedImage(null);
      setImagePreview(null);
      
      // Show success message (you can implement a toast notification here)
      alert('Post published successfully!');
      
    } catch (error) {
      console.error('Error publishing post:', error);
      alert('Failed to publish post. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  const isPublishDisabled = (!postContent.trim() && !selectedImage) || remainingChars < 0 || isPosting;

  const getCharCounterClass = () => {
    if (remainingChars < 0) return 'createpost-char-counter error';
    if (remainingChars < 20) return 'createpost-char-counter warning';
    return 'createpost-char-counter';
  };

  return (
    <div className="createpost-page-container">
      {/* Header */}
      <div className="createpost-header">
        <h1 className="createpost-title">Create Post</h1>
        <p className="createpost-subtitle">Share your thoughts with the world</p>
      </div>

      {/* Create Post Card */}
      <div className="createpost-card">
        {/* User Info */}
        <div className="createpost-user-info">
          <img 
            src={dummyUserData.profile_picture} 
            alt={`${dummyUserData.full_name}'s avatar`}
            className="createpost-avatar"
          />
          <div className="createpost-user-details">
            <h2>{dummyUserData.full_name}</h2>
            <p>@{dummyUserData.username}</p>
          </div>
        </div>

        {/* Textarea */}
        <div className="createpost-textarea-container">
          <textarea
            className="createpost-textarea"
            placeholder="What's happening?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            maxLength={maxCharacters + 50} // Allow slight overflow for warning
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="createpost-image-preview">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="createpost-preview-image"
            />
            <button 
              className="createpost-remove-image"
              onClick={removeImage}
              type="button"
            >
              <X size={12} />
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="createpost-actions">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="image-upload" className="createpost-media-btn">
              <Image size={24} />
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="createpost-file-input"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className={getCharCounterClass()}>
              {remainingChars}
            </span>
            <button 
              className="createpost-publish-btn"
              onClick={handlePublish}
              disabled={isPublishDisabled}
            >
              {isPosting ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost