// pages/SettingsPage.jsx - Page des paramètres et mentions légales
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bell, 
  Shield, 
  Moon, 
  Globe, 
  HelpCircle, 
  FileText, 
  Info,
  ChevronRight
} from 'lucide-react';

const SettingsPage = ({ onBack }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('Français');

  const settingsGroups = [
    {
      title: 'Préférences',
      items: [
        { 
          icon: Bell, 
          label: 'Notifications', 
          type: 'toggle',
          value: notifications,
          onChange: setNotifications,
          description: 'Recevoir les notifications push'
        }
      ]
    },
    {
      title: 'Confidentialité & Sécurité',
      items: [
        { 
          icon: Shield, 
          label: 'Confidentialité du profil', 
          type: 'navigate',
          description: 'Gérer la visibilité de vos informations'
        }
      ]
    },
    {
      title: 'Support & Légal',
      items: [
        { 
          icon: HelpCircle, 
          label: 'Centre d\'aide', 
          type: 'navigate',
          description: 'FAQ et support technique'
        },
        { 
          icon: FileText, 
          label: 'Conditions d\'utilisation', 
          type: 'navigate',
          description: 'Nos conditions générales d\'utilisation'
        },
        { 
          icon: Shield, 
          label: 'Politique de confidentialité', 
          type: 'navigate',
          description: 'Comment nous protégeons vos données'
        }
      ]
    },
    {
      title: 'Compte',
      items: [
        { 
          icon: FileText, 
          label: 'Supprimer mon compte', 
          type: 'navigate',
          description: 'Supprimer définitivement votre compte',
          danger: true
        }
      ]
    }
  ];

  const handleItemClick = (item) => {
    if (item.type === 'navigate') {
      console.log(`Navigate to: ${item.label}`);
      // Ici tu peux ajouter la navigation vers les pages spécifiques
      alert(`Ouverture de: ${item.label}`);
    }
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-purple-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Paramètres</h2>
        </div>
      </div>

      <div className="p-4">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              {group.title}
            </h3>
            
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {group.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div 
                    className={`p-4 flex items-center justify-between ${
                      item.type === 'navigate' ? 'cursor-pointer hover:bg-gray-50' : ''
                    } transition-colors`}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="flex items-center flex-1">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <item.icon size={18} className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {item.type === 'toggle' && (
                        <ToggleSwitch 
                          enabled={item.value} 
                          onChange={item.onChange}
                        />
                      )}
                      
                      {item.type === 'select' && (
                        <select 
                          value={item.value}
                          onChange={(e) => {
                            console.log('Language changed:', e.target.value);
                            alert(`Langue changée vers: ${e.target.value}`);
                          }}
                          className="bg-gray-100 border-0 rounded-lg px-3 py-1 text-sm font-medium text-gray-700"
                        >
                          {item.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      )}
                      
                      {item.type === 'navigate' && (
                        <ChevronRight size={18} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  {itemIndex < group.items.length - 1 && (
                    <div className="border-b border-gray-100 ml-16" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Version et Copyright */}
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl font-bold">M</span>
            </div>
            <h3 className="font-bold text-gray-900">MoodUp</h3>
            <p className="text-sm text-gray-500">Version 1.2.0</p>
            <p className="text-xs text-gray-400">© 2024 MoodUp. Tous droits réservés.</p>
            <p className="text-xs text-gray-400">Développé avec ❤️ pour connecter les communautés</p>
          </div>
        </div>

        {/* Bouton de déconnexion */}
        <div className="mt-6">
          <button 
            onClick={() => alert('Déconnexion...')}
            className="w-full py-4 text-center text-red-600 font-medium hover:bg-red-50 rounded-2xl transition-colors bg-white shadow-sm"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;