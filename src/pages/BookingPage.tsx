import React, { useState, useMemo } from 'react';
import { Filter, Search, Calendar, Clock, Target, Users, X, ChevronDown, Star, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import VenueCard from '../components/VenueCard';
import BookingSummaryModal from '../components/modals/BookingSummaryModal';
import WeatherWidget from '../components/WeatherWidget';
import MapWidget from '../components/MapWidget';
import DateSelector from '../components/DateSelector';
import TimeSlotSelector from '../components/TimeSlotSelector';
import { venues } from '../data/venueData';
import { Venue, BookingFilters } from '../types/venue';
import { getTodayDate } from '../utils/dateUtils';

const BookingPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);
  const [showBookingSummary, setShowBookingSummary] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Filter states with date as primary filter
  const [filters, setFilters] = useState<BookingFilters>({
    selectedDate: getTodayDate(),
    maxPrice: 1000000,
    venueType: '',
    location: '',
    amenities: [],
    rating: 0,
    timeSlot: ''
  });

  const venueTypes = ['Tất cả thể loại', 'Cầu lông', 'Bóng đá', 'Tennis', 'Bóng rổ', 'Bóng chuyền'];
  const locations = ['Tất cả khu vực', 'Quận 1', 'Quận 2', 'Quận 3', 'Quận 7', 'Quận Bình Thạnh'];
  const timeSlots = ['Mọi khung giờ', '06:00-09:00', '09:00-12:00', '12:00-15:00', '15:00-18:00', '18:00-21:00', '21:00-24:00'];
  
  const amenityOptions = [
    { id: 'wifi', label: 'WiFi miễn phí', icon: '📶' },
    { id: 'parking', label: 'Bãi đỗ xe', icon: '🚗' },
    { id: 'camera', label: 'Camera an ninh', icon: '📹' },
    { id: 'ac', label: 'Điều hòa', icon: '❄️' },
    { id: 'free-water', label: 'Nước miễn phí', icon: '💧' }
  ];

  // Get available time slots for selected date across all venues
  const availableTimeSlots = useMemo(() => {
    const timeSlots = new Set<string>();
    venues.forEach(venue => {
      const dayAvailability = venue.availability.find(avail => avail.date === filters.selectedDate);
      if (dayAvailability) {
        dayAvailability.timeSlots.forEach(slot => {
          if (slot.isAvailable) {
            timeSlots.add(slot.time);
          }
        });
      }
    });
    return Array.from(timeSlots).sort();
  }, [filters.selectedDate]);

  const filteredVenues = useMemo(() => {
    return venues.filter(venue => {
      // Search filter
      const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           venue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           venue.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Basic filters
      const matchesType = !filters.venueType || filters.venueType === 'Tất cả thể loại' || venue.type === filters.venueType;
      const matchesLocation = !filters.location || filters.location === 'Tất cả khu vực' || 
                             venue.location.includes(filters.location);
      const matchesAmenities = filters.amenities.length === 0 || 
                              filters.amenities.every(amenity => venue.amenities.includes(amenity));
      const matchesRating = venue.rating >= filters.rating;

      // Date and time availability filter
      const dayAvailability = venue.availability.find(avail => avail.date === filters.selectedDate);
      if (!dayAvailability) return false;

      const availableSlots = dayAvailability.timeSlots.filter(slot => slot.isAvailable);
      if (availableSlots.length === 0) return false;

      // Time slot filter
      let matchesTimeSlot = true;
      if (filters.timeSlot && filters.timeSlot !== 'Mọi khung giờ') {
        const timeRange = filters.timeSlot.split('-');
        if (timeRange.length === 2) {
          const startTime = timeRange[0];
          const endTime = timeRange[1];
          matchesTimeSlot = availableSlots.some(slot => 
            slot.time >= startTime && slot.time < endTime
          );
        } else {
          matchesTimeSlot = availableSlots.some(slot => slot.time === filters.timeSlot);
        }
      }

      // Price filter (check against available slots)
      const matchesPrice = availableSlots.some(slot => 
        (slot.price || venue.basePrice) <= filters.maxPrice
      );

      return matchesSearch && matchesType && matchesLocation && 
             matchesAmenities && matchesRating && matchesTimeSlot && matchesPrice;
    });
  }, [venues, searchTerm, filters]);

  const handleVenueBook = (venueId: string, selectedDate?: string, selectedTimeSlot?: string) => {
    setSelectedVenue(venueId);
    setShowBookingSummary(true);
  };

  const handleCloseBookingSummary = () => {
    setShowBookingSummary(false);
    setSelectedVenue(null);
  };

  const handleFilterChange = (filterType: keyof BookingFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const clearFilters = () => {
    setFilters({
      selectedDate: getTodayDate(),
      maxPrice: 1000000,
      venueType: '',
      location: '',
      amenities: [],
      rating: 0,
      timeSlot: ''
    });
    setSearchTerm('');
  };

  const activeFiltersCount = [
    filters.venueType && filters.venueType !== 'Tất cả thể loại',
    filters.location && filters.location !== 'Tất cả khu vực',
    filters.timeSlot && filters.timeSlot !== 'Mọi khung giờ',
    filters.amenities.length > 0,
    filters.rating > 0,
    filters.maxPrice < 1000000
  ].filter(Boolean).length;

  const renderStarRating = (rating: number, onRatingChange: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange(star)}
            className={`transition-colors ${
              star <= rating ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-300'
            }`}
          >
            <Star size={16} className={star <= rating ? 'fill-current' : ''} />
          </button>
        ))}
        <span className="text-white text-sm ml-2">
          {rating > 0 ? `${rating}+ sao` : 'Tất cả'}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900/20 via-gray-900 to-blue-900/20 pt-20 pb-8">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Đặt Sân Thể Thao
            </h1>
            <h2 className="text-xl lg:text-2xl font-bold text-gradient mb-6">
              NHANH CHÓNG & TIỆN LỢI
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Tìm và đặt sân thể thao chất lượng cao trong khu vực của bạn. 
              Hệ thống đặt sân thông minh với thông tin thời gian thực!
            </p>
            
            {/* Scroll Indicator */}
            <div className="flex flex-col items-center mt-8">
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 mb-4">
                <span className="text-white text-sm font-medium">👇 Lướt xuống để bắt đầu đặt sân</span>
              </div>
              <div className="animate-bounce">
                <ChevronDown className="text-lime-400" size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Compact Filter Design */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="flex items-center bg-lime-500 text-black px-3 py-2 rounded-lg font-semibold mr-4">
              <Filter size={18} className="mr-2" />
              Tìm trận đấu phù hợp
            </div>
          </div>
          
          {/* Compact Filter Row */}
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Search - Compact */}
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Tìm kiếm sân..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-9 w-full h-10 text-sm bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              {/* Compact Dropdowns */}
              <div className="relative">
                <select
                  value={filters.venueType}
                  onChange={(e) => handleFilterChange('venueType', e.target.value)}
                  className="input-field w-full h-10 text-sm bg-gray-700 border-gray-600 appearance-none pr-8 text-white"
                >
                  {venueTypes.map(type => (
                    <option key={type} value={type === 'Tất cả thể loại' ? '' : type} className="bg-gray-700 text-white">
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
              </div>

              <div className="relative">
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="input-field w-full h-10 text-sm bg-gray-700 border-gray-600 appearance-none pr-8 text-white"
                >
                  {locations.map(location => (
                    <option key={location} value={location === 'Tất cả khu vực' ? '' : location} className="bg-gray-700 text-white">
                      {location}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
              </div>

              <div className="relative">
                <select
                  value={filters.timeSlot}
                  onChange={(e) => handleFilterChange('timeSlot', e.target.value)}
                  className="input-field w-full h-10 text-sm bg-gray-700 border-gray-600 appearance-none pr-8 text-white"
                >
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot === 'Mọi khung giờ' ? '' : slot} className="bg-gray-700 text-white">
                      {slot}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* Layout: Filters Left, Venues Right */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Date, Time & Quick Filters (25%) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="sticky top-20 space-y-4">
              {/* Date Selector */}
              <DateSelector
                selectedDate={filters.selectedDate}
                onDateChange={(date) => handleFilterChange('selectedDate', date)}
              />
              
              {/* Weather Widget */}
              <WeatherWidget />
              
              {/* Map Widget */}
              <MapWidget 
                venues={filteredVenues.map(venue => ({
                  ...venue,
                  lat: 10.7769 + Math.random() * 0.1,
                  lng: 106.7009 + Math.random() * 0.1
                }))}
                selectedVenue={selectedVenue}
                onVenueSelect={setSelectedVenue}
              />
            </div>
          </div>

          {/* Right Column - Advanced Filters & Venues (75%) */}
          <div className="lg:col-span-9">
            {/* Visual separator between basic and advanced filters */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-6"></div>
            
            {/* Filter Section Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  <span className="text-white font-medium">Tùy chọn lọc nâng cao</span>
                </div>
                <button 
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className={`group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                    showAdvancedFilters 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40' 
                      : 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200 hover:from-gray-600 hover:to-gray-700 hover:text-white'
                  }`}
                >
                  <SlidersHorizontal 
                    size={16} 
                    className={`transition-transform duration-300 ${
                      showAdvancedFilters ? 'rotate-180' : 'group-hover:rotate-12'
                    }`} 
                  />
                  <span className="font-semibold">Bộ lọc chi tiết</span>
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-300 ${
                      showAdvancedFilters ? 'rotate-180' : ''
                    }`} 
                  />
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {activeFiltersCount}
                    </span>
                  )}
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-gray-300 text-sm font-medium">Sắp xếp:</span>
                </div>
                <div className="relative">
                  <select className="input-field text-sm h-10 pl-3 pr-10 bg-gradient-to-r from-gray-700 to-gray-800 border-gray-600 text-white hover:from-gray-600 hover:to-gray-700 transition-all duration-300 appearance-none cursor-pointer">
                    <option className="bg-gray-700 text-white">🎯 Phù hợp nhất</option>
                    <option className="bg-gray-700 text-white">💰 Giá thấp đến cao</option>
                    <option className="bg-gray-700 text-white">💎 Giá cao đến thấp</option>
                    <option className="bg-gray-700 text-white">⭐ Đánh giá cao nhất</option>
                    <option className="bg-gray-700 text-white">📍 Khoảng cách gần nhất</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                </div>
                
                {activeFiltersCount > 0 && (
                  <button 
                    onClick={clearFilters} 
                    className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 transform hover:scale-105"
                  >
                    <X size={14} className="transition-transform duration-300 group-hover:rotate-90" />
                    <span className="font-semibold">Xóa tất cả bộ lọc</span>
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  </button>
                )}
              </div>
            </div>

            {/* Advanced Filters - Enhanced Design */}
            {showAdvancedFilters && (
              <div className="relative mb-6 animate-fadeIn">
                {/* Gradient Border Container */}
                <div className="p-[2px] rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 shadow-2xl shadow-purple-500/20">
                  <div className="card rounded-[10px] bg-gray-800 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600">
                          <SlidersHorizontal size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">Bộ lọc chi tiết</h3>
                          <p className="text-sm text-gray-400">Tùy chỉnh tìm kiếm của bạn</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowAdvancedFilters(false)}
                        className="group p-2 rounded-lg text-gray-400 hover:text-white hover:bg-red-500/20 transition-all duration-300"
                      >
                        <X size={20} className="transition-transform duration-300 group-hover:rotate-90" />
                      </button>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Price Filter - Enhanced */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <label className="text-sm font-semibold text-gray-300">
                            Giá tối đa (VNĐ/giờ)
                          </label>
                        </div>
                        <div className="space-y-3">
                          <div className="relative">
                            <input
                              type="range"
                              min="50000"
                              max="1000000"
                              step="50000"
                              value={filters.maxPrice}
                              onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-enhanced"
                            />
                            <div className="absolute top-0 left-0 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg pointer-events-none"
                                 style={{ width: `${(filters.maxPrice / 1000000) * 100}%` }}></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400">
                            <span className="px-2 py-1 bg-gray-700 rounded">50K</span>
                            <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded shadow-lg">
                              {filters.maxPrice === 1000000 ? '1M+' : `${(filters.maxPrice / 1000).toFixed(0)}K`}
                            </span>
                            <span className="px-2 py-1 bg-gray-700 rounded">1M+</span>
                          </div>
                        </div>
                      </div>

                      {/* Rating Filter - Enhanced */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <label className="text-sm font-semibold text-gray-300">
                            Đánh giá tối thiểu
                          </label>
                        </div>
                        <div className="p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                          {renderStarRating(filters.rating, (rating) => handleFilterChange('rating', rating))}
                        </div>
                      </div>

                      {/* Amenities - Enhanced Grid */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                          <label className="text-sm font-semibold text-gray-300">
                            Tiện ích
                          </label>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {amenityOptions.map(amenity => (
                            <label 
                              key={amenity.id} 
                              className={`group flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-105 ${
                                filters.amenities.includes(amenity.id)
                                  ? 'border-purple-500 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white shadow-lg shadow-purple-500/20'
                                  : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500 hover:bg-gray-700'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={filters.amenities.includes(amenity.id)}
                                onChange={() => handleAmenityToggle(amenity.id)}
                                className="sr-only"
                              />
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                                filters.amenities.includes(amenity.id)
                                  ? 'border-purple-500 bg-purple-500'
                                  : 'border-gray-500 group-hover:border-gray-400'
                              }`}>
                                {filters.amenities.includes(amenity.id) && (
                                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                              <span className="text-lg">{amenity.icon}</span>
                              <span className="text-sm font-medium flex-1">{amenity.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results Summary - Enhanced */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                      <Calendar size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {new Date(filters.selectedDate).toLocaleDateString('vi-VN', {
                          weekday: 'long',
                          year: 'numeric', 
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        {filters.timeSlot && filters.timeSlot !== 'Mọi khung giờ' && (
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            <span className="text-green-400 font-medium">{filters.timeSlot}</span>
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Target size={14} />
                          <span>Tìm thấy <span className="text-white font-bold">{filteredVenues.length}</span> sân phù hợp</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{filteredVenues.length}</div>
                    <div className="text-xs text-gray-400">Sân có sẵn</div>
                  </div>
                </div>
                
                {/* Booking Guide */}
                {filteredVenues.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-300">Chọn sân và nhấn "Đặt ngay" để tiếp tục</span>
                      </div>
                      <div className="flex items-center gap-1 text-lime-400 animate-bounce">
                        <span className="text-xs font-medium">Xem danh sách</span>
                        <ChevronDown size={14} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Active Filters Display - Enhanced */}
            {activeFiltersCount > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span className="text-sm font-medium text-gray-300">Bộ lọc đang áp dụng:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.venueType && filters.venueType !== 'Tất cả thể loại' && (
                    <span className="group inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      {filters.venueType}
                      <button
                        onClick={() => handleFilterChange('venueType', '')}
                        className="ml-1 p-1 hover:bg-purple-800 rounded-full transition-colors duration-200"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {filters.location && filters.location !== 'Tất cả khu vực' && (
                    <span className="group inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      {filters.location}
                      <button
                        onClick={() => handleFilterChange('location', '')}
                        className="ml-1 p-1 hover:bg-blue-800 rounded-full transition-colors duration-200"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {filters.timeSlot && filters.timeSlot !== 'Mọi khung giờ' && (
                    <span className="group inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white text-sm font-medium shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-105">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      {filters.timeSlot}
                      <button
                        onClick={() => handleFilterChange('timeSlot', '')}
                        className="ml-1 p-1 hover:bg-green-800 rounded-full transition-colors duration-200"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {filters.maxPrice < 1000000 && (
                    <span className="group inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-sm font-medium shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300 hover:scale-105">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      Dưới {(filters.maxPrice / 1000).toFixed(0)}K
                      <button
                        onClick={() => handleFilterChange('maxPrice', 1000000)}
                        className="ml-1 p-1 hover:bg-orange-800 rounded-full transition-colors duration-200"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {filters.rating > 0 && (
                    <span className="group inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm font-medium shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300 hover:scale-105">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      {filters.rating}+ ⭐
                      <button
                        onClick={() => handleFilterChange('rating', 0)}
                        className="ml-1 p-1 hover:bg-yellow-700 rounded-full transition-colors duration-200"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {filters.amenities.map(amenity => {
                    const amenityLabel = amenityOptions.find(a => a.id === amenity)?.label || amenity;
                    const amenityIcon = amenityOptions.find(a => a.id === amenity)?.icon || '';
                    return (
                      <span key={amenity} className="group inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white text-sm font-medium shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        {amenityIcon} {amenityLabel}
                        <button
                          onClick={() => handleAmenityToggle(amenity)}
                          className="ml-1 p-1 hover:bg-teal-800 rounded-full transition-colors duration-200"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Venues List Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-lime-500 to-green-500 rounded-lg">
                    <span className="text-white font-bold">🏟️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Danh sách sân có sẵn</h3>
                    <p className="text-sm text-gray-400">Nhấn "Đặt ngay" trên sân bạn muốn để tiếp tục quy trình đặt sân</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2 bg-lime-500/10 border border-lime-500/30 rounded-lg px-3 py-2">
                  <span className="text-lime-400 text-sm font-medium">💡 Lưu ý: Kiểm tra giá và khung giờ trước khi đặt</span>
                </div>
              </div>
            </div>

            {/* Venues List */}
            <div className="space-y-4 venues-list-section">
              {filteredVenues.map((venue) => (
                <div key={venue.id} className="w-full">
                  <VenueCard
                    venue={venue}
                    selectedDate={filters.selectedDate}
                    selectedTimeSlot={filters.timeSlot}
                    onBook={handleVenueBook}
                  />
                </div>
              ))}
            </div>

            {/* Empty State - Enhanced */}
            {filteredVenues.length === 0 && (
              <div className="text-center py-16">
                <div className="relative mb-8">
                  <div className="text-8xl mb-4 animate-bounce">🏟️</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Không tìm thấy sân phù hợp</h3>
                <p className="text-gray-400 mb-8 text-base max-w-md mx-auto leading-relaxed">
                  Không có sân nào có sẵn cho ngày và khung giờ đã chọn. 
                  Thử chọn ngày khác hoặc điều chỉnh bộ lọc.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-sm mx-auto">
                  <button 
                    onClick={() => handleFilterChange('selectedDate', getTodayDate())}
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Calendar size={16} />
                    Chọn hôm nay
                  </button>
                  <button 
                    onClick={clearFilters} 
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <X size={16} />
                    Xóa tất cả bộ lọc
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Summary Modal */}
      {showBookingSummary && selectedVenue && (
        <BookingSummaryModal
          isOpen={showBookingSummary}
          onClose={handleCloseBookingSummary}
          venue={venues.find(v => v.id === selectedVenue)}
          preSelectedDate={filters.selectedDate}
          preSelectedTimeSlot={filters.timeSlot}
        />
      )}

      {/* Scroll to Venues Floating Button */}
      <button
        onClick={() => {
          const venuesSection = document.querySelector('.venues-list-section');
          if (venuesSection) {
            venuesSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="fixed bottom-6 right-6 z-50 group bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-400 hover:to-green-400 text-white p-4 rounded-full shadow-2xl hover:shadow-lime-500/25 transition-all duration-300 transform hover:scale-110 md:hidden"
        title="Xem danh sách sân"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">🏟️</span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
        <div className="absolute -top-12 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Xem danh sách sân
        </div>
      </button>
    </div>
  );
};

export default BookingPage;