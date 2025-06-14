import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ServiceCard } from '../components/molecules/ServiceCard';
import { Service } from '../types';

// Mock data for demonstration
const mockServices: Service[] = [
  {
    id: '1',
    name: 'Puppy Basic Training',
    description: 'Foundation training program for puppies 8-16 weeks old. Covers socialization, basic commands, and house training.',
    price: 150,
    duration: 60,
    category: 'training',
    features: [
      'Basic commands (sit, stay, come, down)',
      'House training fundamentals',
      'Socialization with people and dogs',
      'Leash walking basics',
      'Crate training guidance',
      'Behavioral problem prevention'
    ],
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
  },
  {
    id: '2',
    name: 'Adult Dog Obedience',
    description: 'Comprehensive obedience training for adult dogs. Perfect for reinforcing commands and correcting behavioral issues.',
    price: 200,
    duration: 90,
    category: 'training',
    features: [
      'Advanced command training',
      'Behavioral modification',
      'Impulse control exercises',
      'Distraction proofing',
      'Off-leash reliability',
      'Problem-solving techniques'
    ],
    image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg',
  },
  {
    id: '3',
    name: 'Protection Training',
    description: 'Professional protection dog training for experienced handlers. Includes personal protection and property defense.',
    price: 500,
    duration: 120,
    category: 'training',
    features: [
      'Personal protection techniques',
      'Property defense training',
      'Handler protection methods',
      'Controlled aggression training',
      'Situational awareness',
      'Advanced obedience integration'
    ],
    image: 'https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg',
  },
  {
    id: '4',
    name: 'Luxury Boarding',
    description: 'Premium boarding services with individual attention, exercise programs, and comfortable accommodations.',
    price: 75,
    duration: 1440, // 24 hours
    category: 'boarding',
    features: [
      'Individual climate-controlled kennels',
      'Daily exercise and play time',
      'Grooming services included',
      'Medication administration',
      '24/7 monitoring',
      'Daily photo updates'
    ],
    image: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg',
  },
  {
    id: '5',
    name: 'Breeding Consultation',
    description: 'Expert breeding consultation including bloodline analysis, health testing guidance, and breeding recommendations.',
    price: 300,
    duration: 120,
    category: 'breeding',
    features: [
      'Bloodline compatibility analysis',
      'Health testing recommendations',
      'Breeding timeline planning',
      'Genetic counseling',
      'Stud selection guidance',
      'Pregnancy monitoring'
    ],
    image: 'https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg',
  },
  {
    id: '6',
    name: 'Health Screening',
    description: 'Comprehensive health screening including hip/elbow x-rays, genetic testing, and veterinary evaluation.',
    price: 400,
    duration: 180,
    category: 'healthcare',
    features: [
      'Hip and elbow dysplasia screening',
      'Genetic disease testing',
      'Cardiac evaluation',
      'Eye examination',
      'Complete blood panel',
      'Health certification documentation'
    ],
    image: 'https://images.pexels.com/photos/4148931/pexels-photo-4148931.jpeg',
  },
];

const categories = [
  { value: 'all', label: 'All Services' },
  { value: 'training', label: 'Training' },
  { value: 'boarding', label: 'Boarding' },
  { value: 'breeding', label: 'Breeding' },
  { value: 'healthcare', label: 'Healthcare' },
];

export const Services: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = selectedCategory === 'all' 
    ? mockServices 
    : mockServices.filter(service => service.category === selectedCategory);

  const handleBookNow = (serviceId: string) => {
    // Navigate to booking page or open booking modal
    console.log('Book service:', serviceId);
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Professional dog training, boarding, breeding consultation, and healthcare services 
            designed to support you and your German Shepherd throughout their life journey.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.value
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600 shadow-md'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ServiceCard
                service={service}
                onBookNow={handleBookNow}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Why Choose Vugasu Services?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Our comprehensive approach ensures the best care and training for your German Shepherd.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">25+</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                Years Experience
              </h3>
              <p className="text-neutral-600">
                Over 25 years of professional experience in German Shepherd training and care.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent-600">100%</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                Success Rate
              </h3>
              <p className="text-neutral-600">
                We guarantee results with our proven training methods and personalized approach.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">24/7</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                Support Available
              </h3>
              <p className="text-neutral-600">
                Round-the-clock support for all our boarding and training clients.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};