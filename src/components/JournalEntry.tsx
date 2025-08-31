import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Heart, BookOpen, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JournalEntry {
  id: string;
  text: string;
  emotion: 'happy' | 'sad' | 'angry' | 'neutral';
  confidence: number;
  date: string;
}

interface JournalEntryProps {
  onEntrySubmit: (entry: JournalEntry) => void;
}

export const JournalEntry = ({ onEntrySubmit }: JournalEntryProps) => {
  const [journalText, setJournalText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  // Simple emotion detection (in a real app, this would use Hugging Face API)
  const analyzeEmotion = (text: string): { emotion: 'happy' | 'sad' | 'angry' | 'neutral'; confidence: number } => {
    const lowerText = text.toLowerCase();
    
    // Happy keywords
    const happyWords = ['happy', 'joy', 'excited', 'great', 'awesome', 'love', 'fun', 'good', 'amazing', 'wonderful', 'smile', 'laugh'];
    const happyCount = happyWords.filter(word => lowerText.includes(word)).length;
    
    // Sad keywords
    const sadWords = ['sad', 'crying', 'upset', 'hurt', 'lonely', 'miss', 'worried', 'scared', 'tired', 'disappointed'];
    const sadCount = sadWords.filter(word => lowerText.includes(word)).length;
    
    // Angry keywords
    const angryWords = ['angry', 'mad', 'frustrated', 'annoyed', 'hate', 'stupid', 'unfair', 'mean'];
    const angryCount = angryWords.filter(word => lowerText.includes(word)).length;
    
    // Determine dominant emotion
    const maxCount = Math.max(happyCount, sadCount, angryCount);
    
    if (maxCount === 0) {
      return { emotion: 'neutral', confidence: 0.6 };
    }
    
    if (happyCount === maxCount) {
      return { emotion: 'happy', confidence: Math.min(0.7 + (happyCount * 0.1), 0.95) };
    } else if (sadCount === maxCount) {
      return { emotion: 'sad', confidence: Math.min(0.7 + (sadCount * 0.1), 0.95) };
    } else {
      return { emotion: 'angry', confidence: Math.min(0.7 + (angryCount * 0.1), 0.95) };
    }
  };

  const handleSubmit = async () => {
    if (!journalText.trim()) {
      toast({
        title: "Oops! 📝",
        description: "Please write something in your journal first!",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const analysis = analyzeEmotion(journalText);
      const entry: JournalEntry = {
        id: Date.now().toString(),
        text: journalText,
        emotion: analysis.emotion,
        confidence: analysis.confidence,
        date: new Date().toISOString()
      };
      
      onEntrySubmit(entry);
      setJournalText('');
      setIsAnalyzing(false);
      
      toast({
        title: "Great job! ✨",
        description: "Your journal entry has been saved!",
      });
    }, 1500);
  };

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full mb-4">
          <BookOpen className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Daily Journal</h2>
        <p className="text-muted-foreground">How are you feeling today? Write about your day!</p>
      </div>

      <div className="space-y-6">
        <div>
          <Textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Tell me about your day... What made you happy? What was challenging? I'm here to listen! 😊"
            className="journal-textarea min-h-[150px] text-base"
            disabled={isAnalyzing}
          />
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={isAnalyzing || !journalText.trim()}
            className="btn-primary text-lg px-12 py-6"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                Analyzing your feelings...
              </>
            ) : (
              <>
                <Heart className="w-5 h-5 mr-2" />
                Save My Journal
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};