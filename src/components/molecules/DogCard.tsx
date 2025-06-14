import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Calendar } from 'lucide-react';
import { Dog } from '../../types';
import { Button } from '../atoms/Button';

interface DogCardProps {
  dog: Dog;
  onViewDetails: (dogId: string) => void;
  featured?: boolean;
}

export const DogCard: React.FC<DogCardProps> = ({
  dog,
  onViewDetails,
  featured = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${
        featured ? 'ring-2 ring-accent-400 shadow-2xl' : ''
      }`}
    >
      <div className="relative">
        <img
          src={dog.images[0] || 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg'}
          alt={dog.name}
          className="w-full h-64 object-cover"
        />
        {featured && (
          <div className="absolute top-4 left-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
        <div className="absolute top-4 right-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
          >
            <Heart className="w-5 h-5 text-neutral-600 hover:text-red-500" />
          </motion.button>
        </div>
        <div className={`absolute bottom-0 left-0 right-0 h-1 ${
          dog.status === 'available' ? 'bg-green-500' :
          dog.status === 'reserved' ? 'bg-yellow-500' :
          dog.status === 'sold' ? 'bg-red-500' : 'bg-blue-500'
        }`} />
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-neutral-800 mb-1">{dog.name}</h3>
            <p className="text-neutral-600 text-sm">{dog.bloodline} Bloodline</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary-600">
              {dog.price ? `$${dog.price.toLocaleString()}` : 'N/A'}
            </p>
            <p className="text-sm text-neutral-500 capitalize">{dog.status}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-neutral-600">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{dog.age} years</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4" />
            <span>{dog.achievements.length} awards</span>
          </div>
        </div>
        
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
          {dog.description}
        </p>
        
        <div className="flex gap-2">
          <Button
            onClick={() => onViewDetails(dog.id)}
            className="flex-1"
            size="sm"
          >
            View Details
          </Button>
          {dog.available && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
            >
              Contact Us
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};