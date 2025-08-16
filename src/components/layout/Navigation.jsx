

// components/layout/Navigation.jsx - Navigation refactorisée
import React from 'react';
import { Home, Search, Plus, Smile, User } from 'lucide-react';

const Navigation = ({ activeTab, onTabChange, onCreateClick }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Accueil' },
    { id: 'search', icon: Search, label: 'Recherche' },
    { id: 'create', icon: Plus, label: 'Créer', isSpecial: true },
    { id: 'my-moodups', icon: Smile, label: 'Mes MoodUps' },
    { id: 'profile', icon: User, label: 'Profil' }
  ];

  const handleTabClick = (tabId) => {
    if (tabId === 'create') {
      onCreateClick();
    } else {
      onTabChange(tabId);
    }
  };

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 px-4 py-4 rounded-t-3xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`flex items-center justify-center p-3 rounded-2xl transition-all duration-300 ${
              item.isSpecial 
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg transform scale-105' 
                : ''
            }`}
            title={item.label}
          >
            <item.icon 
              size={22} 
              className={`transition-all duration-300 ${
                item.isSpecial
                  ? 'text-white'
                  : activeTab === item.id
                  ? 'text-purple-600 transform scale-110'
                  : 'text-gray-400'
              }`}
              strokeWidth={activeTab === item.id || item.isSpecial ? 2.5 : 2}
            />
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;