// pages/EmailVerificationPage.jsx - Page de vérification d'email
import React, { useState, useEffect } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

const EmailVerificationPage = ({ email, onBackToAuth, onVerificationSuccess }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 secondes pour renvoyer
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');

  // Timer pour le renvoi de code
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return; // Limiter à 1 caractère
    if (!/^\d*$/.test(value)) return; // Seulement des chiffres

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus sur le champ suivant
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Vérification automatique si tous les champs sont remplis
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      handleVerification(newCode.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    // Gérer la suppression avec backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
      }
    }
    
    // Gérer les flèches
    if (e.key === 'ArrowLeft' && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleVerification = async (verificationCode) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulation de l'API de vérification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simuler succès/échec (90% de succès pour la démo)
      if (Math.random() > 0.1) {
        console.log('Code vérifié:', verificationCode);
        onVerificationSuccess?.();
      } else {
        throw new Error('Code incorrect');
      }
    } catch (err) {
      setError('Code incorrect. Veuillez réessayer.');
      // Reset du code en cas d'erreur
      setCode(['', '', '', '', '', '']);
      document.getElementById('code-0')?.focus();
    }

    setIsLoading(false);
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError('');

    try {
      // Simulation de l'API de renvoi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Code renvoyé à:', email);
      setTimeLeft(60);
      setCanResend(false);
      
      // Message de succès temporaire
      setError('');
      const successMessage = document.getElementById('resend-success');
      if (successMessage) {
        successMessage.style.display = 'block';
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 3000);
      }
    } catch (err) {
      setError('Erreur lors du renvoi. Veuillez réessayer.');
    }

    setIsResending(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Header avec bouton retour */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBackToAuth}
            className="p-2 hover:bg-white/50 rounded-full transition-colors mr-4"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Vérification d'email</h1>
        </div>

        {/* Contenu principal */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          
          {/* Icône et titre */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Mail size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Vérifiez votre email</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous avons envoyé un code de vérification à
            </p>
            <p className="text-purple-600 font-semibold mt-1">{email}</p>
          </div>

          {/* Champs de saisie du code */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
              Entrez le code à 6 chiffres
            </label>
            <div className="flex justify-center space-x-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl focus:outline-none transition-all ${
                    error 
                      ? 'border-red-300 bg-red-50 focus:border-red-500' 
                      : 'border-gray-200 focus:border-purple-500 focus:bg-white'
                  } ${digit ? 'bg-purple-50 border-purple-300' : 'bg-gray-50'}`}
                  disabled={isLoading}
                />
              ))}
            </div>
            
            {/* Message d'erreur */}
            {error && (
              <div className="flex items-center justify-center mt-4 text-red-600">
                <AlertCircle size={16} className="mr-2" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>

          {/* État de chargement */}
          {isLoading && (
            <div className="flex items-center justify-center mb-6">
              <RefreshCw size={20} className="animate-spin text-purple-600 mr-2" />
              <span className="text-purple-600 font-medium">Vérification en cours...</span>
            </div>
          )}

          {/* Bouton de renvoi */}
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm mb-3">
              Vous n'avez pas reçu le code ?
            </p>
            
            {canResend ? (
              <button
                onClick={handleResendCode}
                disabled={isResending}
                className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center justify-center mx-auto disabled:opacity-50"
              >
                {isResending ? (
                  <>
                    <RefreshCw size={16} className="animate-spin mr-2" />
                    Envoi en cours...
                  </>
                ) : (
                  'Renvoyer le code'
                )}
              </button>
            ) : (
              <p className="text-gray-500 text-sm">
                Renvoyer dans {formatTime(timeLeft)}
              </p>
            )}

            {/* Message de succès de renvoi */}
            <div id="resend-success" className="hidden mt-2">
              <div className="flex items-center justify-center text-green-600">
                <CheckCircle size={16} className="mr-2" />
                <span className="text-sm">Code renvoyé avec succès !</span>
              </div>
            </div>
          </div>

          {/* Informations supplémentaires */}
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-start">
              <AlertCircle size={18} className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Vérifiez vos spams</p>
                <p>Si vous ne trouvez pas l'email, regardez dans votre dossier courrier indésirable.</p>
              </div>
            </div>
          </div>

          {/* Bouton de modification d'email */}
          <div className="text-center mt-6">
            <button
              onClick={onBackToAuth}
              className="text-gray-600 hover:text-gray-700 text-sm font-medium"
            >
              Modifier l'adresse email
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 MoodUp. Connecter les communautés.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;