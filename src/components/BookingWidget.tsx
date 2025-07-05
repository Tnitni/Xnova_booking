import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BookingWidgetProps {
  onBooking?: (bookingData: any) => void;
}

const BookingWidget: React.FC<BookingWidgetProps> = ({ onBooking }) => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [players, setPlayers] = useState(10);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingData = { location, date, time, players };
    onBooking?.(bookingData);
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t('booking.location')}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-field pl-10 w-full"
              placeholder={t('hero.searchPlaceholder')}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('booking.date')}
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('booking.time')}
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t('booking.players')}
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="number"
              value={players}
              onChange={(e) => setPlayers(parseInt(e.target.value))}
              className="input-field pl-10 w-full"
              min="1"
              max="20"
            />
          </div>
        </div>

        <button type="submit" className="btn-secondary w-full">
          {t('hero.bookNow')}
        </button>
      </form>
    </div>
  );
};

export default BookingWidget;