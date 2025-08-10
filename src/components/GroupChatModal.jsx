// components/GroupChatModal.jsx - Messagerie de groupe pour MoodUps
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Smile } from 'lucide-react';

const GroupChatModal = ({ activity, currentUser, isOrganizer, onClose }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  // Simulation des messages du groupe
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Marie',
      text: 'Salut tout le monde ! Hâte de vous rencontrer 😊',
      timestamp: '14:30',
      isMe: true
    },
    {
      id: 2,
      sender: 'Jules',
      text: 'Pareil ! J\'ai quelques idées de projets à discuter 🚀',
      timestamp: '14:32',
      isMe: false,
      avatar: 'J'
    },
    {
      id: 3,
      sender: 'Alex',
      text: 'Super ! J\'apporte mon carnet de sketches pour prendre des notes 📝',
      timestamp: '14:35',
      isMe: false,
      avatar: 'A'
    },
    {
      id: 4,
      sender: 'Sophie',
      text: 'Génial ! À tout à l\'heure alors 👋',
      timestamp: '14:40',
      isMe: false,
      avatar: 'S'
    }
  ]);

  // Emojis populaires
  const popularEmojis = ['😊', '😄', '🤝', '👍', '❤️', '🎉', '🚀', '💡', '☕', '🎨', '📝', '👋', '🔥', '✨', '🌟', '💪'];

  // Scroll automatique vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Envoyer un message
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: currentUser,
        text: message,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      setShowEmojiPicker(false);
    }
  };

  // Ajouter un emoji
  const addEmoji = (emoji) => {
    setMessage(message + emoji);
    setShowEmojiPicker(false);
  };

  // Participants simulés
  const participants = [
    { name: 'Marie', avatar: 'M', isOrganizer: true },
    { name: 'Jules', avatar: 'J', isOrganizer: false },
    { name: 'Alex', avatar: 'A', isOrganizer: false },
    { name: 'Sophie', avatar: 'S', isOrganizer: false }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md h-[85vh] flex flex-col overflow-hidden shadow-lg">
        {/* Header épuré */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-xl">{activity.title}</h3>
            <p className="text-sm opacity-90">{participants.length} participants</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white bg-opacity-30 flex items-center justify-center hover:bg-opacity-40 transition-all"
          >
            <X size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Participants avec scroll horizontal */}
        <div className="bg-gray-50 px-6 py-4 pb-6">
          <div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {participants.map((participant, i) => (
              <div key={i} className="flex items-center space-x-2 bg-white rounded-full px-3 py-1 border border-gray-200 whitespace-nowrap flex-shrink-0">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{participant.avatar}</span>
                </div>
                <span className="text-sm text-gray-700 font-medium">{participant.name}</span>
                {participant.isOrganizer && (
                  <span className="text-sm">👑</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Messages épurés */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 mb-2">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              {!msg.isMe && (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-xs font-bold">{msg.avatar}</span>
                </div>
              )}
              <div className={`max-w-[75%] ${msg.isMe ? 'order-1' : 'order-2'}`}>
                {!msg.isMe && (
                  <p className="text-xs text-gray-500 mb-1 ml-1 font-medium">{msg.sender}</p>
                )}
                <div className={`rounded-2xl px-4 py-3 ${
                  msg.isMe 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                <p className={`text-xs text-gray-400 mt-1 ${msg.isMe ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Sélecteur d'emojis épuré */}
        {showEmojiPicker && (
          <div className="bg-white border-t px-6 py-4">
            <div className="grid grid-cols-8 gap-3">
              {popularEmojis.map((emoji, i) => (
                <button
                  key={i}
                  onClick={() => addEmoji(emoji)}
                  className="w-10 h-10 text-xl hover:bg-gray-100 rounded-xl transition-colors flex items-center justify-center"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Zone de saisie simplifiée */}
        <div className="bg-white px-6 py-5">
          <div className="flex items-center bg-gray-100 rounded-full">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Écrivez votre message..."
              className="flex-1 bg-transparent px-5 py-3 focus:outline-none text-gray-800 placeholder-gray-500"
            />
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className={`w-11 h-11 rounded-full flex items-center justify-center mr-1 transition-all ${
                message.trim()
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChatModal;