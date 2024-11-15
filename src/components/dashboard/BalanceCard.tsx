import React from 'react';
import { formatCurrency } from '../../lib/utils';

export default function BalanceCard() {
  const balance = 2450.00;
  const income = 5000.00;
  const expenses = 2550.00;

  return (
    <div className="bg-blue-500 rounded-xl p-6 mb-6 text-white">
      <h2 className="text-lg font-semibold mb-2">Saldo Atual</h2>
      <div className="flex items-baseline mb-4">
        <span className="text-3xl font-bold">{formatCurrency(balance)}</span>
        <span className="ml-2 text-blue-100">disponível</span>
      </div>
      
      <div className="bg-blue-600/20 rounded-xl p-4 flex justify-between">
        <div className="text-center">
          <p className="text-blue-100 text-sm mb-1">Receitas</p>
          <p className="text-emerald-300 font-semibold">{formatCurrency(income)}</p>
        </div>
        <div className="w-px bg-blue-400/20" />
        <div className="text-center">
          <p className="text-blue-100 text-sm mb-1">Despesas</p>
          <p className="text-red-300 font-semibold">{formatCurrency(expenses)}</p>
        </div>
      </div>
    </div>
  );
}