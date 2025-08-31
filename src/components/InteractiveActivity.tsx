import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, TreePine, Palette, Music, Zap, Gamepad2, Star, Gift, Smile } from 'lucide-react';

interface InteractiveActivityProps {
  activityId: string;
  mood: 'happy' | 'sad' | 'angry' | 'neutral';
  onComplete: () => void;
}

export const InteractiveActivity = ({ activityId, mood, onComplete }: InteractiveActivityProps) => {
  const [step, setStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const activities = {
    'breathing': {
      title: 'Calm Breathing Exercise',
      icon: TreePine,
      steps: [
        'Sit comfortably and relax your shoulders',
        'Breathe in slowly through your nose for 4 counts',
        'Hold your breath gently for 4 counts',
        'Breathe out slowly through your mouth for 6 counts',
        'Great job! You\'ve completed the breathing exercise!'
      ]
    },
    'dance': {
      title: 'Happy Dance Party',
      icon: Music,
      steps: [
        'Stand up and find some space to move',
        'Start by moving your arms to the rhythm',
        'Add some foot steps - left, right, left, right',
        'Now add your whole body - dance however feels good!',
        'Amazing! You\'re a fantastic dancer!'
      ]
    },
    'draw-celebration': {
      title: 'Victory Drawing',
      icon: Palette,
      steps: [
        'Get some paper and your favorite drawing tools',
        'Think about what made you happy today',
        'Draw a big sun or rainbow to start',
        'Add yourself doing something you love',
        'Beautiful artwork! You\'re so creative!'
      ]
    },
    'gratitude': {
      title: 'Gratitude Practice',
      icon: Heart,
      steps: [
        'Think of someone who makes you smile',
        'Think of something fun you did recently',
        'Think of your favorite place to be',
        'Say "Thank you" for these good things in your life',
        'Wonderful! Gratitude makes our hearts happy!'
      ]
    },
    'physical-release': {
      title: 'Energy Release',
      icon: Zap,
      steps: [
        'Stand up tall with your feet apart',
        'Jump up and down 10 times',
        'Do 5 big arm circles forward, then backward',
        'Take 3 deep breaths and shake your whole body',
        'Excellent! You\'ve released that energy in a healthy way!'
      ]
    },
    'mini-game': {
      title: 'Brain Game',
      icon: Gamepad2,
      steps: [
        'Let\'s count backwards from 20 to 1',
        'Now name 5 things you can see around you',
        'Think of 3 animals that start with the letter "B"',
        'Great thinking! Your brain is amazing!',
        'You\'re so smart! Brain games are fun!'
      ]
    }
  };

  const activity = activities[activityId as keyof typeof activities];
  
  if (!activity) {
    return (
      <Card className="p-6 text-center">
        <p>Activity not found. Please try another one!</p>
        <Button onClick={onComplete} className="mt-4">Go Back</Button>
      </Card>
    );
  }

  const handleNext = () => {
    if (step < activity.steps.length - 1) {
      setStep(step + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const getMoodColor = () => {
    switch (mood) {
      case 'happy': return 'from-happy to-happy-glow';
      case 'sad': return 'from-sad to-sad-glow';
      case 'angry': return 'from-angry to-angry-glow';
      default: return 'from-neutral to-neutral-glow';
    }
  };

  const progress = ((step + 1) / activity.steps.length) * 100;

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getMoodColor()} rounded-2xl p-6 text-white mb-6 text-center`}>
        <activity.icon className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">{activity.title}</h2>
      </div>

      {!isCompleted ? (
        <>
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {step + 1} of {activity.steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Current Step */}
          <div className="text-center mb-8">
            <div className="bg-muted rounded-2xl p-8 mb-6">
              <p className="text-lg font-medium text-foreground leading-relaxed">
                {activity.steps[step]}
              </p>
            </div>
            
            <Button 
              onClick={handleNext}
              className={`bg-gradient-to-r ${getMoodColor()} text-white text-lg px-8 py-6 hover:opacity-90`}
            >
              {step < activity.steps.length - 1 ? 'Next Step' : 'Finish Activity'}
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-happy to-happy-glow rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Activity Complete! 🎉</h3>
          <p className="text-muted-foreground mb-8 text-lg">
            You did an amazing job! How do you feel now?
          </p>
          <Button 
            onClick={onComplete}
            className="btn-happy text-lg px-8 py-6"
          >
            <Gift className="w-5 h-5 mr-2" />
            Try Another Activity
          </Button>
        </div>
      )}
    </Card>
  );
};