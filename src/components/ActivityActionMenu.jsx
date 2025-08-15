import React from 'react';
import { X } from 'lucide-react';

const ActivityActionMenu = ({ 
  activity, 
  position, 
  onClose 
}) => {
  const handleGoogleMaps = () => {
    const lat = position?.latitude || 49.4944;
    const lng = position?.longitude || 0.1079;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    window.open(url, '_blank');
    onClose();
  };

  const handleAppleMaps = () => {
    const lat = position?.latitude || 49.4944;
    const lng = position?.longitude || 0.1079;
    const url = `http://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`;
    window.open(url, '_blank');
    onClose();
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(activity.location).then(() => {
      alert('Adresse copiée !');
    }).catch(() => {
      alert('Impossible de copier l\'adresse');
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div>
            <h3 className="font-semibold text-gray-900">Naviguer vers</h3>
            <p className="text-sm text-gray-500">{activity.location}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Actions */}
        <div className="p-4 space-y-2">
          {/* Google Maps */}
          <button
            onClick={handleGoogleMaps}
            className="w-full p-4 text-left hover:bg-gray-50 rounded-xl transition-colors"
          >
            <p className="font-medium text-gray-900">Ouvrir dans Google Maps</p>
          </button>

          {/* Apple Maps */}
          <button
            onClick={handleAppleMaps}
            className="w-full p-4 text-left hover:bg-gray-50 rounded-xl transition-colors"
          >
            <p className="font-medium text-gray-900">Ouvrir dans Plans Apple</p>
          </button>

          {/* Copy Address */}
          <button
            onClick={handleCopyAddress}
            className="w-full p-4 text-left hover:bg-gray-50 rounded-xl transition-colors"
          >
            <p className="font-medium text-gray-900">Copier l'adresse</p>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ActivityActionMenu;

