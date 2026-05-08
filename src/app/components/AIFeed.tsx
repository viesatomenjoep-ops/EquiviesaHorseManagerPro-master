import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, AlertCircle, Bot } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AIMessage {
  id: string;
  type: 'suggestion' | 'insight' | 'alert';
  message: string;
  timestamp: string;
}

export function AIFeed() {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      type: 'suggestion',
      message: "Based on yesterday's vet report, consider reducing feed for stallion 'Equinox' by 10% to optimize recovery.",
      timestamp: '2 min ago',
    },
    {
      id: '2',
      type: 'insight',
      message: "Training performance trend detected: Mare 'Eclipse' shows 15% improvement in treadmill endurance over the past week.",
      timestamp: '15 min ago',
    },
    {
      id: '3',
      type: 'alert',
      message: "Reminder: Vaccination schedule due for 3 horses in Block B tomorrow. Vet appointment confirmed at 14:00.",
      timestamp: '1 hour ago',
    },
    {
      id: '4',
      type: 'suggestion',
      message: "Weather forecast shows rain this afternoon. Consider scheduling indoor training sessions for paddock horses.",
      timestamp: '2 hours ago',
    },
  ]);

  useEffect(() => {
    async function fetchAI() {
      try {
        const { data, error } = await supabase.from('ai_insights').select('*').order('created_at', { ascending: false }).limit(5);
        if (!error && data && data.length > 0) {
          setMessages(data);
        }
      } catch (e) {
        console.error('Failed to load AI feed, using fallbacks');
      }
    }
    fetchAI();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'suggestion':
        return <Sparkles className="w-4 h-4" />;
      case 'insight':
        return <TrendingUp className="w-4 h-4" />;
      case 'alert':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'suggestion':
        return 'bg-amber-50 text-[#8C7345] border-teal-100';
      case 'insight':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'alert':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      default:
        return 'bg-amber-50 text-[#8C7345] border-teal-100';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 h-full flex flex-col relative overflow-hidden group shadow-sm">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl group-hover:bg-teal-100 transition-all"></div>
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 bg-slate-100 rounded-lg border border-slate-200">
          <Bot className="w-5 h-5 text-slate-700" />
        </div>
        <h2 className="text-xl font-serif font-bold text-slate-900 tracking-wide">Equiviesa AI</h2>
        <span className="ml-auto text-xs bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C2A878] animate-pulse"></span>
          Live Feed
        </span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-4 rounded-lg border ${getColor(msg.type)} hover:scale-[1.02] transition-transform`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-1.5 rounded ${getColor(msg.type)}`}>
                {getIcon(msg.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900 mb-1">{msg.message}</p>
                <p className="text-xs text-slate-500 font-medium">{msg.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <button className="w-full px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
          View All Insights
        </button>
      </div>
    </div>
  );
}
