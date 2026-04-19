import { useTranslation } from "react-i18next";
import { Languages, ChevronDown } from "lucide-react";

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const currentLanguage =
    LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-sm gap-2 rounded-xl hover:bg-base-200 transition-all border border-base-content/5"
      >
        <Languages className="size-4 text-primary" />
        <span className="hidden sm:inline font-medium">
          {currentLanguage.name}
        </span>
        <ChevronDown className="size-3 opacity-50" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[100] menu p-2 shadow-2xl bg-base-100 rounded-2xl w-48 mt-2 border border-base-content/5 animate-in fade-in slide-in-from-top-2"
      >
        {LANGUAGES.map((lang) => (
          <li key={lang.code}>
            <button
              onClick={() => i18n.changeLanguage(lang.code)}
              className={`flex items-center justify-between py-3 rounded-xl ${
                i18n.language === lang.code
                  ? "bg-primary/10 text-primary font-bold"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
              {i18n.language === lang.code && (
                <div className="size-2 bg-primary rounded-full"></div>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
