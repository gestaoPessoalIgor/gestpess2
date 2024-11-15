import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTaskStore } from '@/store/useTaskStore';
import { Card } from '../ui/Card';

const daysOfWeek = [
  { key: 'dom', label: 'D' },
  { key: 'seg', label: 'S' },
  { key: 'ter', label: 'T' },
  { key: 'qua', label: 'Q' },
  { key: 'qui', label: 'Q' },
  { key: 'sex', label: 'S' },
  { key: 'sab', label: 'S' }
];

const categoryColors = {
  work: 'bg-blue-100',
  training: 'bg-green-100',
  study: 'bg-purple-100',
  other: 'bg-gray-100'
};

export default function TaskCalendar() {
  const navigate = useNavigate();
  const tasks = useTaskStore((state) => state.tasks);
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTasksForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return tasks.filter(task => task.date === dateString);
  };

  const getCategoryColor = (tasks: any[]) => {
    if (tasks.length === 0) return '';
    if (tasks.length === 1) return categoryColors[tasks[0].category];
    return 'bg-gradient-to-r from-violet-100 to-blue-100';
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Preencher dias vazios no início do mês
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8" />);
    }

    // Preencher os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const tasksForDay = getTasksForDate(date);
      const isToday = new Date().toDateString() === date.toDateString();
      const categoryColor = getCategoryColor(tasksForDay);

      days.push(
        <div
          key={`day-${day}`}
          onClick={() => tasksForDay.length > 0 && navigate('/dashboard/tasks')}
          className={`h-8 border border-gray-100 relative group cursor-pointer transition-colors
            ${isToday ? 'border-violet-300' : ''}
            ${categoryColor}
            ${tasksForDay.length > 0 ? 'hover:border-violet-300' : ''}
          `}
        >
          <span className={`absolute top-1 left-1 text-xs
            ${isToday ? 'font-bold text-violet-600' : 'text-gray-600'}
          `}>
            {day}
          </span>
          
          {tasksForDay.length > 0 && (
            <div className="absolute bottom-1 right-1 flex gap-0.5">
              {tasksForDay.length > 2 ? (
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              ) : (
                tasksForDay.map((task, index) => (
                  <div
                    key={`task-${task.id}-${index}`}
                    className={`w-1.5 h-1.5 rounded-full ${
                      task.category === 'work' ? 'bg-blue-400' :
                      task.category === 'training' ? 'bg-green-400' :
                      task.category === 'study' ? 'bg-purple-400' :
                      'bg-gray-400'
                    }`}
                  />
                ))
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-violet-600" />
          <h2 className="text-sm font-semibold text-gray-900">Calendário</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <span className="text-xs font-medium text-gray-700">
            {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px">
        {daysOfWeek.map((day) => (
          <div key={day.key} className="text-center py-1 text-xs font-medium text-gray-500">
            {day.label}
          </div>
        ))}
        {renderCalendar()}
      </div>
    </Card>
  );
}