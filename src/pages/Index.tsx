import React, { useState, useEffect } from 'react';
import { Mascot } from '@/components/Mascot';
import { JournalEntry } from '@/components/JournalEntry';
import { MoodChart } from '@/components/MoodChart';
import { ActivitySuggestions } from '@/components/ActivitySuggestions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, TrendingUp, Gamepad2, GraduationCap, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JournalEntryData {
  id: string;
  text: string;
  emotion: 'happy' | 'sad' | 'angry' | 'neutral';
  confidence: number;
  date: string;
}

const Index = () => {
  const [journalEntries, setJournalEntries] = useState<JournalEntryData[]>([]);
  const [currentMood, setCurrentMood] = useState<'happy' | 'sad' | 'angry' | 'neutral'>('neutral');
  const [activeTab, setActiveTab] = useState('journal');
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('jielewe-journal-entries');
    if (savedEntries) {
      const entries = JSON.parse(savedEntries);
      setJournalEntries(entries);
      if (entries.length > 0) {
        setCurrentMood(entries[entries.length - 1].emotion);
      }
    }
  }, []);

  // Save data to localStorage whenever entries change
  useEffect(() => {
    if (journalEntries.length > 0) {
      localStorage.setItem('jielewe-journal-entries', JSON.stringify(journalEntries));
    }
  }, [journalEntries]);

  const handleJournalSubmit = (entry: JournalEntryData) => {
    setJournalEntries((prev) => [...prev, entry]);
    setCurrentMood(entry.emotion);
    setActiveTab('activities'); // Switch to activities after journal submission
  };

  const handleActivitySelect = (activityId: string) => {
    toast({
      title: "Great choice! 🎉",
      description: "That sounds like a wonderful activity to try!",
    });
  };

  // Transform journal entries for mood chart
  const moodChartData = journalEntries.map((entry) => ({
    date: entry.date,
    emotion: entry.emotion,
    confidence: entry.confidence,
    dayOfWeek: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' })
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="hero-gradient py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Mascot mood={currentMood} className="mb-6" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Welcome to JIELEWE
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Your friendly companion for tracking emotions and feeling your best! 🌈
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="btn-happy text-lg px-8 py-6"
              onClick={() => setActiveTab('journal')}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Start Journaling
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 text-lg px-8 py-6"
              onClick={() => setActiveTab('learn')}
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Learn About Emotions
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8 bg-card rounded-2xl p-2">
            <TabsTrigger value="journal" className="rounded-xl">
              <BookOpen className="w-4 h-4 mr-2" />
              Journal
            </TabsTrigger>
            <TabsTrigger value="chart" className="rounded-xl">
              <TrendingUp className="w-4 h-4 mr-2" />
              Mood Chart
            </TabsTrigger>
            <TabsTrigger value="activities" className="rounded-xl">
              <Gamepad2 className="w-4 h-4 mr-2" />
              Activities
            </TabsTrigger>
            <TabsTrigger value="learn" className="rounded-xl">
              <GraduationCap className="w-4 h-4 mr-2" />
              Learn
            </TabsTrigger>
          </TabsList>

          <TabsContent value="journal" className="space-y-8">
            <JournalEntry onEntrySubmit={handleJournalSubmit} />
          </TabsContent>

          <TabsContent value="chart" className="space-y-8">
            <MoodChart moodData={moodChartData} />
          </TabsContent>

          <TabsContent value="activities" className="space-y-8">
            <ActivitySuggestions mood={currentMood} onActivitySelect={handleActivitySelect} />
          </TabsContent>

          <TabsContent value="learn" className="space-y-8">
            <Card className="p-8 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-accent-lavender to-accent-coral rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Understanding Your Emotions</h2>
                <p className="text-lg text-muted-foreground">
                  Learning about emotions helps you understand yourself better! 🧠✨
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    emotion: 'Happy',
                    emoji: '😊',
                    color: 'from-happy to-happy-glow',
                    description: 'Happiness makes us feel light and energetic! It happens when good things occur or when we do things we love.',
                    tips: ['Share your happiness with others', 'Remember what made you happy', 'Do activities you enjoy']
                  },
                  {
                    emotion: 'Sad',
                    emoji: '😢',
                    color: 'from-sad to-sad-glow',
                    description: 'Sadness is a normal emotion that everyone feels sometimes. It helps us process difficult situations.',
                    tips: ['Talk to someone you trust', 'Do gentle activities like reading', 'Remember that sad feelings will pass']
                  },
                  {
                    emotion: 'Angry',
                    emoji: '😡',
                    color: 'from-angry to-angry-glow',
                    description: 'Anger shows us when something isn\'t fair or right. It\'s important to express anger in healthy ways.',
                    tips: ['Take deep breaths', 'Count to ten before reacting', 'Talk about what made you angry']
                  },
                  {
                    emotion: 'Neutral',
                    emoji: '😐',
                    color: 'from-neutral to-neutral-glow',
                    description: 'Feeling neutral or calm is peaceful! It\'s a great time to think about what you want to do next.',
                    tips: ['Explore new activities', 'Check in with yourself', 'Enjoy the peaceful moment']
                  }
                ].map((item) => (
                  <Card key={item.emotion} className="p-6">
                    <div className={`bg-gradient-to-r ${item.color} rounded-2xl p-4 text-white mb-4`}>
                      <div className="text-center">
                        <div className="text-4xl mb-2">{item.emoji}</div>
                        <h3 className="text-xl font-bold">{item.emotion}</h3>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Helpful Tips:</h4>
                      <ul className="space-y-1">
                        {item.tips.map((tip, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-accent-mint to-accent-coral rounded-3xl text-center">
                <h3 className="text-xl font-bold text-white mb-2">Remember</h3>
                <p className="text-white/90">
                  All emotions are valid and important! They help us understand ourselves and the world around us. 
                  The key is learning healthy ways to express and manage them. 💙
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-card py-8 px-4 border-t">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">JIELEWE</span>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <p className="text-muted-foreground">
            Supporting children's emotional well-being, one journal entry at a time. 🌈
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
