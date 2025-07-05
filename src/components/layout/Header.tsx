import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import LoginModal from '../modals/LoginModal';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-gray-900/90 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-gradient">Xnova</div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/booking" 
                className={`nav-link ${isActive('/booking') ? 'active' : ''}`}
              >
                {t('nav.booking')}
              </Link>
              <Link 
                to="/player-matching" 
                className={`nav-link ${isActive('/player-matching') ? 'active' : ''}`}
              >
                {t('nav.matching')}
              </Link>
            </nav>

            {/* Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="nav-link flex items-center"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Language Toggle */}
              <button
                onClick={handleLanguageToggle}
                className="flex items-center space-x-2 nav-link"
              >
                <Globe size={16} />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </button>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="nav-link">
                    <div className="flex items-center space-x-2">
                      <img 
                        src={user?.avatar} 
                        alt={user?.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{user?.name}</span>
                    </div>
                  </Link>
                  <button onClick={handleLogout} className="btn-primary">
                    Logout
                  </button>
                </div>
              ) : (
                <button onClick={() => setIsLoginOpen(true)} className="btn-primary">
                  <User size={16} className="mr-2" />
                  {t('nav.login')}
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden nav-link"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.home')}
                </Link>
                <Link 
                  to="/booking" 
                  className={`nav-link ${isActive('/booking') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.booking')}
                </Link>
                <Link 
                  to="/player-matching" 
                  className={`nav-link ${isActive('/player-matching') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.matching')}
                </Link>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={toggleTheme}
                      className="nav-link flex items-center"
                      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                    
                    <button
                      onClick={handleLanguageToggle}
                      className="flex items-center space-x-2 nav-link"
                    >
                      <Globe size={16} />
                      <span className="text-sm font-medium">{language.toUpperCase()}</span>
                    </button>
                  </div>
                  
                  {isAuthenticated ? (
                    <div className="flex flex-col space-y-2">
                      <Link to="/profile" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        <div className="flex items-center space-x-2">
                          <img 
                            src={user?.avatar} 
                            alt={user?.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span>{user?.name}</span>
                        </div>
                      </Link>
                      <button onClick={handleLogout} className="btn-primary">
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => {
                        setIsLoginOpen(true);
                        setIsMenuOpen(false);
                      }} 
                      className="btn-primary"
                    >
                      <User size={16} className="mr-2" />
                      {t('nav.login')}
                    </button>
                  )}
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Header;