import React from 'react'
import '../css/loading.css'

// Loading fills the height of its container by default.
// Optional props: className, style, label
const Loading = ({ className = '', style = {}, label = 'Loading...' }) => {
  return (
    <div className={`loading-wrapper ${className}`} style={{ height: '100%', ...style }}>
      <div className="loading-spinner" aria-label={label} />
    </div>
  )
}

export default Loading
