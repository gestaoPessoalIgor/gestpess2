import React from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { Card } from '../ui/Card';
import { formatCurrency } from '@/lib/utils';
import { LineChart, CreditCard, Wallet, TrendingUp, Activity } from 'lucide-react';
import ExpenseChart from './ExpenseChart';
import TaskCalendar from './TaskCalendar';
import DashboardHeader from './DashboardHeader';

export default function DashboardHome() {
  const {
    balance,
    income,
    expenses,
    debitTotal,
    creditTotal,
  } = useDashboardStore();

  return (
    <div className="py-6 pb-24">
      <DashboardHeader />

      <div className="bg-violet-100 rounded-xl p-3 mb-6">
        <p className="text-sm text-violet-800">
          Seu saldo atual é de <span className="font-semibold">{formatCurrency(balance)}</span>
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4 bg-violet-500 text-white">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm opacity-80">Receitas</span>
            <Activity className="w-4 h-4 opacity-80" />
          </div>
          <p className="text-2xl font-bold">{formatCurrency(income)}</p>
          <div className="mt-2 flex items-center gap-1 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>este mês</span>
          </div>
        </Card>

        <Card className="p-4 bg-violet-100">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm text-violet-600">Despesas</span>
            <LineChart className="w-4 h-4 text-violet-600" />
          </div>
          <p className="text-2xl font-bold text-violet-900">{formatCurrency(expenses)}</p>
          <p className="text-sm text-violet-600 mt-2">este mês</p>
        </Card>

        <Card className="p-4 bg-blue-500 text-white">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm opacity-80">Débito</span>
            <Wallet className="w-4 h-4 opacity-80" />
          </div>
          <p className="text-2xl font-bold">{formatCurrency(debitTotal)}</p>
          <p className="text-sm opacity-80 mt-2">total gasto</p>
        </Card>

        <Card className="p-4 bg-violet-600 text-white">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm opacity-80">Crédito</span>
            <CreditCard className="w-4 h-4 opacity-80" />
          </div>
          <p className="text-2xl font-bold">{formatCurrency(creditTotal)}</p>
          <p className="text-sm opacity-80 mt-2">fatura atual</p>
        </Card>
      </div>

      {/* Expense Chart */}
      <Card className="p-6 mb-6">
        <ExpenseChart />
      </Card>

      {/* Task Calendar */}
      <TaskCalendar />
    </div>
  );
}