import React from 'react';
import { MessageCircle, UserPlus, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Player {
  id: string;
  name: string;
  avatar: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  location: string;
  preferredTime: string;
  isAvailable: boolean;
}

interface PlayerCardProps {
  player: Player;
  onMessage?: (playerId: string) => void;
  onInvite?: (playerId: string) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onMessage, onInvite }) => {
  const { t } = useLanguage();

  const getSkillBadgeColor = (skill: string) => {
    switch (skill) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="card hover-scale">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            src={player.avatar}
            alt={player.name}
            className="player-avatar"
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${
            player.isAvailable ? 'bg-green-400' : 'bg-gray-500'
          }`}></div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-white">{player.name}</h3>
            <div className="flex items-center">
              <Star size={14} className="text-yellow-400 mr-1" />
              <span className="text-white font-medium">{player.rating}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <span className={`skill-badge ${getSkillBadgeColor(player.skillLevel)}`}>
              {t(`matching.${player.skillLevel}`)}
            </span>
            <span className={`status-badge ${player.isAvailable ? 'status-available' : 'status-busy'}`}>
              {player.isAvailable ? t('venues.available') : 'Busy'}
            </span>
          </div>

          <div className="text-sm text-gray-400 mb-4">
            <p>{player.location}</p>
            <p>Preferred time: {player.preferredTime}</p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onMessage?.(player.id)}
              className="flex-1 btn-primary flex items-center justify-center"
            >
              <MessageCircle size={16} className="mr-2" />
              Message
            </button>
            <button
              onClick={() => onInvite?.(player.id)}
              className="flex-1 btn-secondary flex items-center justify-center"
            >
              <UserPlus size={16} className="mr-2" />
              Invite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;