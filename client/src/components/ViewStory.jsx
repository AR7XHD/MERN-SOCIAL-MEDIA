import React, { useState, useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import '../css/viewStory.css'

const ViewStory = ({ story, isOpen, onClose }) => {
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const videoRef = useRef(null)
  const intervalRef = useRef(null)
  const startTimeRef = useRef(null)

  const currentStory = story
  
  // Duration based on content type
  const getDuration = (story) => {
    if (story.media_type === 'video' && videoRef.current && videoRef.current.duration) {
      return videoRef.current.duration * 1000 // Convert to milliseconds
    }
    return 10000 // 10 seconds for text and images
  }

  const startProgress = () => {
    if (!currentStory || isPaused) return
    
    const duration = getDuration(currentStory)
    if (!duration || duration <= 0) return
    
    startTimeRef.current = Date.now()
    
    intervalRef.current = setInterval(() => {
      if (isPaused) return // Don't update if paused
      
      const elapsed = Date.now() - startTimeRef.current
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      
      if (newProgress >= 100) {
        setProgress(100)
        setTimeout(() => onClose(), 100) // Small delay to show 100%
      } else {
        setProgress(newProgress)
      }
    }, 50) // Update every 50ms for smooth animation
  }

  const stopProgress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const resetProgress = () => {
    setProgress(0)
    stopProgress()
  }

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current && currentStory.media_type === 'video' && isOpen) {
      // Ensure video is ready and start progress
      setTimeout(() => {
        if (!isPaused) {
          startProgress()
        }
      }, 100)
    }
  }

  const handleVideoEnded = () => {
    onClose() // Close when video ends
  }

  // Handle story changes
  useEffect(() => {
    if (isOpen && currentStory) {
      resetProgress();
      setIsPaused(false);

      if (currentStory.media_type === 'video') {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(error => console.error("Video play failed:", error));
        }
      } else {
        setTimeout(() => startProgress(), 50);
      }
    }

    return () => {
      stopProgress();
    };
  }, [isOpen, currentStory]);

  // Handle pause/resume properly
  useEffect(() => {
    if (!isOpen || !currentStory) return
    
    if (isPaused) {
      stopProgress()
    } else {
      // Resume progress from current position
      if (progress < 100) {
        const duration = getDuration(currentStory)
        const remainingDuration = duration * (1 - progress / 100)
        startTimeRef.current = Date.now() - (duration - remainingDuration)
        
        if (!intervalRef.current) {
          startProgress()
        }
      }
    }
  }, [isPaused, isOpen])

  // Handle pause/resume on click
  const handleStoryClick = (e) => {
    // Don't pause if clicking on navigation areas
    if (e.target.closest('.story-nav') || e.target.closest('.story-controls')) {
      return
    }

    if (currentStory.media_type === 'video' && videoRef.current) {
      if (isPaused) {
        videoRef.current.play()
        setIsPaused(false)
        startProgress()
      } else {
        videoRef.current.pause()
        setIsPaused(true)
        stopProgress()
      }
    } else {
      if (isPaused) {
        setIsPaused(false)
        startProgress()
      } else {
        setIsPaused(true)
        stopProgress()
      }
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case ' ':
          e.preventDefault()
          handleStoryClick({ target: {} })
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [isOpen, isPaused])

  if (!isOpen || !currentStory) return null

  return (
    <div className="view-story-overlay" onClick={onClose}>
      <div className="view-story-container" onClick={(e) => e.stopPropagation()}>
        {/* Progress Bar */}
        <div className="story-progress-container">
          <div className="story-progress-bar">
            <div 
              className="story-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Story Header */}
        <div className="story-header">
          <div className="story-user-info">
            <img 
              src={currentStory.user.profile_picture} 
              alt={currentStory.user.full_name}
              className="story-user-avatar"
            />
            <div className="story-user-details">
              <span className="story-user-name">{currentStory.user.full_name}</span>
              <span className="story-time">
                {new Date(currentStory.createdAt).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
          
          <button className="story-close-btn story-controls" onClick={onClose}>
            <X size={24} color="#FFFFFF" />
          </button>
        </div>

        {/* Story Content */}
        <div className="story-content" onClick={handleStoryClick}>
          {currentStory.media_type === 'text' && (
            <div 
              className="story-text-content"
              style={{ backgroundColor: currentStory.background_color || '#4F46E5' }}
            >
              <p className="story-text">{currentStory.content}</p>
            </div>
          )}

          {currentStory.media_type === 'image' && (
            <div className="story-image-content">
              <img 
                src={currentStory.media_url} 
                alt="Story content"
                className="story-image"
              />
            </div>
          )}

          {currentStory.media_type === 'video' && (
            <div className="story-video-content">
              <video 
                ref={videoRef}
                src={currentStory.media_url}
                className="story-video"
                autoPlay
                muted
                onLoadedMetadata={handleVideoLoadedMetadata}
                onEnded={handleVideoEnded}
              />
            </div>
          )}

          {/* Pause Indicator - Removed as requested */}
        </div>

        {/* Navigation removed - single story view */}
      </div>
    </div>
  )
}

export default ViewStory
