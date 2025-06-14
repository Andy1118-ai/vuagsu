import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { BloodlineSlide } from '../../types';
import { FamilyTreeViewer } from './FamilyTreeViewer';

const bloodlineSlides: BloodlineSlide[] = [
  {
    id: '1',
    bloodline: 'West German Working Line',
    title: 'Elite Working Champions',
    description: 'Renowned for their exceptional drive, intelligence, and versatility in protection and service work.',
    image: 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg',
    featured: true,
  },
  {
    id: '2',
    bloodline: 'Czech Working Line',
    title: 'Athletic Excellence',
    description: 'Bred for superior athleticism and endurance, perfect for active families and working applications.',
    image: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg',
    featured: false,
  },
  {
    id: '3',
    bloodline: 'East German DDR Line',
    title: 'Noble Heritage',
    description: 'Distinguished bloodline known for strong bone structure, dark pigmentation, and unwavering loyalty.',
    image: 'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg',
    featured: false,
  },
  {
    id: '4',
    bloodline: 'West German Show Line',
    title: 'Elegant Beauty',
    description: 'Exemplifying breed standard with exceptional movement, structure, and refined temperament.',
    image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
    featured: false,
  },
  {
    id: '5',
    bloodline: 'American Line',
    title: 'Versatile Companions',
    description: 'Balanced temperament and adaptability make them ideal family guardians and loyal companions.',
    image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg',
    featured: false,
  },
];

export const DynamicHero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedBloodline, setSelectedBloodline] = useState<string | null>(null);
  const [showFamilyTree, setShowFamilyTree] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bloodlineSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 5000);
  };

  const handleBloodlineSelect = (bloodline: string) => {
    setSelectedBloodline(bloodline);
    setShowFamilyTree(true);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bloodlineSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bloodlineSlides.length) % bloodlineSlides.length);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Slideshow Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={bloodlineSlides[currentSlide].image}
              alt={bloodlineSlides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-shepherd-black/80 via-shepherd-black/60 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-block px-4 py-2 bg-shepherd-tan/20 backdrop-blur-sm rounded-full mb-6"
              >
                <span className="text-shepherd-tan font-medium">
                  {bloodlineSlides[currentSlide].bloodline}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              >
                {bloodlineSlides[currentSlide].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl md:text-2xl text-shepherd-beige mb-8 leading-relaxed"
              >
                {bloodlineSlides[currentSlide].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={() => handleBloodlineSelect(bloodlineSlides[currentSlide].bloodline)}
                  className="px-8 py-4 bg-shepherd-tan hover:bg-shepherd-tan/90 text-shepherd-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Explore Family Tree
                </button>
                <button className="px-8 py-4 border-2 border-shepherd-beige text-shepherd-beige hover:bg-shepherd-beige hover:text-shepherd-black font-semibold rounded-lg transition-all duration-300">
                  View Available Dogs
                </button>
              </motion.div>
            </motion.div>

            {/* Right Content - Bloodline Selector */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">Our Bloodlines</h3>
                <div className="space-y-3">
                  {bloodlineSlides.map((slide, index) => (
                    <motion.button
                      key={slide.id}
                      onClick={() => handleSlideChange(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                        index === currentSlide
                          ? 'bg-shepherd-tan text-shepherd-black shadow-lg'
                          : 'bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="font-semibold mb-1">{slide.bloodline}</div>
                      <div className="text-sm opacity-80 line-clamp-2">
                        {slide.description}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
          <button
            onClick={prevSlide}
            className="p-2 text-white hover:text-shepherd-tan transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {bloodlineSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-shepherd-tan w-8'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 text-white hover:text-shepherd-tan transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-white/20 mx-2" />

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 text-white hover:text-shepherd-tan transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Bloodline Selector */}
      <div className="lg:hidden absolute bottom-20 left-4 right-4 z-20">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex overflow-x-auto gap-3 pb-2">
            {bloodlineSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => handleSlideChange(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-shepherd-tan text-shepherd-black'
                    : 'bg-white/10 text-white'
                }`}
              >
                {slide.bloodline}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Family Tree Modal */}
      <AnimatePresence>
        {showFamilyTree && selectedBloodline && (
          <FamilyTreeViewer
            bloodline={selectedBloodline}
            onClose={() => {
              setShowFamilyTree(false);
              setSelectedBloodline(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};