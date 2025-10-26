import React from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyConnectionsData } from '../assets/assets';
import { MessageSquare, Eye } from 'lucide-react';
import '../css/messages.css';

const Messages = () => {
  const navigate = useNavigate();

  const handleStartChat = (userId) => {
    navigate(`/messages/${userId}`);
  };

  return (
    <div className="messages-page-container">
      <div className="messages-header">
        <h1 className="messages-title">Messages</h1>
        <p className="messages-subtitle">Talk to your friends and family</p>
      </div>

      <div className="message-list-container">
        {dummyConnectionsData.map(user => (
          <div key={user._id} className="message-user-card">
            <div className="card-main-content">
              <img src={user.profile_picture} alt={`${user.full_name}'s avatar`} className="card-avatar" />
              <div className="card-user-details">
                <span className="card-user-name">{user.full_name}</span>
                <span className="card-user-handle">@{user.username}</span>
                <p className="card-user-bio">{user.bio}</p>
              </div>
            </div>
            <div className="card-action-buttons">
              <button 
                className="action-button"
                onClick={() => handleStartChat(user._id)}
                title="Start Chat"
              >
                <MessageSquare size={16} />
              </button>
              <button className="action-button" title="View Profile">
                <Eye size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;