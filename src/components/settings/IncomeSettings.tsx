import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { formatCurrency } from '@/lib/utils';

export default function IncomeSettings() {
  const { user, updateUserIncome } = useAuthStore();
  const [salary, setSalary] = useState(user?.salary?.toString() || '');
  const [extraIncome, setExtraIncome] = useState(user?.extraIncome?.toString() || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserIncome(Number(salary), Number(extraIncome));
    setIsEditing(false);
  };

  const formatValue = (value: string) => {
    // Remove tudo exceto números
    const numbers = value.replace(/\D/g, '');
    // Converte para número e formata como moeda
    return (Number(numbers) / 100).toFixed(2).replace('.', ',');
  };

  const handleValueChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const formattedValue = formatValue(value);
    setter(formattedValue);
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Rendas</h2>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            size="sm"
          >
            Editar
          </Button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salário
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                R$
              </span>
              <Input
                type="text"
                value={salary}
                onChange={(e) => handleValueChange(e.target.value, setSalary)}
                className="pl-9"
                placeholder="0,00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rendas Extras
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                R$
              </span>
              <Input
                type="text"
                value={extraIncome}
                onChange={(e) => handleValueChange(e.target.value, setExtraIncome)}
                className="pl-9"
                placeholder="0,00"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-violet-600 hover:bg-violet-700"
            >
              Salvar
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <span className="text-sm text-gray-600">Salário</span>
            <p className="text-lg font-semibold">
              {formatCurrency(Number(user?.salary || 0))}
            </p>
          </div>

          <div>
            <span className="text-sm text-gray-600">Rendas Extras</span>
            <p className="text-lg font-semibold">
              {formatCurrency(Number(user?.extraIncome || 0))}
            </p>
          </div>

          <div className="pt-2 border-t">
            <span className="text-sm text-gray-600">Total</span>
            <p className="text-xl font-bold text-violet-600">
              {formatCurrency(Number(user?.salary || 0) + Number(user?.extraIncome || 0))}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}