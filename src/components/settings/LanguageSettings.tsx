import React from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { Card } from '../ui/Card';
import type { Language } from '@/store/useSettingsStore';

const languages: { value: Language; label: string; flag: string }[] = [
  { value: 'pt-BR', label: 'Português (Brasil)', flag: '🇧🇷' },
  { value: 'en-US', label: 'English (US)', flag: '🇺🇸' },
  { value: 'es-ES', label: 'Español', flag: '🇪🇸' },
];

export default function LanguageSettings() {
  const { language, setLanguage } = useSettingsStore();

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Idioma</h2>
      <div className="space-y-2">
        {languages.map(({ value, label, flag }) => (
          <button
            key={value}
            onClick={() => setLanguage(value)}
            className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors
              ${language === value 
                ? 'bg-violet-100 text-violet-900' 
                : 'hover:bg-gray-50'
              }`}
          >
            <span className="text-xl">{flag}</span>
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}