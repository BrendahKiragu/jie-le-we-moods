import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Card } from '@/components/ui/card';
import { TrendingUp, Calendar } from 'lucide-react';

interface MoodData {
  date: string;
  emotion: 'happy' | 'sad' | 'angry' | 'neutral';
  confidence: number;
  dayOfWeek: string;
}

interface MoodChartProps {
  moodData: MoodData[];
}

export const MoodChart = ({ moodData }: MoodChartProps) => {
  // Transform emotion data for chart display
  const chartData = moodData.map((entry, index) => {
    const emotionValue = {
      'happy': 4,
      'neutral': 3,
      'sad': 2,
      'angry': 1
    }[entry.emotion];

    return {
      day: entry.dayOfWeek,
      mood: emotionValue,
      emotion: entry.emotion,
      confidence: entry.confidence,
      date: entry.date
    };
  });

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'happy': return '#4CAF50';
      case 'sad': return '#4FC3F7';
      case 'angry': return '#FF5252';
      case 'neutral': return '#FFEB3B';
      default: return '#4FC3F7';
    }
  };

  const getEmotionEmoji = (emotion: string) => {
    switch (emotion) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'angry': return '😡';
      case 'neutral': return '😐';
      default: return '😐';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-4 rounded-xl shadow-lg border">
          <p className="font-semibold text-card-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            {getEmotionEmoji(data.emotion)} Feeling: {data.emotion}
          </p>
          <p className="text-xs text-muted-foreground">
            Confidence: {Math.round(data.confidence * 100)}%
          </p>
        </div>
      );
    }
    return null;
  };

  if (moodData.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Start Your Mood Journey</h3>
            <p className="text-muted-foreground">
              Write your first journal entry to see your mood trends here! ✨
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Your Mood Journey</h3>
          <p className="text-sm text-muted-foreground">Track how you've been feeling over time</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="day" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              domain={[0.5, 4.5]}
              ticks={[1, 2, 3, 4]}
              tickFormatter={(value) => {
                const emotions = { 1: '😡', 2: '😢', 3: '😐', 4: '😊' };
                return emotions[value as keyof typeof emotions] || '';
              }}
              stroke="#6b7280"
              fontSize={16}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="mood" 
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Emotion Legend */}
      <div className="flex justify-center space-x-6 mt-4 pt-4 border-t">
        {[
          { emotion: 'happy', color: '#4CAF50', emoji: '😊' },
          { emotion: 'neutral', color: '#FFEB3B', emoji: '😐' },
          { emotion: 'sad', color: '#4FC3F7', emoji: '😢' },
          { emotion: 'angry', color: '#FF5252', emoji: '😡' }
        ].map((item) => (
          <div key={item.emotion} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-muted-foreground capitalize">
              {item.emoji} {item.emotion}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};