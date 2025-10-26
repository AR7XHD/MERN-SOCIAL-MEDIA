import React, { useState } from 'react'
import { dummyStoriesData } from '../assets/assets'
import { Plus } from 'lucide-react'
import moment from 'moment'
import StoryModal from './StoryModal'
import ViewStory from './ViewStory'
import '../css/stories.css'

const Stories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewStoryOpen, setIsViewStoryOpen] = useState(false)
  const [selectedStory, setSelectedStory] = useState(null)
  const formatTimeAgo = (dateString) => {
    return moment(dateString).fromNow()
  }

  const truncateText = (text, maxLength = 20) => {
    if (!text || text.length <= maxLength) return text
    return text.substring(0, maxLength) + '…'
  }

  return (
    <>
      <div className="stories-container">
        {/* Create Story Card */}
        <div className="story-card create-story-card" onClick={() => setIsModalOpen(true)}>
          <div className="create-story-icon">
            <Plus size={20} color="#FFFFFF" />
          </div>
          <span className="create-story-text">Create Story</span>
        </div>

      {/* Story Cards */}
      {dummyStoriesData.map((story, index) => (
        <div 
          key={story._id} 
          className="story-card"
          onClick={() => {
            setSelectedStory(story)
            setIsViewStoryOpen(true)
          }}
        >
          {story.media_type === 'image' && story.media_url && (
            <div 
              className="story-background story-image"
              style={{ backgroundImage: `url(${story.media_url})` }}
            />
          )}
          {story.media_type === 'video' && story.media_url && (
            <video
              src={`${story.media_url}#t=0.1`}
              className="story-background-video"
              preload="metadata"
              muted
              disablePictureInPicture
            />
          )}
          {story.media_type === 'text' && (
            <div 
              className="story-background story-texts "
              style={{ background: story.background_color || '#615FFF' }}
            />
          )}
          
          {/* User Avatar */}
          <div className="story-avatar">
            <img 
              src={story.user.profile_picture} 
              alt={story.user.full_name}
              className="avatar-img"
            />
          </div>

          {/* Story Content */}
          {story.content && (
            <div className="story-content">
              <span className="story-text-contents">
                {truncateText(story.content)}
              </span>
            </div>
          )}

          {/* Time Ago */}
          <div className="story-time">
            {formatTimeAgo(story.createdAt)}
          </div>
        </div>
      ))}
      </div>

      {/* Story Modal */}
      <StoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* View Story */}
      <ViewStory
        story={selectedStory}
        isOpen={isViewStoryOpen}
        onClose={() => setIsViewStoryOpen(false)}
      />
    </>
  )
}

export default Stories
