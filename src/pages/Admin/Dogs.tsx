import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '../../components/atoms/Button';
import { Dog } from '../../types';

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
    description: 'Exceptional male with strong working drive and excellent temperament.',
    achievements: ['Regional Schutzhund Champion', 'IPO3 Certified'],
    healthCertifications: ['Hip Dysplasia Clear', 'Elbow Dysplasia Clear'],
    available: true,
    price: 3500,
    status: 'available',
  },
  // Add more mock dogs as needed
];

export const AdminDogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredDogs = mockDogs.filter(dog => {
    const matchesSearch = dog.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || dog.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddDog = () => {
    setShowAddModal(true);
  };

  const handleEditDog = (dogId: string) => {
    console.log('Edit dog:', dogId);
  };

  const handleDeleteDog = (dogId: string) => {
    console.log('Delete dog:', dogId);
  };

  const handleViewDetails = (dogId: string) => {
    console.log('View details:', dogId);
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
              Dogs Management
            </h1>
            <p className="text-neutral-600">
              Manage your kennel's dogs, their details, and availability.
            </p>
          </div>
          <Button onClick={handleAddDog}>
            <Plus className="w-5 h-5 mr-2" />
            Add New Dog
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
                placeholder="Search dogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
              <option value="breeding">Breeding</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Dogs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Dog
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Bloodline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredDogs.map((dog) => (
                <tr key={dog.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={dog.images[0]}
                          alt={dog.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-900">
                          {dog.name}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {dog.breed}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">{dog.bloodline}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      dog.status === 'available' ? 'bg-green-100 text-green-800' :
                      dog.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
                      dog.status === 'sold' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {dog.status.charAt(0).toUpperCase() + dog.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">
                      {dog.price ? `$${dog.price.toLocaleString()}` : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewDetails(dog.id)}
                        className="text-neutral-600 hover:text-neutral-900"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleEditDog(dog.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteDog(dog.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add/Edit Dog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl"
          >
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              Add New Dog
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
                Save Dog
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}; 