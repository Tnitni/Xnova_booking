import React from 'react';
import { Calendar } from 'lucide-react';
import { formatDisplayDate, getTodayDate } from '../utils/dateUtils';

interface DateSelectorProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  availableDates?: string[];
}

const DateSelector: React.FC<DateSelectorProps> = ({ 
  selectedDate, 
  onDateChange, 
  availableDates 
}) => {
  const today = getTodayDate();

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white flex items-center">
          <Calendar size={16} className="mr-2" />
          Ngày
        </h3>
      </div>

      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          min={today}
          className="input-field pl-10 w-full"
        />
      </div>
      
      {selectedDate && (
        <div className="mt-2 text-xs text-gray-400 text-center">
          {selectedDate === today ? 'Hôm nay' : formatDisplayDate(selectedDate)}
        </div>
      )}
    </div>
  );
};

export default DateSelector;