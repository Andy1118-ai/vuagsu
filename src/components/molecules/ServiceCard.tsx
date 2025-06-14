import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, CheckCircle } from 'lucide-react';
import { Service } from '../../types';
import { Button } from '../atoms/Button';

interface ServiceCardProps {
  service: Service;
  onBookNow: (serviceId: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBookNow }) => {
  const categoryColors = {
    training: 'bg-blue-100 text-blue-800',
    boarding: 'bg-green-100 text-green-800',
    breeding: 'bg-purple-100 text-purple-800',
    healthcare: 'bg-red-100 text-red-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[service.category]}`}>
            {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-neutral-800 mb-2">{service.name}</h3>
        <p className="text-neutral-600 text-sm mb-4">{service.description}</p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-neutral-600">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>${service.price}/session</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{service.duration} min</span>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium text-neutral-800 mb-2">Features:</h4>
          <ul className="space-y-1">
            {service.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-neutral-600">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                {feature}
              </li>
            ))}
            {service.features.length > 3 && (
              <li className="text-sm text-neutral-500">
                +{service.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>
        
        <Button
          onClick={() => onBookNow(service.id)}
          className="w-full"
        >
          Book Now
        </Button>
      </div>
    </motion.div>
  );
};