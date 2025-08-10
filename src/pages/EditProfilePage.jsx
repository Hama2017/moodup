import React, { useState, useRef } from 'react';
import { Camera, User, MessageSquare, MapPin, Flag, Search, Save, ArrowLeft, Edit3, X, Check } from 'lucide-react';

const EditProfile = ({ 
  initialData = {
    bio: "Passionnée de voyage et amateur de café ☕ Toujours prêt pour une nouvelle aventure !",
    emojis: ['🎨', '💭', '🌱', '🤝', '☕'],
    photo: null,
    ville: "Le Havre",
    paysOrigine: "France",
    name: "Marie Dupont",
    username: "marie.dupont"
  },
  onSave = () => {},
  onBack = () => {}
}) => {
  const [profileData, setProfileData] = useState(initialData);
  const [hasChanges, setHasChanges] = useState(false);
  const [searchCountry, setSearchCountry] = useState('');
  const fileInputRef = useRef(null);

  // Liste des emojis par catégories
  const emojiCategories = {
    visages: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕'],
    activites: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛼', '🛷', '⛸️', '🥌', '🎿', '⛷️', '🏂', '🪂', '🏋️‍♀️', '🏋️‍♂️', '🤸‍♀️', '🤸‍♂️', '⛹️‍♀️', '⛹️‍♂️', '🤺', '🤾‍♀️', '🤾‍♂️', '🏌️‍♀️', '🏌️‍♂️', '🧘‍♀️', '🧘‍♂️', '🏃‍♀️', '🏃‍♂️', '🚶‍♀️', '🚶‍♂️'],
    nourriture: ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐', '🥖', '🍞', '🥨', '🥯', '🧇', '🥞', '🧈', '🍯', '🥜', '🌰', '🍞', '🥓', '🍔', '🍟', '🌭', '🍕', '🥪', '🌮', '🌯', '🫔', '🥙', '🧆', '🥚', '🍳', '🥘', '🍲', '🫕', '🍿', '🧈', '🥛', '☕', '🫖', '🍵', '🧃', '🥤', '🧋', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', '🍾'],
    nature: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🪱', '🐛', '🦋', '🐌', '🐞', '🐜', '🪰', '🪲', '🪳', '🦟', '🦗', '🕷️', '🕸️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🪶', '🐾', '🐉', '🐲', '🌵', '🎄', '🌲', '🌳', '🌴', '🌱', '🌿', '☘️', '🍀', '🎍', '🪴', '🎋', '🍃', '🍂', '🍁', '🌾', '🌺', '🌻', '🌹', '🥀', '🌷', '🌸', '🌼', '🌻'],
    objets: ['⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭', '⏱️', '⏲️', '⏰', '🕰️', '⏳', '⌛', '📡', '🔋', '🔌', '💡', '🔦', '🕯️', '🪔', '🧯', '🛢️', '💸', '💵', '💴', '💶', '💷', '🪙', '💰', '💳', '💎', '⚖️', '🪜', '🧰', '🔧', '🔨', '⚒️', '🛠️', '⛏️', '🪚', '🔩', '⚙️', '🪤', '🧱', '⛓️', '🧲', '🔫', '💣', '🧨', '🪓', '🔪', '🗡️', '⚔️', '🛡️', '🚬', '⚰️', '🪦', '⚱️', '🏺', '🔮', '📿', '🧿', '💈', '⚗️', '🔭', '🔬', '🕳️', '🩹', '🩺', '💊', '💉', '🩸', '🧬', '🦠', '🧫', '🧪', '🌡️', '🧹', '🪣', '🧽', '🧴', '🛎️', '🔑', '🗝️', '🚪', '🪑', '🛋️', '🛏️', '🛌', '🧸', '🪆', '🖼️', '🪞', '🪟', '🛍️', '🛒', '🎁', '🎈', '🎏', '🎀', '🪄', '🪅', '🎊', '🎉', '🎎', '🏮', '🎐', '🧧', '✉️', '📩', '📨', '📧', '💌', '📥', '📤', '📦', '🏷️', '🪧', '📪', '📫', '📬', '📭', '📮', '📯', '📜', '📃', '📄', '📑', '🧾', '📊', '📈', '📉', '📰', '🗞️', '📓', '📔', '📒', '📕', '📗', '📘', '📙', '📚', '📖', '🔖', '🧷', '🔗', '📎', '📋', '📌', '📍', '📐', '📏', '🧮', '📝', '✏️', '🔍', '🔎', '🔏', '🔐', '🔒', '🔓'],
    other: ['🎨', '💭', '🌱', '🤝', '🎵', '🎭', '🎪', '🎬', '🎼', '🎹', '🥁', '🎸', '🎺', '🎷', '🪗', '🎻', '🪕', '🎤', '🎧', '🎮', '🚀', '✨', '💫', '⭐', '🌟', '💖', '💝', '🎯', '🏆', '🥇', '🎖️', '🏅']
  };

  // Liste des pays avec drapeaux emoji
  const countries = [
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'ES', name: 'Espagne', flag: '🇪🇸' },
    { code: 'IT', name: 'Italie', flag: '🇮🇹' },
    { code: 'DE', name: 'Allemagne', flag: '🇩🇪' },
    { code: 'GB', name: 'Royaume-Uni', flag: '🇬🇧' },
    { code: 'US', name: 'États-Unis', flag: '🇺🇸' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australie', flag: '🇦🇺' },
    { code: 'JP', name: 'Japon', flag: '🇯🇵' },
    { code: 'CN', name: 'Chine', flag: '🇨🇳' },
    { code: 'IN', name: 'Inde', flag: '🇮🇳' },
    { code: 'BR', name: 'Brésil', flag: '🇧🇷' },
    { code: 'MX', name: 'Mexique', flag: '🇲🇽' },
    { code: 'AR', name: 'Argentine', flag: '🇦🇷' },
    { code: 'MA', name: 'Maroc', flag: '🇲🇦' },
    { code: 'DZ', name: 'Algérie', flag: '🇩🇿' },
    { code: 'TN', name: 'Tunisie', flag: '🇹🇳' },
    { code: 'EG', name: 'Égypte', flag: '🇪🇬' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
    { code: 'ZA', name: 'Afrique du Sud', flag: '🇿🇦' },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
    { code: 'SN', name: 'Sénégal', flag: '🇸🇳' },
    { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
    { code: 'ML', name: 'Mali', flag: '🇲🇱' },
    { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
    { code: 'RU', name: 'Russie', flag: '🇷🇺' },
    { code: 'TR', name: 'Turquie', flag: '🇹🇷' },
    { code: 'PL', name: 'Pologne', flag: '🇵🇱' },
    { code: 'NL', name: 'Pays-Bas', flag: '🇳🇱' },
    { code: 'BE', name: 'Belgique', flag: '🇧🇪' },
    { code: 'CH', name: 'Suisse', flag: '🇨🇭' },
    { code: 'AT', name: 'Autriche', flag: '🇦🇹' },
    { code: 'SE', name: 'Suède', flag: '🇸🇪' },
    { code: 'NO', name: 'Norvège', flag: '🇳🇴' },
    { code: 'DK', name: 'Danemark', flag: '🇩🇰' },
    { code: 'FI', name: 'Finlande', flag: '🇫🇮' },
    { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
    { code: 'GR', name: 'Grèce', flag: '🇬🇷' },
    { code: 'IE', name: 'Irlande', flag: '🇮🇪' },
    { code: 'CZ', name: 'République Tchèque', flag: '🇨🇿' },
    { code: 'HU', name: 'Hongrie', flag: '🇭🇺' },
    { code: 'RO', name: 'Roumanie', flag: '🇷🇴' },
    { code: 'BG', name: 'Bulgarie', flag: '🇧🇬' },
    { code: 'HR', name: 'Croatie', flag: '🇭🇷' },
    { code: 'RS', name: 'Serbie', flag: '🇷🇸' },
    { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
    { code: 'KR', name: 'Corée du Sud', flag: '🇰🇷' },
    { code: 'TH', name: 'Thaïlande', flag: '🇹🇭' },
    { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
    { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
    { code: 'ID', name: 'Indonésie', flag: '🇮🇩' },
    { code: 'MY', name: 'Malaisie', flag: '🇲🇾' },
    { code: 'SG', name: 'Singapour', flag: '🇸🇬' },
    { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
    { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
    { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰' }
  ];

  const allEmojis = Object.values(emojiCategories).flat();
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchCountry.toLowerCase())
  );

  const updateProfileData = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleEmojiSelect = (emoji) => {
    if (profileData.emojis.includes(emoji)) {
      updateProfileData('emojis', profileData.emojis.filter(e => e !== emoji));
    } else if (profileData.emojis.length < 5) {
      updateProfileData('emojis', [...profileData.emojis, emoji]);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateProfileData('photo', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCountrySelect = (country) => {
    updateProfileData('paysOrigine', country.name);
  };

  const removePhoto = () => {
    updateProfileData('photo', null);
  };

  const saveChanges = () => {
    onSave(profileData);
    setHasChanges(false);
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header identique à ProfilePage */}
      <div className="bg-white px-6 py-4 shadow-md">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <h2 className="text-xl font-bold text-gray-800">Modifier le profil</h2>
          
          <div className="w-10 h-10"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Photo de profil */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center justify-center">
            <Camera className="w-5 h-5 mr-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent" />
            Photo de profil
          </h4>
          
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold overflow-hidden mb-4">
              {profileData.photo ? (
                <img src={profileData.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                profileData.name ? profileData.name.charAt(0).toUpperCase() : 'M'
              )}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-2xl font-medium transition-colors shadow-sm"
              >
                <Camera className="w-4 h-4 mr-2 inline" />
                Changer
              </button>
              {profileData.photo && (
                <button
                  onClick={removePhoto}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-2xl font-medium transition-colors shadow-sm"
                >
                  Supprimer
                </button>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 mr-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent" />
            Bio (optionnel)
          </h4>
          
          <div>
            <textarea
              value={profileData.bio}
              onChange={(e) => updateProfileData('bio', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              rows={3}
              maxLength={150}
              placeholder="Décris-toi en quelques mots..."
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {profileData.bio.length}/150 caractères
            </div>
          </div>
        </div>

        {/* Emojis */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center justify-center">
            <span className="text-lg mr-2">😊</span>
            Tes emojis (5 max)
          </h4>
          
          {/* Emojis sélectionnés */}
          <div className="flex justify-center space-x-3 mb-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-2xl border-2 ${
                  profileData.emojis[index] 
                    ? 'border-purple-300 bg-purple-50' 
                    : 'border-gray-200 bg-gray-50'
                } flex items-center justify-center text-2xl`}
              >
                {profileData.emojis[index] || ''}
              </div>
            ))}
          </div>

          <div className="text-center text-sm text-gray-500 mb-4">
            {profileData.emojis.length}/5 emojis sélectionnés
          </div>

          {/* Grille d'emojis */}
          <div className="max-h-48 overflow-y-auto bg-gray-50 rounded-2xl p-4">
            <div className="grid grid-cols-8 gap-2">
              {allEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiSelect(emoji)}
                  disabled={!profileData.emojis.includes(emoji) && profileData.emojis.length >= 5}
                  className={`w-10 h-10 rounded-xl text-xl transition-all duration-200 ${
                    profileData.emojis.includes(emoji)
                      ? 'bg-purple-600 text-white shadow-lg scale-110'
                      : profileData.emojis.length >= 5
                      ? 'bg-gray-200 opacity-50 cursor-not-allowed'
                      : 'bg-white hover:bg-purple-100 hover:scale-110 shadow-sm'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Localisation */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center justify-center">
            <MapPin className="w-5 h-5 mr-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent" />
            Ville actuelle
          </h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dans quelle ville habites-tu ?</label>
            <input
              type="text"
              value={profileData.ville}
              onChange={(e) => updateProfileData('ville', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Paris, Londres, New York..."
            />
          </div>
        </div>

        {/* Pays d'origine */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center justify-center">
            <Flag className="w-5 h-5 mr-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent" />
            Pays d'origine (optionnel)
          </h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">D'où viens-tu ?</label>
            
            {/* Barre de recherche */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchCountry}
                onChange={(e) => setSearchCountry(e.target.value)}
                placeholder="Rechercher un pays..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            {/* Pays sélectionné */}
            {profileData.paysOrigine && (
              <div className="text-center p-3 bg-purple-50 rounded-2xl border border-purple-200 mb-3">
                <span className="text-lg font-medium text-purple-700">
                  {countries.find(c => c.name === profileData.paysOrigine)?.flag} {profileData.paysOrigine}
                </span>
              </div>
            )}

            {/* Grille de drapeaux */}
            <div className="max-h-48 overflow-y-auto bg-gray-50 rounded-2xl p-4">
              <div className="grid grid-cols-3 gap-3">
                {filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => handleCountrySelect(country)}
                    className={`p-3 rounded-2xl text-center transition-all duration-200 ${
                      profileData.paysOrigine === country.name
                        ? 'bg-purple-600 text-white shadow-lg scale-105'
                        : 'bg-white hover:bg-purple-100 hover:scale-105 shadow-sm'
                    }`}
                  >
                    <div className="text-2xl mb-1">{country.flag}</div>
                    <div className="text-xs font-medium">{country.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bouton de sauvegarde fixe en bas */}
        <div className="sticky bottom-4">
          <button
            onClick={saveChanges}
            disabled={!hasChanges}
            className={`w-full py-4 rounded-2xl font-medium transition-all duration-200 shadow-lg ${
              hasChanges 
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 transform hover:scale-105' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {hasChanges ? 'Sauvegarder les modifications' : 'Aucune modification'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;