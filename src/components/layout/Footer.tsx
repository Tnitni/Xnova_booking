import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-gradient">Xnova</div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Nền tảng đặt sân thể thao hàng đầu Việt Nam. Kết nối người chơi với những sân bãi chất lượng cao nhất.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400 text-sm">
                <MapPin size={16} className="mr-2 text-purple-400" />
                <span>123 Nguyễn Huệ, Quận 1, TP.HCM</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Phone size={16} className="mr-2 text-purple-400" />
                <span>+84 28 1234 5678</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Mail size={16} className="mr-2 text-purple-400" />
                <span>support@xnova.vn</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Liên kết nhanh</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Trang chủ
              </Link>
              <Link to="/booking" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Đặt sân
              </Link>
              <Link to="/player-matching" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Tìm đối bóng
              </Link>
              <Link to="/venues" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Danh sách sân
              </Link>
              <Link to="/tournaments" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Giải đấu
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Về chúng tôi
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Dịch vụ</h3>
            <div className="space-y-2">
              <Link to="/badminton" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Sân cầu lông
              </Link>
              <Link to="/football" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Sân bóng đá
              </Link>
              <Link to="/tennis" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Sân tennis
              </Link>
              <Link to="/basketball" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Sân bóng rổ
              </Link>
              <Link to="/volleyball" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Sân bóng chuyền
              </Link>
              <Link to="/equipment" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Thuê dụng cụ
              </Link>
            </div>
          </div>

          {/* Support & Legal */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Hỗ trợ</h3>
            <div className="space-y-2">
              <Link to="/help" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Trung tâm trợ giúp
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Liên hệ
              </Link>
              <Link to="/faq" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Câu hỏi thường gặp
              </Link>
              <Link to="/booking-guide" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Hướng dẫn đặt sân
              </Link>
              <Link to="/payment-guide" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Hướng dẫn thanh toán
              </Link>
              <Link to="/cancellation" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Chính sách hủy đặt
              </Link>
            </div>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">Theo dõi chúng tôi:</span>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Youtube size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <span className="text-gray-400 text-sm">Đăng ký nhận tin:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="input-field rounded-r-none text-sm"
                />
                <button className="btn-secondary rounded-l-none px-4 text-sm">
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* App Download */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center">
            <h4 className="text-white font-semibold mb-4">Tải ứng dụng Xnova</h4>
            <div className="flex justify-center space-x-4">
              <a href="#" className="block">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Get it on Google Play" 
                  className="h-12"
                />
              </a>
              <a href="#" className="block">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                  alt="Download on the App Store" 
                  className="h-12"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-purple-400 transition-colors">
                Chính sách bảo mật
              </Link>
              <Link to="/terms" className="hover:text-purple-400 transition-colors">
                Điều khoản sử dụng
              </Link>
              <Link to="/cookies" className="hover:text-purple-400 transition-colors">
                Chính sách Cookie
              </Link>
              <Link to="/sitemap" className="hover:text-purple-400 transition-colors">
                Sơ đồ trang web
              </Link>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 Xnova. Tất cả quyền được bảo lưu.
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="border-t border-gray-800 mt-6 pt-6">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">SSL</span>
              </div>
              <span>Bảo mật SSL</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">24/7</span>
              </div>
              <span>Hỗ trợ 24/7</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">✓</span>
              </div>
              <span>Đã xác thực</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;