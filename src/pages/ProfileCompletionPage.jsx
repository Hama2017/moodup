import React, { useState, useRef } from 'react';
import { Camera, User, MessageSquare, MapPin, Flag, Search } from 'lucide-react';

const ProfileCompletion = ({ userName = "User", onComplete = () => {} }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    bio: '',
    emojis: [],
    photo: null,
    ville: '',
    paysOrigine: ''
  });
  const [searchCountry, setSearchCountry] = useState('');
  const fileInputRef = useRef(null);

  // Liste des emojis par catégories
  const emojiCategories = {
    visages: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕'],
    activites: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛼', '🛷', '⛸️', '🥌', '🎿', '⛷️', '🏂', '🪂', '🏋️‍♀️', '🏋️‍♂️', '🤸‍♀️', '🤸‍♂️', '⛹️‍♀️', '⛹️‍♂️', '🤺', '🤾‍♀️', '🤾‍♂️', '🏌️‍♀️', '🏌️‍♂️', '🧘‍♀️', '🧘‍♂️', '🏃‍♀️', '🏃‍♂️', '🚶‍♀️', '🚶‍♂️'],
    nourriture: ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐', '🥖', '🍞', '🥨', '🥯', '🧇', '🥞', '🧈', '🍯', '🥜', '🌰', '🍞', '🥓', '🍔', '🍟', '🌭', '🍕', '🥪', '🌮', '🌯', '🫔', '🥙', '🧆', '🥚', '🍳', '🥘', '🍲', '🫕', '🍿', '🧈', '🥛', '☕', '🫖', '🍵', '🧃', '🥤', '🧋', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', '🍾'],
    nature: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🪱', '🐛', '🦋', '🐌', '🐞', '🐜', '🪰', '🪲', '🪳', '🦟', '🦗', '🕷️', '🕸️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🪶', '🐾', '🐉', '🐲', '🌵', '🎄', '🌲', '🌳', '🌴', '🌱', '🌿', '☘️', '🍀', '🎍', '🪴', '🎋', '🍃', '🍂', '🍁', '🌾', '🌺', '🌻', '🌹', '🥀', '🌷', '🌸', '🌼', '🌻'],
    objets: ['⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭', '⏱️', '⏲️', '⏰', '🕰️', '⏳', '⌛', '📡', '🔋', '🔌', '💡', '🔦', '🕯️', '🪔', '🧯', '🛢️', '💸', '💵', '💴', '💶', '💷', '🪙', '💰', '💳', '💎', '⚖️', '🪜', '🧰', '🔧', '🔨', '⚒️', '🛠️', '⛏️', '🪚', '🔩', '⚙️', '🪤', '🧱', '⛓️', '🧲', '🔫', '💣', '🧨', '🪓', '🔪', '🗡️', '⚔️', '🛡️', '🚬', '⚰️', '🪦', '⚱️', '🏺', '🔮', '📿', '🧿', '💈', '⚗️', '🔭', '🔬', '🕳️', '🩹', '🩺', '💊', '💉', '🩸', '🧬', '🦠', '🧫', '🧪', '🌡️', '🧹', '🪣', '🧽', '🧴', '🛎️', '🔑', '🗝️', '🚪', '🪑', '🛋️', '🛏️', '🛌', '🧸', '🪆', '🖼️', '🪞', '🪟', '🛍️', '🛒', '🎁', '🎈', '🎏', '🎀', '🪄', '🪅', '🎊', '🎉', '🎎', '🏮', '🎐', '🧧', '✉️', '📩', '📨', '📧', '💌', '📥', '📤', '📦', '🏷️', '🪧', '📪', '📫', '📬', '📭', '📮', '📯', '📜', '📃', '📄', '📑', '🧾', '📊', '📈', '📉', '📰', '🗞️', '📓', '📔', '📒', '📕', '📗', '📘', '📙', '📚', '📖', '🔖', '🧷', '🔗', '📎', '📋', '📌', '📍', '📐', '📏', '🧮', '📝', '✏️', '🔍', '🔎', '🔏', '🔐', '🔒', '🔓']
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
    { code: 'CO', name: 'Colombie', flag: '🇨🇴' },
    { code: 'PE', name: 'Pérou', flag: '🇵🇪' },
    { code: 'CL', name: 'Chili', flag: '🇨🇱' },
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

  const handleEmojiSelect = (emoji) => {
    if (profileData.emojis.includes(emoji)) {
      setProfileData({
        ...profileData,
        emojis: profileData.emojis.filter(e => e !== emoji)
      });
    } else if (profileData.emojis.length < 4) {
      setProfileData({
        ...profileData,
        emojis: [...profileData.emojis, emoji]
      });
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({
          ...profileData,
          photo: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCountrySelect = (country) => {
    setProfileData({
      ...profileData,
      paysOrigine: country.name
    });
  };

  const canProceedStep = (step) => {
    switch(step) {
      case 1: return true; // Bio optionnelle
      case 2: return profileData.emojis.length > 0;
      case 3: return true; // Photo optionnelle
      case 4: return profileData.ville.trim().length > 0;
      case 5: return true; // Pays d'origine optionnel
      default: return false;
    }
  };

  const nextStep = () => {
    if (currentStep < 5 && canProceedStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 5) {
      onComplete(profileData);
    }
  };

  const skipStep = () => {
    if (currentStep === 1 || currentStep === 3 || currentStep === 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Parle-nous de toi</h2>
              <p className="text-gray-600 mb-3">Écris une petite bio qui te représente (optionnel)</p>
              <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                💡 Cette description aidera les autres à mieux te connaître et à découvrir tes centres d'intérêt. Pas obligatoire, tu peux la compléter plus tard !
              </p>
            </div>
            
            <div className="space-y-2">
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                placeholder="Décris-toi en quelques mots... Passionné de voyage, amateur de café, toujours prêt pour une nouvelle aventure !"
                className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={4}
                maxLength={200}
              />
              <div className="text-right text-sm text-gray-500">
                {profileData.bio.length}/200 caractères
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">😊</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Choisis tes emojis</h2>
              <p className="text-gray-600 mb-3">Sélectionne 4 emojis maximum qui te représentent</p>
              <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                🎯 Les emojis permettent d'exprimer ta personnalité en un coup d'œil. Choisis ceux qui reflètent tes passions, ton humeur ou tes traits de caractère !
              </p>
            </div>

            {/* Emojis sélectionnés */}
            <div className="flex justify-center space-x-3">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 rounded-xl border-2 border-dashed ${
                    profileData.emojis[index] 
                      ? 'border-purple-300 bg-purple-50' 
                      : 'border-gray-300 bg-gray-50'
                  } flex items-center justify-center text-2xl`}
                >
                  {profileData.emojis[index] || ''}
                </div>
              ))}
            </div>
            
            <div className="text-center text-sm text-gray-500">
              {profileData.emojis.length}/4 emojis sélectionnés
            </div>

            {/* Grille d'emojis */}
            <div className="max-h-64 overflow-y-auto bg-gray-50 rounded-xl p-4">
              <div className="grid grid-cols-8 gap-2">
                {allEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleEmojiSelect(emoji)}
                    disabled={!profileData.emojis.includes(emoji) && profileData.emojis.length >= 4}
                    className={`w-10 h-10 rounded-lg text-xl transition-all duration-200 ${
                      profileData.emojis.includes(emoji)
                        ? 'bg-purple-500 text-white shadow-lg scale-110'
                        : profileData.emojis.length >= 4
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
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Photo de profil</h2>
              <p className="text-gray-600 mb-3">Ajoute une photo ou passe cette étape</p>
              <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                📸 Une photo rend ton profil plus personnel et aide à créer des connexions authentiques. Pas d'obligation, tu peux toujours l'ajouter plus tard !
              </p>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                  {profileData.photo ? (
                    <img src={profileData.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    userName.charAt(0).toUpperCase()
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
                >
                  <Camera className="w-5 h-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Ta ville</h2>
              <p className="text-gray-600 mb-3">Dans quelle ville habites-tu ?</p>
              <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                🌆 Connaître ta ville nous aide à te proposer des événements et des personnes près de chez toi. C'est parfait pour découvrir ta communauté locale !
              </p>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={profileData.ville}
                  onChange={(e) => setProfileData({...profileData, ville: e.target.value})}
                  placeholder="Paris, Londres, New York..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <Flag className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Ton pays d'origine</h2>
              <p className="text-gray-600 mb-3">D'où viens-tu ? (optionnel)</p>
              <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                🌍 Ton pays d'origine nous aide à comprendre ta culture et tes traditions. C'est aussi un excellent moyen de rencontrer des personnes qui partagent tes origines ! Tu peux passer cette étape.
              </p>
            </div>

            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchCountry}
                onChange={(e) => setSearchCountry(e.target.value)}
                placeholder="Rechercher un pays..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Pays sélectionné */}
            {profileData.paysOrigine && (
              <div className="text-center p-3 bg-purple-50 rounded-xl border border-purple-200">
                <span className="text-lg font-medium text-purple-700">
                  Pays sélectionné: {profileData.paysOrigine}
                </span>
              </div>
            )}

            {/* Grille de drapeaux */}
            <div className="max-h-64 overflow-y-auto bg-gray-50 rounded-xl p-4">
              <div className="grid grid-cols-3 gap-3">
                {filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => handleCountrySelect(country)}
                    className={`p-3 rounded-xl text-center transition-all duration-200 ${
                      profileData.paysOrigine === country.name
                        ? 'bg-purple-500 text-white shadow-lg scale-105'
                        : 'bg-white hover:bg-purple-100 hover:scale-105 shadow-sm'
                    }`}
                  >
                    <div className="text-3xl mb-1">{country.flag}</div>
                    <div className="text-xs font-medium">{country.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header avec progression */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Complète ton profil</h1>
          
          {/* Barres de progression */}
          <div className="flex space-x-2 justify-center mb-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  step <= currentStep 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">Étape {currentStep} sur 5</p>
        </div>

        {/* Contenu principal */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Retour
            </button>
          )}
          
          <div className="flex space-x-3 ml-auto">
            {(currentStep === 1 || currentStep === 3 || currentStep === 5) && (
              <button
                onClick={skipStep}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Passer
              </button>
            )}
            
            <button
              onClick={nextStep}
              disabled={!canProceedStep(currentStep)}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
                canProceedStep(currentStep)
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentStep === 5 ? 'Terminer' : 'Suivant'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;