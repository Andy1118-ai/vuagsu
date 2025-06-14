import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Image, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '../../components/atoms/Button';
import { GalleryImage } from '../../types';

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
];

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'training', label: 'Training' },
  { value: 'breeding', label: 'Breeding' },
  { value: 'puppies', label: 'Puppies' },
  { value: 'facility', label: 'Facility' },
  { value: 'events', label: 'Events' },
];

export const AdminGallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredImages = mockImages.filter(image => {
    const matchesSearch = 
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddImage = () => {
    setShowAddModal(true);
  };

  const handleEditImage = (imageId: string) => {
    console.log('Edit image:', imageId);
  };

  const handleDeleteImage = (imageId: string) => {
    console.log('Delete image:', imageId);
  };

  const handleViewImage = (imageId: string) => {
    console.log('View image:', imageId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">
              Gallery Management
            </h1>
            <p className="text-neutral-600">
              Manage your kennel's photo gallery and featured images.
            </p>
          </div>
          <Button onClick={handleAddImage}>
            <Plus className="w-5 h-5 mr-2" />
            Add New Image
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative aspect-video">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                {image.featured && (
                  <div className="absolute top-2 left-2 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => handleViewImage(image.id)}
                    className="p-1 bg-white rounded-full shadow-md hover:bg-neutral-100"
                  >
                    <Eye className="w-4 h-4 text-neutral-600" />
                  </button>
                  <button
                    onClick={() => handleEditImage(image.id)}
                    className="p-1 bg-white rounded-full shadow-md hover:bg-neutral-100"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="p-1 bg-white rounded-full shadow-md hover:bg-neutral-100"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-neutral-800 mb-1">
                  {image.title}
                </h3>
                <p className="text-sm text-neutral-600 mb-2">
                  {image.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {image.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Add/Edit Image Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl"
          >
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              Add New Image
            </h2>
            {/* Add form fields here */}
            <div className="flex justify-end gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button>
                Upload Image
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}; 