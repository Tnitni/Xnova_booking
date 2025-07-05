import React from 'react';
import { MapPin, Wifi, Car, Camera, Star, Snowflake, Droplets, Clock, Calendar, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Venue } from '../types/venue';

interface VenueCardProps {
  venue: Venue;
  selectedDate?: string;
  selectedTimeSlot?: string;
  onBook?: (venueId: string, selectedDate?: string, selectedTimeSlot?: string) => void;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue, selectedDate, selectedTimeSlot, onBook }) => {
  const { t } = useLanguage();

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi size={14} />;
      case 'parking':
        return <Car size={14} />;
      case 'camera':
        return <Camera size={14} />;
      case 'ac':
        return <Snowflake size={14} />;
      case 'free-water':
        return <Droplets size={14} />;
      default:
        return null;
    }
  };

  const getAmenityLabel = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return 'WiFi';
      case 'parking':
        return 'Đỗ xe';
      case 'camera':
        return 'Camera';
      case 'ac':
        return 'Điều hòa';
      case 'free-water':
        return 'Nước miễn phí';
      default:
        return amenity;
    }
  };

  // Get available slots for selected date
  let availableSlots: string[] = [];
  let dayAvailability = null;
  
  if (selectedDate) {
    dayAvailability = venue.availability.find(avail => avail.date === selectedDate);
    if (dayAvailability) {
      availableSlots = dayAvailability.timeSlots
        .filter(slot => slot.isAvailable)
        .map(slot => slot.time);
    }
  }

  // Filter by selectedTimeSlot if provided
  if (selectedTimeSlot && selectedTimeSlot !== 'Mọi khung giờ') {
    if (selectedTimeSlot.includes('-')) {
      // Handle time range (e.g., "06:00-09:00")
      const [startTime, endTime] = selectedTimeSlot.split('-');
      availableSlots = availableSlots.filter(slot => slot >= startTime && slot < endTime);
    } else {
      // Handle specific time
      availableSlots = availableSlots.filter(slot => slot === selectedTimeSlot);
    }
  }

  // If no slots are available after filtering, don't render the card
  if (selectedDate && availableSlots.length === 0) {
    return null;
  }

  // Use basePrice as the current price
  const currentPrice = venue.basePrice;

  // Get price range if there are different prices for different time slots
  const priceRange = dayAvailability ? 
    dayAvailability.timeSlots
      .filter(slot => slot.isAvailable && (!selectedTimeSlot || selectedTimeSlot === 'Mọi khung giờ' || availableSlots.includes(slot.time)))
      .map(slot => slot.price || venue.basePrice) : [venue.basePrice];
  
  const minPrice = Math.min(...priceRange);
  const maxPrice = Math.max(...priceRange);
  const showPriceRange = minPrice !== maxPrice;

  return (
    <div className="card hover-scale">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Image Section */}
        <div className="relative lg:w-80 flex-shrink-0">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-48 lg:h-full object-cover rounded-lg"
          />
          <div className="absolute top-3 right-3">
            <span className="status-badge status-available text-xs px-2 py-1">
              {venue.type}
            </span>
          </div>
          <div className="absolute bottom-3 left-3">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
              <div className="flex items-center text-white text-xs">
                <Calendar size={12} className="mr-1" />
                <span>{availableSlots.length || 'Nhiều'} khung giờ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Header Info */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">{venue.name}</h3>
                <div className="flex items-center text-gray-400 text-sm mb-2">
                  <MapPin size={14} className="mr-1 flex-shrink-0" />
                  <span className="truncate">{venue.location} • {venue.distance}</span>
                </div>
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-400 mr-1 flex-shrink-0" />
                  <span className="text-white font-medium">{venue.rating}</span>
                  <span className="text-gray-400 text-sm ml-1">({venue.reviews} đánh giá)</span>
                </div>
              </div>
              
              {/* Price Section */}
              <div className="text-right ml-4 flex-shrink-0">
                {showPriceRange ? (
                  <div>
                    <div className="text-lg font-bold text-green-400">
                      {(minPrice / 1000).toFixed(0)}K - {(maxPrice / 1000).toFixed(0)}K
                    </div>
                    <div className="text-gray-400 text-sm">/giờ</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-2xl font-bold text-green-400">
                      {currentPrice.toLocaleString()}đ
                    </div>
                    <div className="text-gray-400 text-sm">/giờ</div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {venue.description && (
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                {venue.description}
              </p>
            )}

            {/* Amenities */}
            <div className="flex items-center flex-wrap gap-3 mb-4">
              {venue.amenities.slice(0, 4).map((amenity, index) => (
                <div key={index} className="flex items-center text-gray-400 text-xs">
                  {getAmenityIcon(amenity)}
                  <span className="ml-1">{getAmenityLabel(amenity)}</span>
                </div>
              ))}
              {venue.amenities.length > 4 && (
                <span className="text-xs text-gray-400">
                  +{venue.amenities.length - 4} tiện ích khác
                </span>
              )}
            </div>

            {/* Available Slots - Enhanced Display */}
            {selectedDate && availableSlots.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-300 mb-2 flex items-center">
                  <Clock size={14} className="mr-1" />
                  Khung giờ có sẵn ngày {new Date(selectedDate).toLocaleDateString('vi-VN')}:
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {availableSlots.slice(0, 8).map((slot, index) => {
                    const timeSlot = dayAvailability?.timeSlots.find(ts => ts.time === slot);
                    const slotPrice = timeSlot?.price || venue.basePrice;
                    
                    return (
                      <div key={index} className="bg-gray-800 rounded-lg p-2 text-center border border-gray-600">
                        <div className="text-white text-sm font-medium">{slot}</div>
                        <div className="text-green-400 text-xs">
                          {(slotPrice / 1000).toFixed(0)}K
                        </div>
                      </div>
                    );
                  })}
                  {availableSlots.length > 8 && (
                    <div className="bg-gray-800 rounded-lg p-2 text-center border border-gray-600 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">
                        +{availableSlots.length - 8}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Section */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-700">
            <div className="flex items-center text-sm text-gray-400">
              <Users size={14} className="mr-1" />
              <span>
                {selectedDate ? 
                  `${availableSlots.length} khung giờ có sẵn` : 
                  'Có sẵn hôm nay'
                }
              </span>
            </div>
            <button
              onClick={() => onBook?.(venue.id, selectedDate, selectedTimeSlot)}
              className="btn-secondary px-6 py-2"
            >
              Đặt ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;