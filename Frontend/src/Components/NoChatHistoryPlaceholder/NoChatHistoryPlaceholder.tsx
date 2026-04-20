import { MessageCircleIcon, Sparkles, Send } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

interface NoChatHistoryPlaceholderProps {
  name: string;
}

const NoChatHistoryPlaceholder: FC<NoChatHistoryPlaceholderProps> = ({
  name,
}) => {
  const { t } = useTranslation();

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
          {t('chat.placeholderTitle', { name })}
        </h3>
        <p className="text-base-content/50 text-lg leading-relaxed">
          {t('chat.placeholderSubtitle')}
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs mt-10">
        <p className="text-[10px] font-bold uppercase tracking-widest text-base-content/30 text-left ml-1">{t('chat.quickStarters')}</p>
        <div className="flex flex-wrap gap-2 justify-center">
          <SuggestionButton text={t('chat.starter1')} />
          <SuggestionButton text={t('chat.starter2')} />
          <SuggestionButton text={t('chat.starter3')} />
          <SuggestionButton text={t('chat.starter4')} />
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
