import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Star, Wifi, Car, Camera, Clock, Users, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const VenueDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Mock venue data - in real app, this would be fetched based on ID
  const venue = {
    id: '1',
    name: 'Sân Bóng Thể Thao Quận 1',
    location: 'Quận 1, TP.HCM',
    distance: '1.2 km',
    rating: 4.8,
    reviews: 124,
    price: 200000,
    images: [
      'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/8007334/pexels-photo-8007334.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    amenities: ['wifi', 'parking', 'camera'],
    availableSlots: ['07:00', '09:00', '15:00', '17:00', '19:00'],
    type: '5v5',
    description: 'A premium sports venue with modern facilities and excellent lighting. Perfect for competitive matches and training sessions.',
    features: [
      'Professional-grade artificial turf',
      'LED floodlighting system',
      'Changing rooms with showers',
      'Equipment rental available',
      'On-site refreshments',
      'Spectator seating'
    ]
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi size={16} />;
      case 'parking':
        return <Car size={16} />;
      case 'camera':
        return <Camera size={16} />;
      default:
        return null;
    }
  };

  const handleBooking = () => {
    console.log('Booking:', { venueId: id, date: selectedDate, time: selectedTime });
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {venue.images.map((image, index) => (
            <div key={index} className={`relative ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}>
              <img
                src={image}
                alt={`${venue.name} - ${index + 1}`}
                className="w-full h-64 md:h-80 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Venue Details */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{venue.name}</h1>
                  <div className="flex items-center text-gray-400 mb-2">
                    <MapPin size={16} className="mr-2" />
                    <span>{venue.location} • {venue.distance}</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 mr-1" />
                    <span className="text-white font-medium">{venue.rating}</span>
                    <span className="text-gray-400 ml-1">({venue.reviews} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-400">
                    {venue.price.toLocaleString()}đ
                  </div>
                  <div className="text-gray-400">{t('venues.perHour')}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="status-badge status-available">{venue.type}</span>
                {venue.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-icon">
                    {getAmenityIcon(amenity)}
                    <span className="capitalize">{amenity}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                <p className="text-gray-300">{venue.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Features</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {venue.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Reviews</h3>
                <div className="space-y-4">
                  {[
                    {
                      name: 'Minh Nguyen',
                      rating: 5,
                      comment: 'Excellent venue with great facilities. Highly recommended!',
                      date: '2 days ago'
                    },
                    {
                      name: 'Sarah Johnson',
                      rating: 4,
                      comment: 'Good location and well-maintained field. Will book again.',
                      date: '1 week ago'
                    }
                  ].map((review, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center mr-3">
                            <span className="text-white font-semibold text-sm">
                              {review.name[0]}
                            </span>
                          </div>
                          <div>
                            <div className="text-white font-medium">{review.name}</div>
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} size={14} className="text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-gray-400 text-sm">{review.date}</span>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Panel */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h3 className="text-xl font-semibold text-white mb-4">Book This Venue</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('booking.date')}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="input-field pl-10 w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Available Times
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {venue.availableSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTime(slot)}
                        className={`time-slot ${selectedTime === slot ? 'selected' : ''}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-300">Total Price</span>
                    <span className="text-2xl font-bold text-green-400">
                      {venue.price.toLocaleString()}đ
                    </span>
                  </div>
                  
                  <button 
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime}
                    className="btn-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t('booking.confirmBooking')}
                  </button>
                  
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    {t('booking.freeCancellation')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailPage;