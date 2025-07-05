import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSlotSelectorProps {
  selectedTimeSlot: string;
  onTimeSlotChange: (timeSlot: string) => void;
  availableTimeSlots?: string[];
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedTimeSlot,
  onTimeSlotChange,
  availableTimeSlots = []
}) => {
  const allTimeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white flex items-center">
          <Clock size={16} className="mr-2" />
          Giờ chơi
        </h3>
        <button
          onClick={() => onTimeSlotChange('')}
          className={`text-xs px-2 py-1 rounded transition-colors ${
            selectedTimeSlot === ''
              ? 'bg-purple-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Tất cả
        </button>
      </div>

      <div className="space-y-2">
        {/* Time Input */}
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="time"
            value={selectedTimeSlot}
            onChange={(e) => onTimeSlotChange(e.target.value)}
            className="input-field pl-9 w-full text-sm"
            step="3600"
          />
        </div>

        {/* Quick Time Selection */}
        <div className="grid grid-cols-3 gap-1">
          {allTimeSlots.slice(0, 9).map((timeSlot) => {
            const isSelected = timeSlot === selectedTimeSlot;
            const isAvailable = availableTimeSlots.length === 0 || availableTimeSlots.includes(timeSlot);
            
            return (
              <button
                key={timeSlot}
                onClick={() => onTimeSlotChange(timeSlot)}
                disabled={!isAvailable}
                className={`p-1.5 rounded text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-purple-600 text-white border border-purple-400'
                    : isAvailable
                    ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600'
                    : 'bg-gray-900 text-gray-500 border border-gray-800 cursor-not-allowed'
                }`}
              >
                {timeSlot}
              </button>
            );
          })}
        </div>

        {/* Show more times if needed */}
        {allTimeSlots.length > 9 && (
          <details className="mt-2">
            <summary className="text-xs text-gray-400 cursor-pointer hover:text-white">
              Thêm khung giờ khác...
            </summary>
            <div className="grid grid-cols-3 gap-1 mt-2">
              {allTimeSlots.slice(9).map((timeSlot) => {
                const isSelected = timeSlot === selectedTimeSlot;
                const isAvailable = availableTimeSlots.length === 0 || availableTimeSlots.includes(timeSlot);
                
                return (
                  <button
                    key={timeSlot}
                    onClick={() => onTimeSlotChange(timeSlot)}
                    disabled={!isAvailable}
                    className={`p-1.5 rounded text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-purple-600 text-white border border-purple-400'
                        : isAvailable
                        ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600'
                        : 'bg-gray-900 text-gray-500 border border-gray-800 cursor-not-allowed'
                    }`}
                  >
                    {timeSlot}
                  </button>
                );
              })}
            </div>
          </details>
        )}
      </div>
    </div>
  );
};

export default TimeSlotSelector;