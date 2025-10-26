import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { dummyUserData } from '../assets/assets';
import { Image, Send } from 'lucide-react';
import '../css/chat-modern.css';

const Chat = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'image',
      content: 'https://images.pexels.com/photos/106341/pexels-photo-106341.jpeg',
      sender: 'other',
      timestamp: '10:10 AM'
    },
    {
      id: 2,
      type: 'text',
      content: 'This is a Samsung Tablet',
      sender: 'other',
      timestamp: '10:11 AM'
    },
    {
      id: 3,
      type: 'text',
      content: 'yah , this tablet is good',
      sender: 'me',
      timestamp: '10:44 AM'
    },
    {
      id: 4,
      type: 'text',
      content: 'you can purchase it from amazon',
      sender: 'me',
      timestamp: '10:10 AM'
    }
  ]);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'text',
        content: message.trim(),
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newMessage = {
          id: messages.length + 1,
          type: 'image',
          content: e.target.result,
          sender: 'me',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, newMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Mock user data for the chat partner
  const chatPartner = {
    name: 'John Warren',
    username: 'john_warren',
    avatar: dummyUserData.profile_picture
  };

  return (
    <div className="chat-page-container">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-header-user">
          <img 
            src={chatPartner.avatar} 
            alt={`${chatPartner.name}'s avatar`}
            className="chat-header-avatar"
          />
          <div className="chat-header-info">
            <h3>{chatPartner.name}</h3>
            <p>@{chatPartner.username}</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="chat-messages-container">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`message-bubble ${msg.sender === 'me' ? 'sent' : 'received'}`}
          >
            {msg.type === 'text' ? (
              <div className={`message-content ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                {msg.content}
              </div>
            ) : (
              <div className="message-image">
                <img src={msg.content} alt="Shared image" />
              </div>
            )}
            <div className={`message-timestamp ${msg.sender === 'me' ? 'sent' : 'received'}`}>
              {msg.timestamp}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="chat-input"
          />
          
          <button 
            className="chat-attachment-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="chat-file-input"
          />
          
          <button 
            className="chat-send-btn"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;