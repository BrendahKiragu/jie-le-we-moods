import { useState } from 'react';
import mascotImage from '@/assets/jielewe-mascot.png';

interface MascotProps {
  mood?: 'happy' | 'sad' | 'angry' | 'neutral';
  message?: string;
  className?: string;
}

export const Mascot = ({ mood = 'happy', message, className = '' }: MascotProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const getMoodMessage = () => {
    if (message) return message;
    
    switch (mood) {
      case 'happy':
        return "You seem happy today! 🌈 That's wonderful!";
      case 'sad':
        return "It's okay to feel sad 💙 Let's do something fun together!";
      case 'angry':
        return "Feeling angry is normal ❤️ Let's take some deep breaths!";
      case 'neutral':
        return "How are you feeling today? ☀️ I'm here to help!";
      default:
        return "Hi there! I'm here to support you! 😊";
    }
  };

  const getMoodAnimation = () => {
    switch (mood) {
      case 'happy':
        return 'animate-bounce-gentle';
      case 'sad':
        return 'animate-float';
      case 'angry':
        return 'animate-pulse';
      case 'neutral':
        return 'animate-bounce-gentle';
      default:
        return 'animate-bounce-gentle';
    }
  };

  return (
    <div className={`text-center ${className}`}>
      <div 
        className={`relative mx-auto w-32 h-32 cursor-pointer transition-transform duration-300 hover:scale-110 ${getMoodAnimation()} ${isAnimating ? 'animate-wiggle' : ''}`}
        onClick={handleClick}
      >
        <img 
          src={mascotImage} 
          alt="JIELEWE Mascot" 
          className="w-full h-full object-contain drop-shadow-lg"
        />
        
        {/* Mood indicator glow */}
        <div className={`absolute inset-0 rounded-full opacity-30 blur-xl ${
          mood === 'happy' ? 'bg-happy' :
          mood === 'sad' ? 'bg-sad' :
          mood === 'angry' ? 'bg-angry' :
          'bg-neutral'
        }`} />
      </div>
      
      {/* Speech bubble */}
      <div className="mt-4 relative">
        <div className="bg-card rounded-3xl p-4 shadow-soft max-w-xs mx-auto relative">
          <p className="text-sm font-medium text-card-foreground">
            {getMoodMessage()}
          </p>
          
          {/* Speech bubble tail */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-card rotate-45" />
        </div>
      </div>
    </div>
  );
};