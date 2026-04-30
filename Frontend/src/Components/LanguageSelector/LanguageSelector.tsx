import { LanguagesIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LANGUAGES_WITH_FLAGS } from "../../utils/Static";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-ghost btn-circle"
        aria-label="change language"
      >
        <LanguagesIcon className="size-5" />
      </button>

      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl
        w-48 border border-base-content/10 max-h-80 overflow-y-auto z-50"
      >
        <div className="space-y-1">
          {LANGUAGES_WITH_FLAGS.map((lang) => (
            <button
              key={lang.code}
              className={`
              w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
              ${
                i18n.language === lang.code
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-base-content/5"
              }
            `}
              aria-label="choose language"
              onClick={() => changeLanguage(lang.code)}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.label}</span>
              {i18n.language === lang.code && (
                <div className="ml-auto size-2 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
