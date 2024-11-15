import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useExpenseStore } from '@/store/useExpenseStore';
import { formatCurrency } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const CATEGORIES = {
  alimentacao: { label: 'Alimentação', color: '#8B5CF6' },
  transporte: { label: 'Transporte', color: '#60A5FA' },
  lazer: { label: 'Lazer', color: '#34D399' },
  contas: { label: 'Contas', color: '#F87171' },
  outros: { label: 'Outros', color: '#9CA3AF' }
};

export default function ExpenseChart() {
  const { expenses } = useExpenseStore();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isDateOpen, setIsDateOpen] = useState(false);

  // Obter dias do mês atual com despesas
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const daysWithExpenses = [...new Set(expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    })
    .map(expense => expense.date)
  )].sort();

  // Agrupar despesas por categoria para o dia selecionado
  const dailyExpenses = expenses
    .filter(expense => expense.date === selectedDate)
    .reduce((acc: { [key: string]: number }, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

  // Preparar dados para o gráfico
  const chartData = [{
    name: '',
    ...Object.keys(CATEGORIES).reduce((acc, category) => ({
      ...acc,
      [category]: dailyExpenses[category] || 0
    }), {})
  }];

  // Calcular o valor máximo para o eixo Y
  const maxValue = Math.max(
    ...Object.values(dailyExpenses),
    1000 // Valor mínimo para manter a escala visível mesmo sem dados
  );

  // Função para formatar o eixo Y
  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <button
            onClick={() => setIsDateOpen(!isDateOpen)}
            className="px-3 py-1.5 rounded-full bg-violet-100 text-violet-600 text-sm font-medium flex items-center gap-1"
          >
            {new Date(selectedDate).toLocaleDateString('pt-BR')}
            <ChevronDown className={`w-4 h-4 transition-transform ${isDateOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDateOpen && (
            <div className="absolute left-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-10 w-48">
              <div className="max-h-48 overflow-y-auto">
                {daysWithExpenses.map((date) => (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setIsDateOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-sm
                      ${selectedDate === date ? 'text-violet-600 font-medium' : 'text-gray-700'}
                    `}
                  >
                    {new Date(date).toLocaleDateString('pt-BR')}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-[120px] -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            barGap={0}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#f0f0f0" 
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={false}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              tickFormatter={formatYAxis}
              domain={[0, maxValue + (maxValue * 0.1)]} // Adiciona 10% de margem no topo
              dx={-10}
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value)]}
              labelFormatter={() => ''}
              contentStyle={{ 
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '8px 12px'
              }}
              cursor={{ fill: 'transparent' }}
            />
            {Object.entries(CATEGORIES).map(([key, { color }]) => (
              <Bar
                key={key}
                dataKey={key}
                fill={color}
                radius={[4, 4, 0, 0]}
                maxBarSize={20}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legenda */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {Object.entries(CATEGORIES).map(([key, { label, color }]) => (
          <div key={key} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}