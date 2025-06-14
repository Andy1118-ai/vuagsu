import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List } from 'lucide-react';
import { DogCard } from '../components/molecules/DogCard';
import { Button } from '../components/atoms/Button';
import { Dog } from '../types';
import { FamilyTreeViewer } from '../components/organisms/FamilyTreeViewer';

// Mock data for demonstration
const mockDogs: Dog[] = [
  {
    id: '1',
    name: 'Ace von Vugasu',
    breed: 'German Shepherd',
    age: 2,
    gender: 'male',
    color: 'Black & Tan',
    weight: 75,
    height: 26,
    bloodline: 'West German Working Line',
    parents: { sire: 'Champion Rex', dam: 'Elite Luna' },
    images: ['https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg'],
    description: 'Exceptional male with strong working drive and excellent temperament. Perfect for active families or working applications.',
    achievements: ['Regional Schutzhund Champion', 'IPO3 Certified', 'Health Tested'],
    healthCertifications: ['Hip Dysplasia Clear', 'Elbow Dysplasia Clear', 'DM Clear'],
    available: true,
    price: 3500,
    status: 'available',
  },
  {
    id: '2',
    name: 'Bella von Vugasu',
    breed: 'German Shepherd',
    age: 1,
    gender: 'female',
    color: 'Sable',
    weight: 65,
    height: 24,
    bloodline: 'Czech Working Line',
    parents: { sire: 'Warrior King', dam: 'Noble Queen' },
    images: ['https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg'],
    description: 'Beautiful sable female with excellent structure and gentle nature. Ideal family companion with natural protective instincts.',
    achievements: ['Puppy Champion', 'Basic Obedience Certified'],
    healthCertifications: ['Hip Dysplasia Clear', 'Elbow Dysplasia Clear', 'Eye Certification'],
    available: true,
    price: 3200,
    status: 'available',
  },
  {
    id: '3',
    name: 'Thor von Vugasu',
    breed: 'German Shepherd',
    age: 3,
    gender: 'male',
    color: 'Solid Black',
    weight: 85,
    height: 27,
    bloodline: 'East German DDR Line',
    parents: { sire: 'Black Thunder', dam: 'Midnight Shadow' },
    images: ['https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg'],
    description: 'Impressive solid black male with commanding presence. Excellent for experienced owners seeking a protection dog.',
    achievements: ['National Protection Champion', 'Advanced Tracking Title', 'Breeding Approval'],
    healthCertifications: ['Hip Dysplasia Clear', 'Elbow Dysplasia Clear', 'Cardiac Clear'],
    available: false,
    price: 4500,
    status: 'breeding',
  },
  {
    id: '4',
    name: 'Zara von Vugasu',
    breed: 'German Shepherd',
    age: 1.5,
    gender: 'female',
    color: 'Bi-Color',
    weight: 70,
    height: 25,
    bloodline: 'West German Show Line',
    parents: { sire: 'Grand Victor', dam: 'Supreme Lady' },
    images: ['https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg'],
    description: 'Stunning bi-color female with exceptional movement and breed type. Perfect for showing or breeding.',
    achievements: ['Youth Winner', 'Best in Show', 'Temperament Tested'],
    healthCertifications: ['Hip Dysplasia Clear', 'Elbow Dysplasia Clear', 'DM Clear'],
    available: true,
    price: 3800,
    status: 'reserved',
  },
];

const bloodlines = [
  'All Bloodlines',
  'West German Working Line',
  'Czech Working Line',
  'East German DDR Line',
  'West German Show Line',
  'American Show Line',
 
];

const statuses = [
  'All Status',
  'available',
  'reserved',
  'breeding',
];

export const Dogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBloodline, setSelectedBloodline] = useState('All Bloodlines');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showFamilyTree, setShowFamilyTree] = useState(false);

  const handleBloodlineChange = (bloodline: string) => {
    setSelectedBloodline(bloodline);
    setShowFamilyTree(bloodline !== 'All Bloodlines');
  };

  const filteredDogs = useMemo(() => {
    return mockDogs.filter(dog => {
      const matchesSearch = dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dog.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBloodline = selectedBloodline === 'All Bloodlines' || dog.bloodline === selectedBloodline;
      const matchesStatus = selectedStatus === 'All Status' || dog.status === selectedStatus;
      
      return matchesSearch && matchesBloodline && matchesStatus;
    });
  }, [searchTerm, selectedBloodline, selectedStatus]);

  const handleViewDetails = (dogId: string) => {
    // Navigate to dog details page
    console.log('View details for dog:', dogId);
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
            Our German Shepherds
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Discover our exceptional German Shepherds from champion bloodlines. 
            Each dog is health tested, temperament evaluated, and ready to join your family.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search dogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              
              <div className="flex bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-neutral-200'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-neutral-200'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className={`${showFilters ? 'block' : 'hidden lg:block'} space-y-4 lg:space-y-0 lg:flex lg:gap-4`}>
            <div className="flex-1">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Bloodline
              </label>
              <select
                value={selectedBloodline}
                onChange={(e) => handleBloodlineChange(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {bloodlines.map(bloodline => (
                  <option key={bloodline} value={bloodline}>{bloodline}</option>
                ))}
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'All Status' ? status : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Family Tree Viewer */}
        <AnimatePresence>
          {showFamilyTree && selectedBloodline !== 'All Bloodlines' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden mb-8"
            >
              <FamilyTreeViewer
                bloodline={selectedBloodline}
                onClose={() => setShowFamilyTree(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <p className="text-neutral-600">
            Showing {filteredDogs.length} of {mockDogs.length} dogs
          </p>
        </motion.div>

        {/* Dogs Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}
        >
          {filteredDogs.map((dog, index) => (
            <motion.div
              key={dog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <DogCard
                dog={dog}
                onViewDetails={handleViewDetails}
                featured={index === 0}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredDogs.length === 0 && (
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
              No dogs found
            </h3>
            <p className="text-neutral-600 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedBloodline('All Bloodlines');
                setSelectedStatus('All Status');
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};