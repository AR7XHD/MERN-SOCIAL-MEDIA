import React from 'react';
import { Heart, MessageCircle, Share2, Verified } from 'lucide-react';
import '../css/Post.css';

import moment from 'moment';

const Post = ({ post }) => {
  // Function to parse content and wrap hashtags in a styled span
  const renderContentWithHashtags = (content) => {
    const hashtagRegex = /#(\w+)/g;
    const parts = content.split(hashtagRegex);

    return parts.map((part, index) => {
      if (index % 2 === 1) { // Every odd index is a hashtag
        return <span key={index} className="hashtag">#{part}</span>;
      }
      return part; // Even indices are regular text
    });
  };
  // Fallback in case post prop is not provided
  if (!post) {
    return <div className="post-card">Error: Post data is missing.</div>;
  }
  return (
    <div className="post-card">
      <div className="post-header">
        <img src={post.user.profile_picture} alt={`${post.user.full_name}'s avatar`} className="post-avatar" />
        <div className="post-user-info">
          <div className="post-user-name-verified">
            <span className="post-user-name">{post.user.full_name}</span>
            {post.user.is_verified && <Verified size={16} className="verified-badge" />}
          </div>
          <span className="post-user-handle">{`@${post.user.username} • ${moment(post.createdAt).fromNow()}`}</span>
        </div>
      </div>

      <div className="post-content">
        <p>{renderContentWithHashtags(post.content)}</p>
      </div>

      {post.image_urls && post.image_urls.length > 0 && (
        <div className="post-image-container">
          <img src={post.image_urls[0]} alt="Post content" className="post-image" />
        </div>
      )}

      <div className="post-footer">
        <div className="post-actions">
          <div className="post-action">
            <Heart size={16} />
            <span>{post.likes_count.length}</span>
          </div>
          <div className="post-action">
            <MessageCircle size={16} />
            <span>{post.comments_count || 0}</span>
          </div>
          <div className="post-action">
            <Share2 size={16} />
            <span>{post.shares_count || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
