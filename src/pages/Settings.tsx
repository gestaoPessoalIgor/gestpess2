import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ThemeSettings from '@/components/settings/ThemeSettings';
import DateTimeSettings from '@/components/settings/DateTimeSettings';
import LanguageSettings from '@/components/settings/LanguageSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="py-6 pb-24">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold">Configurações</h1>
      </div>

      <div className="space-y-6">
        <ThemeSettings />
        <LanguageSettings />
        <DateTimeSettings />
        <NotificationSettings />
      </div>
    </div>
  );
}