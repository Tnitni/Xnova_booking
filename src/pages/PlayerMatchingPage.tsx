import React, { useState } from 'react';
import { Search, Filter, Users, Plus, MessageCircle, Trophy, Star, Crown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import PlayerCard from '../components/PlayerCard';

const PlayerMatchingPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');

  const availableMatches = [
    {
      id: '1',
      title: 'Trận đấu chủ nhật',
      location: 'Quận 1, TP.HCM',
      time: '08:00 - 10:00',
      date: '2024-01-15',
      currentPlayers: 6,
      maxPlayers: 10,
      skillLevel: 'intermediate',
      price: 75000,
      organizer: {
        name: 'Alex Johnson',
        avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      }
    },
    {
      id: '2',
      title: 'Giao hữu 7v7',
      location: 'Quận 7, TP.HCM',
      time: '19:00 - 21:00',
      date: '2024-01-16',
      currentPlayers: 8,
      maxPlayers: 14,
      skillLevel: 'advanced',
      price: 125000,
      organizer: {
        name: 'Maria Santos',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      }
    },
    {
      id: '3',
      title: 'Trận đấu cạnh tranh',
      location: 'Quận 2, TP.HCM',
      time: '16:00 - 18:00',
      date: '2024-01-17',
      currentPlayers: 4,
      maxPlayers: 8,
      skillLevel: 'advanced',
      price: 150000,
      organizer: {
        name: 'David Kim',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      }
    },
    {
      id: '4',
      title: 'Trận đấu sáng sớm',
      location: 'Quận 3, TP.HCM',
      time: '06:00 - 08:00',
      date: '2024-01-18',
      currentPlayers: 2,
      maxPlayers: 6,
      skillLevel: 'beginner',
      price: 50000,
      organizer: {
        name: 'Sarah Chen',
        avatar: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      }
    },
    {
      id: '5',
      title: 'Giải đấu mini',
      location: 'Quận 5, TP.HCM',
      time: '14:00 - 18:00',
      date: '2024-01-19',
      currentPlayers: 12,
      maxPlayers: 16,
      skillLevel: 'intermediate',
      price: 200000,
      organizer: {
        name: 'Michael Torres',
        avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      }
    },
    {
      id: '6',
      title: 'Trận đấu cuối tuần',
      location: 'Quận 6, TP.HCM',
      time: '20:00 - 22:00',
      date: '2024-01-20',
      currentPlayers: 5,
      maxPlayers: 10,
      skillLevel: 'intermediate',
      price: 90000,
      organizer: {
        name: 'Emma Wilson',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      }
    }
  ];

  const topPlayers = [
    {
      id: '1',
      rank: 1,
      name: 'Alex Johnson',
      avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      skillLevel: 'advanced' as const,
      rating: 4.9,
      wins: 45,
      totalGames: 50,
      location: 'Quận 1, TP.HCM',
      isAvailable: true,
      points: 2850
    },
    {
      id: '2',
      rank: 2,
      name: 'Maria Santos',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      skillLevel: 'advanced' as const,
      rating: 4.8,
      wins: 42,
      totalGames: 48,
      location: 'Quận 7, TP.HCM',
      isAvailable: true,
      points: 2720
    },
    {
      id: '3',
      rank: 3,
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      skillLevel: 'advanced' as const,
      rating: 4.7,
      wins: 38,
      totalGames: 45,
      location: 'Quận 2, TP.HCM',
      isAvailable: false,
      points: 2650
    },
    {
      id: '4',
      rank: 4,
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      skillLevel: 'intermediate' as const,
      rating: 4.6,
      wins: 35,
      totalGames: 42,
      location: 'Quận 3, TP.HCM',
      isAvailable: true,
      points: 2480
    },
    {
      id: '5',
      rank: 5,
      name: 'Michael Torres',
      avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      skillLevel: 'intermediate' as const,
      rating: 4.5,
      wins: 32,
      totalGames: 40,
      location: 'Quận 5, TP.HCM',
      isAvailable: true,
      points: 2350
    },
    {
      id: '6',
      rank: 6,
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      skillLevel: 'intermediate' as const,
      rating: 4.4,
      wins: 28,
      totalGames: 35,
      location: 'Quận 6, TP.HCM',
      isAvailable: true,
      points: 2200
    },
    {
      id: '7',
      rank: 7,
      name: 'James Wilson',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      skillLevel: 'beginner' as const,
      rating: 4.2,
      wins: 25,
      totalGames: 32,
      location: 'Quận 4, TP.HCM',
      isAvailable: false,
      points: 2050
    },
    {
      id: '8',
      rank: 8,
      name: 'Lisa Park',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      skillLevel: 'intermediate' as const,
      rating: 4.3,
      wins: 22,
      totalGames: 28,
      location: 'Quận 8, TP.HCM',
      isAvailable: true,
      points: 1980
    }
  ];

  const getSkillBadgeColor = (skill: string) => {
    switch (skill) {
      case 'beginner':
        return 'status-available';
      case 'intermediate':
        return 'status-intermediate';
      case 'advanced':
        return 'status-busy';
      default:
        return 'status-available';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="text-yellow-400" size={20} />;
    if (rank === 2) return <Trophy className="text-gray-300" size={18} />;
    if (rank === 3) return <Trophy className="text-orange-400" size={16} />;
    return <span className="text-gray-400 font-bold">#{rank}</span>;
  };

  const filteredMatches = availableMatches.filter(match => {
    const matchesSearch = match.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill === 'all' || match.skillLevel === selectedSkill;
    return matchesSearch && matchesSkill;
  });

  const handlePlayerMessage = (playerId: string) => {
    console.log('Message player:', playerId);
  };

  const handlePlayerInvite = (playerId: string) => {
    console.log('Invite player:', playerId);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">{t('matching.title')}</h1>
          <p className="text-gray-400">
            {t('matching.description')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button className="btn-secondary flex items-center justify-center">
            <Plus size={16} className="mr-2" />
            {t('matching.joinCommunity')}
          </button>
          <button className="btn-primary flex items-center justify-center">
            <Users size={16} className="mr-2" />
            {t('matching.createGroup')}
          </button>
        </div>

        {/* Search and Filters Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Tìm kiếm trận đấu hoặc người chơi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="input-field"
              >
                <option value="all">Tất cả trình độ</option>
                <option value="beginner">Mới bắt đầu</option>
                <option value="intermediate">Trung cấp</option>
                <option value="advanced">Nâng cao</option>
              </select>
              <button className="btn-primary flex items-center">
                <Filter size={16} className="mr-2" />
                {t('common.filter')}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Available Matches - 8/12 width */}
          <div className="lg:col-span-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">{t('matching.availableMatches')}</h2>
              <p className="text-gray-400 mb-4">
                Tìm thấy <span className="text-white font-semibold">{filteredMatches.length}</span> trận đấu phù hợp
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {filteredMatches.map((match) => (
                <div key={match.id} className="card hover-scale">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{match.title}</h3>
                    <span className={`status-badge ${getSkillBadgeColor(match.skillLevel)}`}>
                      {t(`matching.${match.skillLevel}`)}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Users size={14} className="mr-2" />
                      <span>{match.currentPlayers}/{match.maxPlayers} người chơi</span>
                      <div className="ml-auto">
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-secondary h-2 rounded-full" 
                            style={{ width: `${(match.currentPlayers / match.maxPlayers) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Search size={14} className="mr-2" />
                      <span>{match.location}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <span>{match.time} • {match.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={match.organizer.avatar}
                        alt={match.organizer.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-400">{match.organizer.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-semibold">
                        {match.price.toLocaleString()}đ
                      </div>
                      <button className="btn-secondary mt-2 text-sm">
                        Tham gia bây giờ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredMatches.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⚽</div>
                <h3 className="text-xl font-semibold text-white mb-2">Không tìm thấy trận đấu</h3>
                <p className="text-gray-400">
                  Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
                </p>
              </div>
            )}
          </div>

          {/* Top Players Ranking - 4/12 width */}
          <div className="lg:col-span-4">
            <div className="card sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Bảng xếp hạng</h2>
                <Trophy className="text-yellow-400" size={24} />
              </div>

              <div className="space-y-4">
                {topPlayers.map((player) => (
                  <div key={player.id} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(player.rank)}
                    </div>
                    
                    <div className="relative">
                      <img
                        src={player.avatar}
                        alt={player.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${
                        player.isAvailable ? 'bg-green-400' : 'bg-gray-500'
                      }`}></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-medium truncate">{player.name}</h4>
                        <div className="flex items-center">
                          <Star size={12} className="text-yellow-400 mr-1" />
                          <span className="text-white text-sm">{player.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span className={`skill-badge ${getSkillBadgeColor(player.skillLevel)} text-xs`}>
                          {t(`matching.${player.skillLevel}`)}
                        </span>
                        <span>{player.points} pts</span>
                      </div>
                      
                      <div className="text-xs text-gray-500 mt-1">
                        {player.wins}W/{player.totalGames - player.wins}L • {player.location}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => handlePlayerMessage(player.id)}
                        className="p-1 bg-purple-600 hover:bg-purple-700 rounded transition-colors"
                        title="Nhắn tin"
                      >
                        <MessageCircle size={14} className="text-white" />
                      </button>
                      <button
                        onClick={() => handlePlayerInvite(player.id)}
                        className="p-1 bg-green-600 hover:bg-green-700 rounded transition-colors"
                        title="Mời chơi"
                      >
                        <Plus size={14} className="text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-700">
                <button className="w-full btn-primary text-sm">
                  Xem bảng xếp hạng đầy đủ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="floating-action">
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

export default PlayerMatchingPage;