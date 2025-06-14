import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, User, Mail, Phone, Calendar, Heart } from 'lucide-react';
import { Button } from '../../components/atoms/Button';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  totalBookings: number;
  favoriteDogs: string[];
  status: 'active' | 'inactive';
}

// Mock data for demonstration
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '(555) 123-4567',
    joinedDate: '2024-01-15',
    totalBookings: 3,
    favoriteDogs: ['Ace von Vugasu', 'Bella von Vugasu'],
    status: 'active',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    phone: '(555) 987-6543',
    joinedDate: '2024-02-01',
    totalBookings: 1,
    favoriteDogs: ['Thor von Vugasu'],
    status: 'active',
  },
];

export const AdminCustomers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddCustomer = () => {
    setShowAddModal(true);
  };

  const handleEditCustomer = (customerId: string) => {
    console.log('Edit customer:', customerId);
  };

  const handleViewDetails = (customerId: string) => {
    console.log('View customer details:', customerId);
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
              Customers Management
            </h1>
            <p className="text-neutral-600">
              Manage your customer database and track their interactions.
            </p>
          </div>
          <Button onClick={handleAddCustomer}>
            <User className="w-5 h-5 mr-2" />
            Add New Customer
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
                placeholder="Search customers..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Customers Table */}
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
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-neutral-900">
                      {customer.name}
                    </div>
                    <div className="text-sm text-neutral-500">
                      Joined {new Date(customer.joinedDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-neutral-900">
                      <Mail className="w-4 h-4 mr-2 text-neutral-500" />
                      {customer.email}
                    </div>
                    <div className="flex items-center text-sm text-neutral-500">
                      <Phone className="w-4 h-4 mr-2" />
                      {customer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-neutral-900">
                      <Calendar className="w-4 h-4 mr-2 text-neutral-500" />
                      {customer.totalBookings} bookings
                    </div>
                    <div className="flex items-center text-sm text-neutral-500">
                      <Heart className="w-4 h-4 mr-2" />
                      {customer.favoriteDogs.length} favorite dogs
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(customer.id)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCustomer(customer.id)}
                      >
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add/Edit Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl"
          >
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              Add New Customer
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
                Save Customer
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}; 