import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { GalleryImage } from '../types';

// Mock data for demonstration
const mockImages: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg',
    title: 'Champion Ace in Training',
    description: 'Our champion German Shepherd Ace during advanced protection training session.',
    category: 'training',
    tags: ['protection', 'training', 'champion'],
    featured: true,
    uploadedAt: '2024-01-15',
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg',
    title: 'Beautiful Bella',
    description: 'Bella showing her excellent structure and noble expression.',
    category: 'breeding',
    tags: ['breeding', 'structure', 'female'],
    featured: false,
    uploadedAt: '2024-01-14',
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg',
    title: 'Puppy Playtime',
    description: 'Young puppies enjoying supervised play in our secure exercise area.',
    category: 'puppies',
    tags: ['puppies', 'play', 'socialization'],
    featured: false,
    uploadedAt: '2024-01-13',
  },
  {
    id: '4',
    url: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
    title: 'Kennel Facilities',
    description: 'Our state-of-the-art kennel facilities with spacious runs and climate control.',
    category: 'facility',
    tags: ['facility', 'kennels', 'infrastructure'],
    featured: false,
    uploadedAt: '2024-01-12',
  },
  {
    id: '5',
    url: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg',
    title: 'Training Session',
    description: 'Professional training session focusing on obedience and handler bonding.',
    category: 'training',
    tags: ['training', 'obedience', 'bonding'],
    featured: false,
    uploadedAt: '2024-01-11',
  },
  {
    id: '6',
    url: 'https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg',
    title: 'Award Ceremony',
    description: 'Celebrating our latest champion at the regional dog show.',
    category: 'events',
    tags: ['awards', 'champion', 'show'],
    featured: true,
    uploadedAt: '2024-01-10',
  },
];

const categories = [
  { value: 'all', label: 'All Photos' },
  { value: 'training', label: 'Training' },
  { value: 'puppies', label: 'Puppies' },
  { value: 'breeding', label: 'Breeding' },
  { value: 'facility', label: 'Facility' },
  { value: 'events', label: 'Events' },
];

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredImages = useMemo(() => {
    return mockImages.filter(image => {
      const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
      const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           image.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const handlePrevImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    setSelectedImage(filteredImages[prevIndex]);
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(filteredImages[nextIndex]);
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
            Gallery
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Explore our collection of photos showcasing our German Shepherds, training sessions, 
            facilities, and memorable moments from our kennel.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.value
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <p className="text-neutral-600">
            Showing {filteredImages.length} of {mockImages.length} photos
          </p>
        </motion.div>

        {/* Image Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className={`relative cursor-pointer rounded-lg overflow-hidden shadow-lg ${
                image.featured ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image.url}
                alt={image.title}
                className={`w-full object-cover ${
                  image.featured ? 'h-64 lg:h-full' : 'h-48'
                }`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-4 hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                  <p className="text-sm text-neutral-200 line-clamp-2">
                    {image.description}
                  </p>
                </div>
              </div>
              {image.featured && (
                <div className="absolute top-4 left-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-neutral-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              No photos found
            </h3>
            <p className="text-neutral-600">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Navigation */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
                <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
                <p className="text-neutral-200 mb-2">{selectedImage.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedImage.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary-600 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};