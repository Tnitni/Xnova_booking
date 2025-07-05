import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'vi';
  setLanguage: (lang: 'en' | 'vi') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.booking': 'Book Field',
    'nav.matching': 'Find Teammates',
    'nav.login': 'Login',
    
    // Hero Section
    'hero.title': 'Your Next Game',
    'hero.subtitle': 'STARTS HERE',
    'hero.description': 'Book the best sports venues in your area instantly',
    'hero.searchPlaceholder': 'Search location...',
    'hero.bookNow': 'Book Now',
    'hero.findPlayer': 'Find Player',
    
    // Features
    'features.title': 'Why Choose Xnova',
    'features.description': 'Experience the best sports venue booking platform',
    'features.bestVenues': 'Best Venues',
    'features.bestVenuesDesc': 'Premium sports facilities',
    'features.quickBooking': 'Quick Booking',
    'features.quickBookingDesc': 'Book in just a few clicks',
    'features.teamMatching': 'Team Matching',
    'features.teamMatchingDesc': 'Find perfect teammates',
    
    // Venues
    'venues.title': 'Featured Venues',
    'venues.bookNow': 'Book Now',
    'venues.available': 'Available',
    'venues.perHour': '/hour',
    
    // Booking
    'booking.title': 'Book Your Venue',
    'booking.location': 'Location',
    'booking.date': 'Date',
    'booking.time': 'Time',
    'booking.field': 'Field',
    'booking.players': 'Players',
    'booking.totalPrice': 'Total Price',
    'booking.perPlayer': 'Per player',
    'booking.confirmBooking': 'Confirm Booking',
    'booking.freeCancellation': 'Free cancellation up to 24h before',
    'booking.notSelected': 'Not selected',
    
    // Player Matching
    'matching.title': 'Find Suitable Partners',
    'matching.description': 'Connect with players who match your skill level and schedule',
    'matching.joinCommunity': 'Join Community',
    'matching.createGroup': 'Create Group',
    'matching.availableMatches': 'Available Matches',
    'matching.featuredPlayers': 'Featured Players',
    'matching.intermediate': 'Intermediate',
    'matching.advanced': 'Advanced',
    'matching.beginner': 'Beginner',
    
    // Common
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading...',
  },
  vi: {
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.booking': 'Đặt sân',
    'nav.matching': 'Tìm đối bóng',
    'nav.login': 'Đăng nhập',
    
    // Hero Section
    'hero.title': 'Trận đấu tiếp theo',
    'hero.subtitle': 'BẮT ĐẦU TỪ ĐÂY',
    'hero.description': 'Đặt sân thể thao tốt nhất trong khu vực của bạn ngay lập tức',
    'hero.searchPlaceholder': 'Tìm kiếm địa điểm...',
    'hero.bookNow': 'Đặt ngay',
    'hero.findPlayer': 'Tìm người chơi',
    
    // Features
    'features.title': 'Vì sao chọn Xnova',
    'features.description': 'Trải nghiệm nền tảng đặt sân thể thao tốt nhất',
    'features.bestVenues': 'Sân bãi tốt nhất',
    'features.bestVenuesDesc': 'Cơ sở thể thao cao cấp',
    'features.quickBooking': 'Đặt sân nhanh chóng',
    'features.quickBookingDesc': 'Đặt sân chỉ trong vài cú click',
    'features.teamMatching': 'Ghép đội',
    'features.teamMatchingDesc': 'Tìm đồng đội hoàn hảo',
    
    // Venues
    'venues.title': 'Sân nổi bật',
    'venues.bookNow': 'Đặt ngay',
    'venues.available': 'Có sẵn',
    'venues.perHour': '/giờ',
    
    // Booking
    'booking.title': 'Đặt sân của bạn',
    'booking.location': 'Địa điểm',
    'booking.date': 'Ngày',
    'booking.time': 'Giờ',
    'booking.field': 'Sân',
    'booking.players': 'Người chơi',
    'booking.totalPrice': 'Tổng giá',
    'booking.perPlayer': 'Mỗi người',
    'booking.confirmBooking': 'Xác nhận đặt sân',
    'booking.freeCancellation': 'Miễn phí hủy đến 24h trước',
    'booking.notSelected': 'Chưa chọn',
    
    // Player Matching
    'matching.title': 'Tìm đối bóng phù hợp',
    'matching.description': 'Kết nối với những người chơi phù hợp với trình độ và thời gian của bạn',
    'matching.joinCommunity': 'Tham gia cộng đồng',
    'matching.createGroup': 'Tạo nhóm',
    'matching.availableMatches': 'Trận đấu có sẵn',
    'matching.featuredPlayers': 'Người chơi nổi bật',
    'matching.intermediate': 'Trung cấp',
    'matching.advanced': 'Nâng cao',
    'matching.beginner': 'Mới bắt đầu',
    
    // Common
    'common.search': 'Tìm kiếm',
    'common.filter': 'Lọc',
    'common.close': 'Đóng',
    'common.save': 'Lưu',
    'common.cancel': 'Hủy',
    'common.loading': 'Đang tải...',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'vi'>('vi');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};