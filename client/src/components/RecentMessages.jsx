import React from 'react';
import { dummyRecentMessagesData } from '../assets/assets';
import moment from 'moment';
import '../css/RecentMessages.css';

const RecentMessages = () => {
  return (
    <div className="recent-messages-card">
      <h3 className="recent-messages-title">Recent Messages</h3>
      
      <div className="messages-container">
        {dummyRecentMessagesData.map((message) => (
          <div key={message._id} className="message-item">
            <img 
              src={message.from_user_id.profile_picture} 
              alt={`${message.from_user_id.full_name}'s avatar`}
              className="message-avatar"
            />
            
            <div className="message-content">
              <div className="message-header">
                <span className="message-user-name">{message.from_user_id.full_name}</span>
                <span className="message-time">{moment(message.createdAt).fromNow()}</span>
              </div>
              <p className="message-text">{message.text}</p>
            </div>
            
            {!message.seen && (
              <div className="unread-indicator">
                <span className="unread-count">1</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMessages;
