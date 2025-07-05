import React from 'react';
import { ArrowRight, Target, Clock, Users, Star, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import BookingWidget from '../components/BookingWidget';
import VenueCard from '../components/VenueCard';

const Homepage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const featuredVenues = [
    {
      id: '1',
      name: 'Sân Cầu Lông Quận 1',
      location: 'Quận 1, TP.HCM',
      distance: '1.2 km',
      image: 'https://images.pexels.com/photos/8007334/pexels-photo-8007334.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      rating: 4.8,
      reviews: 124,
      basePrice: 200000,
      amenities: ['wifi', 'parking', 'camera'],
      availableSlots: ['07:00', '09:00', '15:00', '17:00', '19:00'],
      type: '5v5'
    },
    {
      id: '2',
      name: 'Sân Bóng Đá Mini Q7',
      location: 'Quận 7, TP.HCM',
      distance: '2.5 km',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      rating: 4.6,
      reviews: 89,
      basePrice: 350000,
      amenities: ['wifi', 'parking'],
      availableSlots: ['06:00', '08:00', '18:00', '20:00'],
      type: '7v7'
    },
    {
      id: '3',
      name: 'Sân Tennis Landmark',
      location: 'Quận 2, TP.HCM',
      distance: '3.1 km',
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      rating: 4.9,
      reviews: 156,
      basePrice: 180000,
      amenities: ['wifi', 'parking', 'camera'],
      availableSlots: ['07:00', '09:00', '16:00', '18:00'],
      type: '1v1'
    }
  ];

  const handleBooking = (bookingData: any) => {
    navigate('/booking', { state: bookingData });
  };

  const handleVenueBook = (venueId: string) => {
    navigate(`/venue/${venueId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg min-h-screen flex items-center">
        <div className="hero-content container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
                {t('hero.title')}
              </h1>
              <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-6">
                {t('hero.subtitle')}
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-xl">
                {t('hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/booking')}
                  className="btn-secondary flex items-center justify-center"
                >
                  {t('hero.bookNow')}
                  <ArrowRight size={20} className="ml-2" />
                </button>
                <button 
                  onClick={() => navigate('/player-matching')}
                  className="btn-primary flex items-center justify-center"
                >
                  {t('hero.findPlayer')}
                  <Users size={20} className="ml-2" />
                </button>
              </div>
            </div>
            
            <div className="animate-fadeIn">
              <BookingWidget onBooking={handleBooking} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{t('venues.title')}</h2>
            <p className="text-gray-400 text-lg">
              Discover the best sports venues in your area
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVenues.map((venue) => (
              <VenueCard 
                key={venue.id} 
                venue={venue} 
                onBook={handleVenueBook}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{t('features.title')}</h2>
            <p className="text-gray-400 text-lg">
              {t('features.description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Target size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {t('features.bestVenues')}
              </h3>
              <p className="text-gray-400">
                {t('features.bestVenuesDesc')}
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={32} className="text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {t('features.quickBooking')}
              </h3>
              <p className="text-gray-400">
                {t('features.quickBookingDesc')}
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {t('features.teamMatching')}
              </h3>
              <p className="text-gray-400">
                {t('features.teamMatchingDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Our Users Say</h2>
            <p className="text-gray-400 text-lg">
              Join thousands of satisfied players
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Minh Nguyen',
                location: 'Ho Chi Minh City',
                review: 'Amazing platform! Found great venues and teammates easily.',
                rating: 5,
                avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
              },
              {
                name: 'Sarah Johnson',
                location: 'District 1',
                review: 'Quick booking process and excellent venue quality.',
                rating: 5,
                avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
              },
              {
                name: 'David Kim',
                location: 'District 7',
                review: 'Love the player matching feature. Met great people!',
                rating: 5,
                avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
              }
            ].map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300">"{testimonial.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;