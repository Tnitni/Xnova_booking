import React from 'react';
import { Edit, MapPin, Calendar, Trophy, Users, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please login to view your profile</h2>
        </div>
      </div>
    );
  }

  const bookingHistory = [
    {
      id: '1',
      venue: 'Sân Cầu Lông Quận 1',
      date: '2024-01-10',
      time: '19:00 - 21:00',
      price: 200000,
      status: 'completed'
    },
    {
      id: '2',
      venue: 'Sân Bóng Đá Mini Q7',
      date: '2024-01-15',
      time: '18:00 - 20:00',
      price: 350000,
      status: 'upcoming'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="card text-center">
              <div className="relative mb-6">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <button className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 bg-purple-600 rounded-full p-2 hover:bg-purple-700 transition-colors">
                  <Edit size={16} className="text-white" />
                </button>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
              <p className="text-gray-400 mb-4">{user.email}</p>
              
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className={`skill-badge ${
                  user.skillLevel === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' : 
                  user.skillLevel === 'advanced' ? 'bg-red-500/20 text-red-400' : 
                  'bg-green-500/20 text-green-400'
                }`}>
                  {user.skillLevel}
                </span>
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-400 mr-1" />
                  <span className="text-white">4.8</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24</div>
                  <div className="text-gray-400 text-sm">Games Played</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">18</div>
                  <div className="text-gray-400 text-sm">Wins</div>
                </div>
              </div>
              
              <button className="btn-primary w-full">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4">Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <Trophy size={24} className="text-white" />
                  </div>
                  <div className="text-lg font-bold text-white">5</div>
                  <div className="text-gray-400 text-sm">Tournaments</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users size={24} className="text-gray-900" />
                  </div>
                  <div className="text-lg font-bold text-white">42</div>
                  <div className="text-gray-400 text-sm">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <Calendar size={24} className="text-white" />
                  </div>
                  <div className="text-lg font-bold text-white">156</div>
                  <div className="text-gray-400 text-sm">Hours Played</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                    <MapPin size={24} className="text-gray-900" />
                  </div>
                  <div className="text-lg font-bold text-white">12</div>
                  <div className="text-gray-400 text-sm">Venues</div>
                </div>
              </div>
            </div>

            {/* Booking History */}
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4">Booking History</h3>
              <div className="space-y-4">
                {bookingHistory.map((booking) => (
                  <div key={booking.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{booking.venue}</h4>
                      <span className={`status-badge ${
                        booking.status === 'completed' ? 'status-available' : 'status-intermediate'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-gray-400 text-sm">
                      <span>{booking.date} • {booking.time}</span>
                      <span className="text-green-400 font-semibold">
                        {booking.price.toLocaleString()}đ
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4">Achievements</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: 'First Match', description: 'Played your first game', earned: true },
                  { name: 'Team Player', description: 'Joined 5 different teams', earned: true },
                  { name: 'Regular', description: 'Played 10 games this month', earned: true },
                  { name: 'Champion', description: 'Won 3 tournaments', earned: false },
                  { name: 'Social Butterfly', description: 'Made 20 new connections', earned: false },
                  { name: 'Venue Explorer', description: 'Played at 15 different venues', earned: false }
                ].map((achievement, index) => (
                  <div key={index} className={`bg-gray-800 rounded-lg p-4 ${achievement.earned ? 'border-2 border-yellow-500' : ''}`}>
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        achievement.earned ? 'bg-yellow-500' : 'bg-gray-700'
                      }`}>
                        <Trophy size={20} className={achievement.earned ? 'text-gray-900' : 'text-gray-500'} />
                      </div>
                      <h4 className={`font-medium mb-1 ${achievement.earned ? 'text-yellow-400' : 'text-gray-400'}`}>
                        {achievement.name}
                      </h4>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;