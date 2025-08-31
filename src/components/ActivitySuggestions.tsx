import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InteractiveActivity } from './InteractiveActivity';
import { 
  Smile, 
  Heart, 
  Gamepad2, 
  Palette, 
  Music, 
  TreePine,
  Star,
  Gift,
  Zap
} from 'lucide-react';

interface ActivitySuggestionsProps {
  mood: 'happy' | 'sad' | 'angry' | 'neutral';
  onActivitySelect: (activity: string) => void;
}

export const ActivitySuggestions = ({ mood, onActivitySelect }: ActivitySuggestionsProps) => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const handleActivityClick = (activityId: string) => {
    setSelectedActivity(activityId);
    onActivitySelect(activityId);
  };

  const handleActivityComplete = () => {
    setSelectedActivity(null);
  };

  if (selectedActivity) {
    return (
      <InteractiveActivity 
        activityId={selectedActivity} 
        mood={mood} 
        onComplete={handleActivityComplete}
      />
    );
  }
  const getActivities = () => {
    switch (mood) {
      case 'happy':
        return {
          title: "You're feeling great! 🌟",
          subtitle: "Let's celebrate with some fun activities!",
          color: 'from-happy to-happy-glow',
          activities: [
            { id: 'dance', title: 'Dance Party', description: 'Move to your favorite music!', icon: Music },
            { id: 'draw-celebration', title: 'Victory Drawing', description: 'Draw what made you happy today!', icon: Palette },
            { id: 'gratitude', title: 'Gratitude List', description: 'Write 3 things you\'re grateful for!', icon: Heart },
            { id: 'share-joy', title: 'Share the Joy', description: 'Tell someone about your good day!', icon: Gift }
          ]
        };
      
      case 'sad':
        return {
          title: "It's okay to feel sad 💙",
          subtitle: "Let's do something gentle to help you feel better",
          color: 'from-sad to-sad-glow',
          activities: [
            { id: 'breathing', title: 'Calm Breathing', description: 'Take deep, slow breaths together', icon: TreePine },
            { id: 'comfort-drawing', title: 'Comfort Coloring', description: 'Color a peaceful scene', icon: Palette },
            { id: 'gentle-music', title: 'Soothing Music', description: 'Listen to calming melodies', icon: Music },
            { id: 'write-feelings', title: 'Feeling Words', description: 'Write about what\'s in your heart', icon: Heart }
          ]
        };
      
      case 'angry':
        return {
          title: "Feeling angry is normal ❤️",
          subtitle: "Let's find healthy ways to express these feelings",
          color: 'from-angry to-angry-glow',
          activities: [
            { id: 'deep-breathing', title: 'Power Breathing', description: 'Breathe out the anger, breathe in calm', icon: TreePine },
            { id: 'physical-release', title: 'Energy Release', description: 'Do some jumping jacks or stretches', icon: Zap },
            { id: 'anger-drawing', title: 'Express Art', description: 'Draw or scribble your feelings away', icon: Palette },
            { id: 'problem-solving', title: 'Talk It Out', description: 'Think about solutions together', icon: Smile }
          ]
        };
      
      case 'neutral':
      default:
        return {
          title: "How are you feeling? ☀️",
          subtitle: "Let's explore some fun activities together!",
          color: 'from-neutral to-neutral-glow',
          activities: [
            { id: 'mood-check', title: 'Mood Explorer', description: 'Discover how you\'re really feeling', icon: Heart },
            { id: 'creative-time', title: 'Creative Time', description: 'Draw, color, or make something!', icon: Palette },
            { id: 'mini-game', title: 'Brain Games', description: 'Play a fun puzzle or game', icon: Gamepad2 },
            { id: 'mindful-moment', title: 'Mindful Moment', description: 'Take a peaceful break', icon: Star }
          ]
        };
    }
  };

  const { title, subtitle, color, activities } = getActivities();

  return (
    <Card className="p-6">
      {/* Header */}
      <div className={`bg-gradient-to-r ${color} rounded-2xl p-6 text-white mb-6`}>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-white/90">{subtitle}</p>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activities.map((activity) => (
          <Card 
            key={activity.id}
            className="activity-card cursor-pointer border-2 border-transparent hover:border-primary/20 transition-all duration-200 hover:scale-105"
            onClick={() => handleActivityClick(activity.id)}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <activity.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-card-foreground mb-1">{activity.title}</h4>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Encouragement Message */}
      <div className="mt-6 p-4 bg-muted rounded-2xl text-center">
        <p className="text-sm text-muted-foreground">
          Remember: All feelings are valid, and you're doing great by taking care of yourself! 🌈
        </p>
      </div>
    </Card>
  );
};