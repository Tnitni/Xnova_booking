import { Venue } from '../types/venue';
import { getNextDays } from '../utils/dateUtils';

// Generate mock availability for the next 30 days
const generateAvailability = (venueId: string) => {
  const dates = getNextDays(30);
  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  return dates.map(date => ({
    date,
    timeSlots: timeSlots.map(time => ({
      time,
      isAvailable: Math.random() > 0.2, // 80% chance of being available
      price: undefined // Use base price
    }))
  }));
};

export const venues: Venue[] = [
  {
    id: '1',
    name: 'Sân Cầu Lông Premium Quận 1',
    location: 'Quận 1, TP.HCM',
    distance: '1.2 km',
    image: 'https://images.pexels.com/photos/8007334/pexels-photo-8007334.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    rating: 4.8,
    reviews: 124,
    basePrice: 200000,
    amenities: ['wifi', 'parking', 'camera', 'ac'],
    type: 'Cầu lông',
    description: 'Sân cầu lông chất lượng cao với hệ thống chiếu sáng LED hiện đại và sàn gỗ chuyên nghiệp',
    availability: generateAvailability('1')
  },
  {
    id: '2',
    name: 'Sân Bóng Đá Mini Phú Mỹ Hưng',
    location: 'Quận 7, TP.HCM',
    distance: '2.5 km',
    image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    rating: 4.6,
    reviews: 89,
    basePrice: 350000,
    amenities: ['wifi', 'parking', 'free-water'],
    type: 'Bóng đá',
    description: 'Sân bóng đá mini 7v7 với cỏ nhân tạo cao cấp, hệ thống tưới tự động',
    availability: generateAvailability('2')
  },
  {
    id: '3',
    name: 'Sân Tennis Landmark 81',
    location: 'Quận 2, TP.HCM',
    distance: '3.1 km',
    image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    rating: 4.9,
    reviews: 156,
    basePrice: 180000,
    amenities: ['wifi', 'parking', 'camera', 'ac', 'free-water'],
    type: 'Tennis',
    description: 'Sân tennis tiêu chuẩn quốc tế với mặt sân acrylic, view thành phố tuyệt đẹp',
    availability: generateAvailability('3')
  },
  {
    id: '4',
    name: 'Sân Bóng Rổ Thảo Điền',
    location: 'Quận 2, TP.HCM',
    distance: '4.2 km',
    image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    rating: 4.7,
    reviews: 203,
    basePrice: 220000,
    amenities: ['wifi', 'parking', 'ac'],
    type: 'Bóng rổ',
    description: 'Sân bóng rổ trong nhà với hệ thống điều hòa, sàn gỗ chuyên nghiệp',
    availability: generateAvailability('4')
  },
  {
    id: '5',
    name: 'Sân Cầu Lông Bình Thạnh',
    location: 'Quận Bình Thạnh, TP.HCM',
    distance: '3.8 km',
    image: 'https://images.pexels.com/photos/8007334/pexels-photo-8007334.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    rating: 4.5,
    reviews: 67,
    basePrice: 160000,
    amenities: ['parking', 'camera', 'free-water'],
    type: 'Cầu lông',
    description: 'Sân cầu lông giá rẻ với chất lượng tốt, phù hợp cho người mới chơi',
    availability: generateAvailability('5')
  },
  {
    id: '6',
    name: 'Sân Bóng Đá 11v11 Phú Mỹ Hưng',
    location: 'Quận 7, TP.HCM',
    distance: '5.1 km',
    image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    rating: 4.8,
    reviews: 145,
    basePrice: 800000,
    amenities: ['wifi', 'parking', 'camera', 'ac', 'free-water'],
    type: 'Bóng đá',
    description: 'Sân bóng đá 11v11 tiêu chuẩn FIFA với cỏ tự nhiên, phòng thay đồ cao cấp',
    availability: generateAvailability('6')
  },
  {
    id: '7',
    name: 'Sân Bóng Chuyền Quận 3',
    location: 'Quận 3, TP.HCM',
    distance: '2.8 km',
    image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    rating: 4.4,
    reviews: 78,
    basePrice: 150000,
    amenities: ['wifi', 'parking'],
    type: 'Bóng chuyền',
    description: 'Sân bóng chuyền trong nhà với lưới chuyên nghiệp, sàn cao su chống trượt',
    availability: generateAvailability('7')
  },
  {
    id: '8',
    name: 'Sân Tennis Quận 1 Premium',
    location: 'Quận 1, TP.HCM',
    distance: '1.8 km',
    image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    rating: 4.9,
    reviews: 234,
    basePrice: 250000,
    amenities: ['wifi', 'parking', 'camera', 'ac', 'free-water'],
    type: 'Tennis',
    description: 'Sân tennis cao cấp với mặt sân hard court, hệ thống chiếu sáng LED',
    availability: generateAvailability('8')
  }
];