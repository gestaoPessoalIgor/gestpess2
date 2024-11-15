import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, LogOut, CreditCard, Clock, Calendar, Share2, 
  MessageSquare, Globe, Palette, DollarSign, Languages
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/Dialog';
import { Button } from '../ui/Button';

export default function DashboardHeader() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [showSettings, setShowSettings] = useState(false);

  const settingsOptions = [
    {
      group: 'Conta',
      items: [
        { icon: DollarSign, label: 'Gerenciar Salário e Rendas', onClick: () => {} },
        { icon: CreditCard, label: 'Meus Cartões', onClick: () => navigate('/dashboard/cards') }
      ]
    },
    {
      group: 'Preferências',
      items: [
        { icon: Languages, label: 'Idioma', onClick: () => {} },
        { icon: Clock, label: 'Formato de Data e Hora', onClick: () => {} },
        { icon: Palette, label: 'Tema', onClick: () => {} },
        { icon: Calendar, label: 'Visualização do Calendário', onClick: () => {} }
      ]
    },
    {
      group: 'Outros',
      items: [
        { icon: Globe, label: 'Fuso Horário', onClick: () => {} },
        { icon: Share2, label: 'Compartilhar Aplicativo', onClick: () => {} },
        { icon: MessageSquare, label: 'Feedback', onClick: () => {} },
        { icon: LogOut, label: 'Sair', onClick: logout, danger: true }
      ]
    }
  ];

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Olá, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-sm text-gray-600">Bem-vindo de volta</p>
      </div>

      <button
        onClick={() => setShowSettings(true)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm hover:shadow-md transition-shadow"
      >
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-violet-100 flex items-center justify-center">
            <span className="text-violet-600 font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </button>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-xs p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>Configurações</DialogTitle>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-violet-100 flex items-center justify-center">
                    <span className="text-violet-600 font-medium text-lg">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{user?.name}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </DialogHeader>

          <div className="py-2">
            {settingsOptions.map((group, index) => (
              <div key={group.group}>
                <div className="px-4 py-2">
                  <span className="text-xs font-medium text-gray-500">
                    {group.group}
                  </span>
                </div>
                {group.items.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setShowSettings(false);
                      item.onClick();
                    }}
                    className={`w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors
                      ${item.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'}
                    `}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
                {index < settingsOptions.length - 1 && (
                  <div className="h-px bg-gray-100 my-2" />
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}