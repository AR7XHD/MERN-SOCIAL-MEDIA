import React, { useState } from 'react'
import { X, Type, Image, Video, Plus } from 'lucide-react'
import '../css/storyModal.css'

const StoryModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('text') // 'text' or 'media'
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [selectedColor, setSelectedColor] = useState('#4F46E5')

  const colors = [
    '#4F46E5', // indigo
    '#7C3AED', // violet
    '#DB2777', // pink
    '#E11D48', // rose
    '#CA8A04', // yellow
    '#0D9488', // teal
  ]

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setMode('media')
    }
  }

  const handleCreateStory = () => {
    // Handle story creation logic here
    console.log({
      mode,
      text,
      file,
      color: selectedColor
    })
    
    // Reset form
    setText('')
    setFile(null)
    setMode('text')
    setSelectedColor('#4F46E5')
    onClose()
  }

  const handleTextMode = () => {
    setMode('text')
    setFile(null)
  }

  const handleMediaMode = () => {
    setMode('media')
    document.getElementById('file-input').click()
  }

  if (!isOpen) return null

  return (
    <div className="story-modal-overlay" onClick={onClose}>
      <div className="story-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="story-modal-header">
          <button className="close-btn" onClick={onClose}>
            <X size={24} color="#FFFFFF" />
          </button>
          <h2 className="modal-title">Create Story</h2>
        </div>

        {/* Story Content Area */}
        <div 
          className="story-content-area"
          style={{ backgroundColor: mode === 'text' ? selectedColor : '#000000' }}
        >
          {mode === 'text' ? (
            <textarea
              className="story-textarea"
              placeholder="What's on your mind?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={200}
            />
          ) : (
            <div className="story-media-preview">
              {file && (
                file.type.startsWith('image/') ? (
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt="Story preview" 
                    className="story-image-preview"
                  />
                ) : file.type.startsWith('video/') ? (
                  <video 
                    src={URL.createObjectURL(file)} 
                    className="story-video-preview"
                    controls
                  />
                ) : null
              )}
            </div>
          )}
        </div>

        {/* Color Picker (only for text mode) */}
        {mode === 'text' && (
          <div className="color-picker">
            {colors.map((color) => (
              <button
                key={color}
                className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        )}

        {/* Mode Buttons */}
        <div className="mode-buttons">
          <button 
            className={`mode-btn ${mode === 'text' ? 'active' : ''}`}
            onClick={handleTextMode}
          >
            <Type size={18} color={mode === 'text' ? '#FFFFFF' : '#000000'} />
            <span>Text</span>
          </button>
          
          <button 
            className={`mode-btn ${mode === 'media' ? 'active' : ''}`}
            onClick={handleMediaMode}
          >
            <Image size={18} color={mode === 'media' ? '#FFFFFF' : '#000000'} />
            <span>Photo/Video</span>
          </button>
        </div>

        {/* Hidden File Input */}
        <input
          id="file-input"
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {/* Create Button */}
        <button className="create-story-btn" onClick={handleCreateStory}>
          <Plus size={18} />
          <span>Create Story</span>
        </button>
      </div>
    </div>
  )
}

export default StoryModal
