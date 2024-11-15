import React from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { Card } from '../ui/Card';
import type { ThemeType } from '@/store/useSettingsStore';

export default function ThemeSettings() {
  const { theme, setTheme } = useSettingsStore();

  const themes: { value: ThemeType; label: string; icon: typeof Sun }[] = [
    { value: 'light', label: 'Claro', icon: Sun },
    { value: 'dark', label: 'Escuro', icon: Moon },
    { value: 'system', label: 'Sistema', icon: Monitor },
  ];

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Tema</h2>
      <div className="grid grid-cols-3 gap-4">
        {themes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-colors
              ${theme === value 
                ? 'bg-violet-100 text-violet-900' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}