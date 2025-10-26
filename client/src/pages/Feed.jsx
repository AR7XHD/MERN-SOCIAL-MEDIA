import React from 'react'
import Stories from '../components/Stories';
import Post from '../components/Post';
import Sponsored from '../components/Sponsored';
import RecentMessages from '../components/RecentMessages';
import { dummyPostsData } from '../assets/assets';
import '../css/feed.css'

const Feed = () => {
  return (
    <div className="feed-layout">
      {/* Main Content Area */}
      <div className="feed-main">
        <Stories />
        
        {/* Posts will go here */}
        <div className="posts-container">
          {dummyPostsData.map(post => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="feed-sidebar hidden lg:block">
        <Sponsored />
        <RecentMessages />
      </div>
    </div>
  )
}

export default Feed