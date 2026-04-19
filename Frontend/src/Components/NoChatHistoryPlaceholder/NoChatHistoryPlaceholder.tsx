import { MessageCircleIcon, Sparkles, Send } from "lucide-react";
import type { FC } from "react";

interface NoChatHistoryPlaceholderProps {
  name: string;
}

const NoChatHistoryPlaceholder: FC<NoChatHistoryPlaceholderProps> = ({
  name,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-in fade-in duration-1000">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
        <div className="relative size-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
          <MessageCircleIcon className="size-12 text-white" />
          <Sparkles className="absolute -top-2 -right-2 size-6 text-accent animate-bounce" />
        </div>
      </div>

      <div className="space-y-4 max-w-sm">
        <h3 className="text-3xl font-black tracking-tight text-base-content">
          Start your <span className="text-primary italic">fluency</span> journey with {name}
        </h3>
        <p className="text-base-content/50 text-lg leading-relaxed">
          Every conversation is a step closer to mastery. Send a friendly message to begin!
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs mt-10">
        <p className="text-[10px] font-bold uppercase tracking-widest text-base-content/30 text-left ml-1">Quick Starters</p>
        <div className="flex flex-wrap gap-2 justify-center">
          <SuggestionButton text="👋 Say Hello" />
          <SuggestionButton text="🤝 How are you?" />
          <SuggestionButton text="🌍 Where are you from?" />
          <SuggestionButton text="📚 Why are you learning?" />
        </div>
      </div>
    </div>
  );
};

const SuggestionButton: FC<{text: string}> = ({text}) => (
  <button className="group flex items-center gap-2 px-4 py-2.5 text-sm font-bold bg-base-200 hover:bg-primary hover:text-white transition-all duration-300 rounded-2xl border border-base-content/5 shadow-sm active:scale-95">
    {text}
    <Send className="size-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
  </button>
);

export default NoChatHistoryPlaceholder;
